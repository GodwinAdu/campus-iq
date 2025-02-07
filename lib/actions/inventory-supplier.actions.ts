"use server"

import { revalidatePath } from "next/cache";
import InventorySupplier from "../models/inventory-supplier.models";
import { connectToDB } from "../mongoose";
import { currentProfile } from "../helpers/current-profile";

interface SupplierProps {
    name: string;
    email: string;
    contactNumber: string;
    companyName: string;
    address: string;
}
export async function createSupplier(values: SupplierProps, path: string) {
    try {
        const user = await currentProfile();

        await connectToDB();

        const { name, email, contactNumber, companyName, address } = values;

        const existingSupplier = await InventorySupplier.findOne({ email});

        if (existingSupplier) {
            throw new Error("Supplier already exists");
        }

        const newSupplier = new InventorySupplier({
            name,
            email,
            contactNumber,
            companyName,
            address,
            createdBy:user._id,
            action_type: "created",
        });

        await newSupplier.save();

        revalidatePath(path)
    } catch (error) {
        console.log("Error creating supplier:", error);
        throw error;
    }
}

export async function fetchAllSuppliers() {
    try {
        const user = await currentProfile();

        await connectToDB();

        const suppliers = await InventorySupplier.find({});

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

        const user = await currentProfile();

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