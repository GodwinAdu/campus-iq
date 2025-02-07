"use server"

import { revalidatePath } from "next/cache";
import Role from "../models/role.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";


interface CreateRoleProps {
    name: string;
    displayName: string;
    description: string;
    dashboard?: boolean | undefined;
    schoolInfo?: boolean | undefined;
    systemConfig?: boolean | undefined;
    classManagement?: boolean | undefined;
    studentManagement?: boolean | undefined;
    employeeManagement?: boolean | undefined;
    manageAttendance?: boolean | undefined;
    homeWork?: boolean | undefined;
    manageTimeTable?: boolean | undefined;
    onlineLearning?: boolean | undefined;
    examsManagement?: boolean | undefined;
    account?: boolean | undefined;
    inventory?: boolean | undefined;
    hostelManagement?: boolean | undefined;
    library?: boolean | undefined;
    depositAndExpense?: boolean | undefined;
    smsAndEmail?: boolean | undefined;
    report?: boolean | undefined;

    viewChart?: boolean | undefined;
    viewMemberTab?: boolean | undefined;
    viewEnquiries?: boolean | undefined;
    viewExpenses?: boolean | undefined;

    addRole?: boolean | undefined;
    manageRole?: boolean | undefined;
    viewRole?: boolean | undefined;
    editRole?: boolean | undefined;
    deleteRole?: boolean | undefined;

    addSubject?: boolean | undefined;
    manageSubject?: boolean | undefined;
    viewSubject?: boolean | undefined;
    editSubject?: boolean | undefined;
    deleteSubject?: boolean | undefined;

    addTerm?: boolean | undefined;
    manageTerm?: boolean | undefined;
    viewTerm?: boolean | undefined;
    editTerm?: boolean | undefined;
    deleteTerm?: boolean | undefined;

    addSession?: boolean | undefined;
    manageSession?: boolean | undefined;
    viewSession?: boolean | undefined;
    editSession?: boolean | undefined;
    deleteSession?: boolean | undefined;

    addClass?: boolean | undefined;
    manageClass?: boolean | undefined;
    viewClass?: boolean | undefined;
    editClass?: boolean | undefined;
    deleteClass?: boolean | undefined;

    addTime?: boolean | undefined;
    manageTime?: boolean | undefined;
    viewTime?: boolean | undefined;
    editTime?: boolean | undefined;
    deleteTime?: boolean | undefined;

    addClassAllocation?: boolean | undefined;
    manageClassAllocation?: boolean | undefined;
    viewClassAllocation?: boolean | undefined;
    editClassAllocation?: boolean | undefined;
    deleteClassAllocation?: boolean | undefined;

    addGradingSystem?: boolean | undefined;
    manageGradingSystem?: boolean | undefined;
    viewGradingSystem?: boolean | undefined;
    editGradingSystem?: boolean | undefined;
    deleteGradingSystem?: boolean | undefined;

    addGpa?: boolean | undefined;
    manageGpa?: boolean | undefined;
    viewGpa?: boolean | undefined;
    editGpa?: boolean | undefined;
    deleteGpa?: boolean | undefined;

    publishResult?: boolean | undefined;

    addStudent?: boolean | undefined;
    manageStudent?: boolean | undefined;
    viewStudent?: boolean | undefined;
    editStudent?: boolean | undefined;
    deleteStudent?: boolean | undefined;

    addParent?: boolean | undefined;
    manageParent?: boolean | undefined;
    viewParent?: boolean | undefined;
    editParent?: boolean | undefined;
    deleteParent?: boolean | undefined;

    addDepartment?: boolean | undefined;
    manageDepartment?: boolean | undefined;
    viewDepartment?: boolean | undefined;
    editDepartment?: boolean | undefined;
    deleteDepartment?: boolean | undefined;

    manageEmployeeList?: boolean | undefined;

    addEmployee?: boolean | undefined;
    manageEmployee?: boolean | undefined;
    viewEmployee?: boolean | undefined;
    editEmployee?: boolean | undefined;
    deleteEmployee?: boolean | undefined;

    addBook?: boolean | undefined;
    manageBook?: boolean | undefined;
    viewBook?: boolean | undefined;
    editBook?: boolean | undefined;
    deleteBook?: boolean | undefined;

    addTeacherAttendance?: boolean | undefined;
    manageTeacherAttendance?: boolean | undefined;
    viewTeacherAttendance?: boolean | undefined;
    editTeacherAttendance?: boolean | undefined;
    deleteTeacherAttendance?: boolean | undefined;

    addStudentAttendance?: boolean | undefined;
    manageStudentAttendance?: boolean | undefined;
    viewStudentAttendance?: boolean | undefined;
    editStudentAttendance?: boolean | undefined;
    deleteStudentAttendance?: boolean | undefined;

    addHomework?: boolean | undefined;
    manageHomework?: boolean | undefined;
    viewHomework?: boolean | undefined;
    editHomework?: boolean | undefined;
    deleteHomework?: boolean | undefined;

    addEvaluationReport?: boolean | undefined;
    manageEvaluationReport?: boolean | undefined;
    viewEvaluationReport?: boolean | undefined;
    editEvaluationReport?: boolean | undefined;
    deleteEvaluationReport?: boolean | undefined;

    addTimetable?: boolean | undefined;
    manageTimetable?: boolean | undefined;
    viewTimetable?: boolean | undefined;
    editTimetable?: boolean | undefined;
    deleteTimetable?: boolean | undefined;
}
export async function createRole(values: CreateRoleProps, path: string) {
    const {
        name,
        displayName,
        description,
        ...permissions
    } = values;

    try {
        const user = await currentUser();
        const schoolId = user.schoolId
        await connectToDB();
        // Check if any existing role matches the provided name, display name, or description
        const existingRole = await Role.findOne({
            $or: [
                { name },
                { displayName },
                { description }
            ]
        });

        // If an existing role is found, throw an error
        if (existingRole) {
            throw new Error('Role with the same name, display name, or description already exists');
        }

        const role = new Role({
            name,
            displayName,
            description,
            schoolId,
            createdBy: user?._id,
            action_type: "create",
            ...permissions
        });

        await role.save();

        revalidatePath(path)

    } catch (error) {
        throw error;
    }
}


export async function fetchRoleById(id: string) {
    try {
        await connectToDB();

        const role = await Role.findById(id);

        if (!role) {
            throw new Error('No Role found')
        }


        return JSON.parse(JSON.stringify(role))

    } catch (error) {
        console.error("Error fetching role by id:", error);
        throw error;
    }
}

export async function getAllRoles() {
    try {
        const user = await currentUser();

        await connectToDB();
        const roles = await Role.find({ schoolId: user.schoolId });

        if (!roles || roles.length === 0) {
            console.log("Roles don't exist");
            return []
        }

        return JSON.parse(JSON.stringify(roles))

    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
}
export async function getRolesName() {
    try {

        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const roles = await Role.find({ schoolId }, { displayName: 1, _id: 1 });


        if (!roles || roles.length === 0) {
            console.log("Roles name don't exist");
            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(roles))

    } catch (error) {
        console.error("Error fetching roles name:", error);
        throw error;
    }
}


export async function updateRole(roleId: string, values: Partial<CreateRoleProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            console.log("Role not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedRole));
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
}
export async function fetchRole(value: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId
        await connectToDB();

        const role = await Role.findOne({ schoolId, displayName: value });

        if (!role) {
            throw new Error("Role not found");
        }

        return JSON.parse(JSON.stringify(role));

    } catch (error) {
        console.log('Error fetching role', error);
        throw error;
    }

}

