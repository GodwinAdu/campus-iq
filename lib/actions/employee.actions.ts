"use server"


import School from "../models/school.models";
import { connectToDB } from "../mongoose";
import { hash } from "bcryptjs";
import { generateUniqueUsername } from "../helpers/generateUsername";
import { revalidatePath } from "next/cache";
import { generatePassword } from "../helpers/generatePassword";
import { wrappedSendMail } from "../nodemailer";
import { welcomeRegisterEmail } from "../mail-massages";
import Employee from '../models/employee.models';
import Department from "../models/department.models";
import { generateUniqueStaffId } from "../helpers/generateStaffId";
import { currentUser } from "../helpers/current-user";

export const getEmployeeById = async (id: string) => {
    try {
        await connectToDB();

        const employee = await Employee.findById(id).select('-password');

        if (!employee) {
            return null
        }

        return JSON.parse(JSON.stringify(employee));
    } catch (error) {
        console.error("Error while fetching employee", error);
        throw error;
    }
}



export async function createEmployee(values: employeeSchema, path: string) {
    try {
        // Extract necessary data
        const { personalInfo, role, identification, employment, professionalDetails, medicalHistory } = values;
        const { fullName, email } = personalInfo;

        // Start parallel execution for user, school, and email check
        await connectToDB();
        const [user, existingEmployeeWithEmail] = await Promise.all([
            currentUser(),
            Employee.findOne({ email })
        ]);

        if (!user) throw new Error("User not logged in");
        if (existingEmployeeWithEmail) throw new Error("Employee already exists");

        const schoolId = user.schoolId;

        // Fetch current school data
        const currentSchool = await School.findById(schoolId, "schoolName schoolEmail");
        if (!currentSchool) throw new Error("School not found");

        const { schoolName, schoolEmail } = currentSchool;

        // Generate credentials
        const [rawPassword, hashedPassword, rawUsername, rawStaffId] = await Promise.all([
            generatePassword(),
            hash(generatePassword(), 10),
            generateUniqueUsername(fullName),
            generateUniqueStaffId()
        ]);

        console.log("Generated Password:", rawPassword);
        console.log("Hashed Password:", hashedPassword);

        // Send welcome email
        await wrappedSendMail({
            to: email,
            subject: "Registration Successful",
            html: welcomeRegisterEmail(fullName, rawPassword, rawUsername, schoolName, schoolEmail),
        });

        // Fetch department details
        const assignDepartment = await Department.findById(employment.departmentId);
        if (!assignDepartment) throw new Error("Department not found");

        // Create Employee
        const newEmployee = new Employee({
            schoolId,
            personalInfo: { ...personalInfo, password: hashedPassword, username: rawUsername },
            role,
            employment: { ...employment, employeeID: rawStaffId },
            identification,
            professionalDetails,
            medicalHistory,
            createdBy: user._id,
            action_type: "create",
        });

        // Save employee and update department in parallel
        await Promise.all([
            newEmployee.save(),
            Department.updateOne(
                { _id: employment.departmentId },
                { $push: { employees: newEmployee._id } }
            )
        ]);

        // Revalidate path
        revalidatePath(path);

    } catch (error) {
        console.error("Error creating employee:", error);
        throw new Error("Failed to create employee. Please try again.");
    }
}



export async function getAllEmployees() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const admins = await Employee.find({ schoolId })
            .populate("createdBy", "fullName")
            .exec();

        if (!admins) {
            console.log("Cant find admins")
            return null
        }

        return JSON.parse(JSON.stringify(admins));

    } catch (error) {
        console.log("unable to fetch admin users", error)
        return null
    }
}

export async function fetchEmployeeById(adminId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();
        const admin = await Employee.findById(adminId);
        if (!admin) {
            console.log("Cant find admin")
            throw new Error("Cant find admin")
        }

        return JSON.parse(JSON.stringify(admin));

    } catch (error) {
        console.log("unable to fetch admin", error)
        throw error;
    }
}

export async function fetchEmployeeByRole(role: string) {
    try {
        console.log(role, "fetching employee by role");
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        const schoolId = user.schoolId;
        await connectToDB();

        const employees = await Employee.find({ schoolId, role }, { fullName: 1, _id: 1 });
        if (employees.length === 0) {
            console.log("Employee not found");
            return [];
        }

        console.log('Fetched employees:', employees);
        return JSON.parse(JSON.stringify(employees));
    } catch (error) {
        console.error("Error fetching employee by role:", error);
        throw error;
    }
}



export async function updateEmployee(adminId: string, values: Partial<any>, path?: string) {
    try {
        console.log(values);
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();

        // Fetch existing employee first to ensure required fields are not missing
        const existingEmployee = await Employee.findById(adminId);
        if (!existingEmployee) throw new Error("Employee not found");

        // Merge existing fields to avoid validation errors on required fields
        const updatedValues = {
            ...existingEmployee.toObject(), // Preserve existing data
            ...values, // Apply updates
            mod_flag: true,
            modifiedBy: user._id,
            action_type: "update"
        };

        // Perform update
        const updatedAdmin = await Employee.findOneAndUpdate(
            { _id: adminId },
            { $set: updatedValues },
            { new: true, runValidators: true, setDefaultsOnInsert: true } // Ensure validation
        );

        if (!updatedAdmin) {
            console.log("Employee not found");
            return null;
        }

        console.log("Update successful");
        if (path) {
            revalidatePath(path);
        }

        return JSON.parse(JSON.stringify(updatedAdmin));
    } catch (error) {
        console.error("Error updating admin:", error);
        throw new Error("Failed to update employee. Please check your data.");
    }
}




/**
 * Counts the total number of admin users associated with the current logged-in school.
 * 
 * @returns Promise<number> - A promise that resolves with the total count of admin users.
 * 
 * @throws Will throw an error if there is a problem connecting to the database or retrieving the admin users.
 * 
 * @remarks
 * This function uses the `currentProfile` function to get the ID of the current logged-in school.
 * It then connects to the database and uses the `Employee` model to count the documents where the `school` field matches the current school's ID.
 * The count is returned as the result of the function.
 * 
 * @example
 * ```typescript
 * try {
 *     const totalAdmins = await totalAdmins();
 *     console.log("Total admins:", totalAdmins);
 * } catch (error) {
 *     console.error("Error counting admins:", error);
 * }
 * ```
 */
export async function totalEmployees() {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        const schoolId = user.schoolId;

        await connectToDB();

        const totalMembers = await Employee.countDocuments({ schoolId });

        return totalMembers

    } catch (error) {
        console.log("unable to count Employees", error);
        throw error;
    }
}


export async function deleteAdmin(id: string) {
    try {
        await connectToDB();
        const deleteUser = await Employee.findByIdAndDelete(id);
        if (!deleteUser) {
            throw new Error("Couldn't delete user")
        }
        return JSON.parse(JSON.stringify(deleteUser));
    } catch (error) {
        console.log("Unable to delete Admin", error);
        throw error;
    }
}

export async function fetchEmployeesList(departmentId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;


        await connectToDB();

        const employees = await Employee.find({ schoolId,"employment.departmentId": departmentId });
        if (employees.length === 0) {
            return [];
        }
        console.log(employees);

        return JSON.parse(JSON.stringify(employees));
    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}