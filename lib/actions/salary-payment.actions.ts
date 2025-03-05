"use server"

import { currentUser } from "../helpers/current-user";
import Department from "../models/department.models";
import Employee from "../models/employee.models";
import History from "../models/history.models";
import SalaryPayment from "../models/salary-payment.models";
import SalaryStructure from "../models/salary-structure.models";
import { connectToDB } from "../mongoose";

export async function  fetchSalaryPayment(departmentId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        // Fetch employees in the specified department
        const employees = await Employee.find({ departmentId })

        const currentDate = new Date();
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Fetch salary payments for the current month for those employees
        const salaryPayments = await SalaryPayment.find({
            employeeId: { $in: employees.map(emp => emp._id) },
            paymentDate: { $gte: currentMonthStart, $lte: currentMonthEnd }
        }).lean().exec();

        const paidEmployeeIds = new Set(salaryPayments.map(payment => payment.employeeId.toString()));

        // Identify employees without a salary payment record for the current month
        const unpaidEmployees = employees.filter(emp => !paidEmployeeIds.has(emp._id.toString()));

        // Create default salary payment records for those employees
        const defaultSalaryPayments = unpaidEmployees.map(emp => ({
            schoolId,
            employeeId: emp._id,
            salaryStructureId: emp.salaryId,
            paymentDate: currentDate,
            paymentAmount: 0, // Adjust according to your SalaryStructure schema
            status: 'unpaid',
            createdAt: currentDate,
            updatedAt: currentDate
        }));

        const history = new History({
            schoolId,
            actionType: 'DEFAULT_SALARY_PAID',
            details: {
                employeeIds: unpaidEmployees.map(emp => emp._id.toString()),
            },
            message: `${user.fullName} created default salary payments for unpaid employees on ${currentDate.toLocaleString()}.`,
            performedBy: user._id,
            entityId: null,
            entityType: 'SALARY_STRUCTURE'  // The type of the entity
        });

        await history.save()

        if (defaultSalaryPayments.length > 0) {
            await SalaryPayment.insertMany(defaultSalaryPayments);
        }

        // Refetch salary payments to include newly created records
        const updatedSalaryPayments = await SalaryPayment.find({
            schoolId,
            employeeId: { $in: employees.map(emp => emp._id) },
            paymentDate: { $gte: currentMonthStart, $lte: currentMonthEnd }
        })
            .populate([

                {
                    path: "employeeId",
                    model: Employee,
                    select: "fullName staffId",
                    populate: {
                        path: "departmentId",
                        model: Department,
                        select: "name"
                    }
                },
                {
                    path: "salaryStructureId",
                    model: SalaryStructure,
                },
            ])
            .lean().exec();

        return JSON.parse(JSON.stringify(updatedSalaryPayments));



    } catch (error) {
        console.log("Failed to fetch salary payment from server", error);
        throw error;
    }
}


export async function fetchSalaryPaymentById(id: string) {
    try {
        await connectToDB();
        const salary = await SalaryPayment.findById(id)
        .populate([

            {
                path: "employeeId",
                model: Employee,
                select: "fullName staffId",
                populate: {
                    path: "departmentId",
                    model: Department,
                    select: "name"
                }
            },
            {
                path: "salaryStructureId",
                model: SalaryStructure,
            },
        ])
        .lean().exec();
        if (!salary) {
            throw new Error("Could not find salary in the API server");
        }
        return JSON.parse(JSON.stringify(salary));

    } catch (error) {
        console.log("Failed to fetch salary from server", error);
        throw error;
    }
}