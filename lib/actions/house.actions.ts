"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import House from "../models/house.models";
import { currentProfile } from "../helpers/current-profile";


export async function createHouse({ name }: { name: string }) {
    try {
        const user = await currentProfile();
        
        await connectToDB();

        const house = new House({
            name,
            createdBy:user._id,
            action_type:"created"
        })

        await house.save();

    } catch (error: any) {
        console.log("unable to create new house", error)
        throw error;
    }
}

export async function fetchHouseById({ id }: { id: string }) {
    await connectToDB();
    try {
        const house = await House.findById(id)

        if (!house) {
            console.log("House doesn't exist")
        }
        return JSON.parse(JSON.stringify(house));
    } catch (error: any) {
        console.log("unable to fetch house", error);
        throw error;
    }
}


export async function getAllHouses() {
    try {
        const user = await currentProfile();
        

        await connectToDB();

        const houses = await House.find({})

        if (!houses || houses.length === 0) {

            console.log("houses don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(houses));

    } catch (error: any) {
        console.error("Error fetching Houses:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

interface UpdateHouseProps {
    name: string;
    createdBy: string;
}

export async function updateHouse(houseId: string, values: UpdateHouseProps, path: string) {
    try {
        const user = await currentProfile();
        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy:user._id,
            action_type: "updated"
        }
    await connectToDB();

        const updatedHouse = await House.findByIdAndUpdate(
            houseId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedHouse) {
            console.log("House not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedHouse));
    } catch (error) {
        console.error("Error updating House:", error);
        throw error;
    }
}

export async function deleteHouse({ id }: { id: string }) {
    await connectToDB();
    try {
        const house = await House.findByIdAndDelete(id)
        if (!house) {
            console.log("House don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(house)); 

    } catch (error) {
        console.error("Error deleting House:", error);
        throw error; // throw the error to handle it at a higher House if needed
    }

}

