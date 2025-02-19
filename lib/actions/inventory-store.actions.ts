"use server"

import { revalidatePath } from "next/cache";
import InventoryStore from "../models/inventory-store.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";

interface StoreProps {
    name: string;
    address: string;
    contactNumber: string;
}
export async function createStore(values: StoreProps) {
    try {
        const { name, address, contactNumber } = values;

        const user: { schoolId: string; _id: string } | null = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const existingStore = await InventoryStore.findOne({ name});

        if (existingStore) {
            throw new Error("Store already exists");
        }

        const newStore = new InventoryStore({
            schoolId,
            name,
            address,
            contactNumber,
            createdBy:user._id,
            action_type: "created",
        });

        await newStore.save();

    } catch (error) {
        console.log("Error creating store", error)
        throw error;

    }
}


export async function fetchAllStores() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const stores = await InventoryStore.find({schoolId});

        if (stores.length === 0) {
            console.log("No stores found");
            return [];
        }

        return JSON.parse(JSON.stringify(stores));

    } catch (error) {
        console.log("Error fetching all stores", error);
        throw error;
    }

}

export async function fetchStoreById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        await connectToDB();

        const store = await InventoryStore.findById(id);

        if (!store) {
            console.log("Store not found");
            return null;
        }

        return JSON.parse(JSON.stringify(store));

    } catch (error) {
        console.log("Error fetching store by id", error);
        throw error;
    }
}



export async function updateStore(id: string, values: Partial<StoreProps>,path: string) {
    try {

        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated",
        };

        const updatedStore = await InventoryStore.findByIdAndUpdate(
            id,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedStore) {
            console.log("Store not found");
            return null;
        }

        console.log("Update successful");
        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedStore));

    } catch (error) {
        console.error("Error updating store", error);
        throw error;
    }
}




export async function deleteStore(storeId:string) {
    try {
        await connectToDB();

        // Find the store by ID
        const store = await InventoryStore.findById(storeId);

        if (!store) {
            console.log("Store doesn't exist");
            return null; // or throw an error if you want to handle it differently
        }

        // Check if the store has any categories
        if (store.categories && store.categories.length > 0) {
            console.log("Store has categories and cannot be deleted");
            throw new Error("Store has categories and cannot be deleted")
        }

        // Proceed with deletion if no categories
        await InventoryStore.findByIdAndDelete(storeId);
        console.log("Delete successful");

        return JSON.parse(JSON.stringify(store));

    } catch (error) {
        console.error("Error deleting store", error);
        throw error;
    }
}
