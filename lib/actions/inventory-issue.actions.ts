"use server"

import { revalidatePath } from "next/cache";
import Employee from "../models/employee.models";
import InventoryIssue from "../models/inventory-issue.models";
import Parent from "../models/parent.models";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";
import InventoryProduct from "../models/inventory-product.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";
interface Items {
    categoryId: string;
    productId: string;
    quantity: number;
}
interface IssuesProps {
    role: string;
    saleToId: string;
    status?: string | undefined;
    classId?: string | undefined;
    issueDate: Date;
    returnDate?: Date | undefined;
    issueItems: Items[];
}

export async function createIssue(values: IssuesProps, path: string) {
    try {
        const { role, saleToId, status, classId, issueDate, returnDate, issueItems } = values
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        const schoolId = user.schoolId;

        // Role check and assignment
        // Determine the role model
        const roleModel = role === "student" ? "Student" : role === "parent" ? "Parent" : "Employee";


        await connectToDB();

        // Check product quantities and update them
        for (const item of issueItems) {
            const product = await InventoryProduct.findById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found.`);
            }
            if (product.quantity < item.quantity) {
                throw new Error(`Insufficient quantity for product with ID ${item.productId}. Available: ${product.quantity}, Required: ${item.quantity}`);
            }
        }

        // Deduct quantities after all checks pass
        for (const item of issueItems) {
            const product = await InventoryProduct.findById(item.productId);
            if (!product) throw new Error(`Could not find product`);
            product.quantity -= item.quantity;
            await product.save();
        }

        const newIssue = new InventoryIssue({
            schoolId,
            role: roleModel,
            saleToId,
            status,
            classId,
            issueDate,
            returnDate,
            issueItems,
            issuedBy: user?._id,
            createdBy: user?._id,
            action_type: "created",
        });
        const history = new History({
            schoolId,
            actionType: 'INVENTORY_ISSUE_CREATED', // Use a relevant action type
            details: {
                itemId: newIssue._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new inventory issue for ${roleModel} (ID: ${saleToId}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newIssue._id,
            entityType: 'INVENTORY_ISSUE', // The type of the entity
        });

        await Promise.all([
            newIssue.save(),
            history.save()
        ])

        revalidatePath(path)

    } catch (error) {
        console.error('Error creating inventory issue:', error);
        throw error;
    }
}
export async function fetchAllInventoryIssues() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        // Fetch all inventory issues without populating saleToId initially
        const issues = await InventoryIssue.find({schoolId})
            .populate({ path: 'issuedBy', model: 'Employee', select: 'fullName' })
            .exec();

        if (issues.length === 0) {
            return [];
        }

        // Manually populate saleToId based on the role
        const populatedIssues = await Promise.all(issues.map(async issue => {
            let populatedSaleToId;
            if (issue.role === 'Student') {
                populatedSaleToId = await Student.findById(issue.saleToId).select('fullName').exec();
            } else if (issue.role === 'Parent') {
                populatedSaleToId = await Parent.findById(issue.saleToId).select('fullName').exec();
            } else if (issue.role === 'Employee') {
                populatedSaleToId = await Employee.findById(issue.saleToId).select('fullName').exec();
            }

            return {
                ...issue.toObject(),
                saleToId: populatedSaleToId
            };
        }));

        return JSON.parse(JSON.stringify(populatedIssues));
    } catch (error) {
        console.error('Error fetching inventory issues:', error);
        throw error;
    }
}

export async function fetchInventoryIssueById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();

        const issue = await InventoryIssue.findById(id).lean()

        if (!issue) {
            console.log('Inventory issue not found');
            return null;
        }

        return JSON.parse(JSON.stringify(issue));
    } catch (error) {
        console.error('Error fetching inventory issue by ID:', error);
        throw error;
    }
}


export async function updateInventoryIssue(issueId: string, values: Partial<IssuesProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated",
        }

        const updatedIssue = await InventoryIssue.findByIdAndUpdate(
            issueId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedIssue) {
            console.log('Inventory issue not found');
            return null;
        }

        console.log('Update successful');

        // Revalidate the path if necessary
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedIssue));
    } catch (error) {
        console.error('Error updating inventory issue status:', error);
        throw error;
    }
}


export async function deleteInventoryIssue(id: string) {
    try {
        await connectToDB();

        const issue = await InventoryIssue.findByIdAndDelete(id)
        if (!issue) {
            console.log('Inventory issue not found');
            return null; // or throw an error if you want to handle it differently
        }

        console.log('Delete successful');

        return JSON.parse(JSON.stringify(issue));
    } catch (error) {
        console.error('Error deleting inventory issue:', error);
        throw error;
    }
}