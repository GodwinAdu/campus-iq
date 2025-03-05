"use server"

import { revalidatePath } from "next/cache";
import InventorySupplier from "../models/inventory-supplier.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";
import History from '../models/history.models';


interface SupplierProps {
    name: string;
    email: string;
    contactNumber: string;
    companyName: string;
    address: string;
}
export async function createSupplier(values: SupplierProps, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const { name, email, contactNumber, companyName, address } = values;

        const existingSupplier = await InventorySupplier.findOne({ email });

        if (existingSupplier) {
            throw new Error("Supplier already exists");
        }

        const newSupplier = new InventorySupplier({
            schoolId,
            name,
            email,
            contactNumber,
            companyName,
            address,
            createdBy: user._id,
            action_type: "created",
        });

        const history = new History({
            schoolId,
            actionType: 'SUPPLIER_CREATED',
            details: {
                itemId: newSupplier._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new supplier with (ID: ${newSupplier._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newSupplier._id,
            entityType: 'SUPPLIER', // The type of the entity, e.g., 'PRODUCT', 'SUPPLIER', etc.
        });

        await Promise.all([
            newSupplier.save(),
            history.save(),
        ]);

        revalidatePath(path)
    } catch (error) {
        console.log("Error creating supplier:", error);
        throw error;
    }
}

export async function fetchAllSuppliers() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const suppliers = await InventorySupplier.find({ schoolId });

        if (suppliers.length === 0) {
            console.log("No suppliers found");
            return [];
        }

        return JSON.parse(JSON.stringify(suppliers));
    } catch (error) {
        console.log("Error fetching inventory suppliers:", error);
        throw error;
    }
}



export async function fetchSupplierById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        await connectToDB();

        const supplier = await InventorySupplier.findById(id);

        if (!supplier) {
            console.log("Supplier not found");
            return null;
        }

        return JSON.parse(JSON.stringify(supplier));

    } catch (error) {
        console.log("Error fetching supplier, error:", error);
        throw error;
    }

}


export async function updateSupplier(id: string, values: Partial<SupplierProps>, path: string) {
    try {

        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated",
        };

        const updatedSupplier = await InventorySupplier.findByIdAndUpdate(
            id,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedSupplier) {
            console.log("Supplier not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedSupplier));
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error;
    }
}


export async function deleteSupplier(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();
        const deleteData = await InventorySupplier.findByIdAndDelete(id);

        if (!deleteData) {
            throw new Error("Supplier not found");
        }

        return JSON.parse(JSON.stringify(deleteData));
    } catch (error) {
        console.error("Unable to connect to database", error);
        throw error;
    }
}