"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import House from "../models/house.models";
import { currentUser } from "../helpers/current-user";

type Props = {
    name: string,
}

export async function createHouse(values: Props) {
    try {
        const { name } = values;
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        const schoolId = user.schoolId;

        await connectToDB();

        const house = new House({
            schoolId,
            name,
            createdBy: user._id,
            action_type: "created"
        })

        await house.save();

    } catch (error) {
        console.log("unable to create new house", error)
        throw error;
    }
}

export async function fetchHouseById(id:string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const house = await House.findById(id)

        if (!house) {
            console.log("House doesn't exist")
        }
        return JSON.parse(JSON.stringify(house));
        
    } catch (error) {
        console.log("unable to fetch house", error);
        throw error;
    }
}


export async function getAllHouses() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;


        await connectToDB();

        const houses = await House.find({ schoolId })
        .populate("createdBy", "fullName")

        if (!houses || houses.length === 0) {

            console.log("houses don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(houses));

    } catch (error) {
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
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated"
        }
        await connectToDB();

        const updatedHouse = await House.findByIdAndUpdate(
            houseId,
            { $set: newValues },
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
    try {
        await connectToDB();
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

