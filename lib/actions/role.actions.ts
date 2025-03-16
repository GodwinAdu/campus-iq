"use server"

import { revalidatePath } from "next/cache";
import Role from "../models/role.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";
import RoleSchema from "../validators/role.validator";
import { z } from "zod";
import History from "../models/history.models";


type CreateRoleProps = z.infer<typeof RoleSchema>
export async function createRole(values: CreateRoleProps, path: string) {
    const {
        name,
        displayName,
        description,
        permissions
    } = values;


    try {
        const user = await currentUser();
        const schoolId = user?.schoolId
        await connectToDB();
        // Check if any existing role matches the provided name, display name, or description
        const existingRole = await Role.findOne({ schoolId, displayName, name });

        // If an existing role is found, throw an error
        if (existingRole) {
            throw new Error('Role with the same name, display name, or description already exists');
        }

        const role = new Role({
            name,
            displayName,
            description,
            schoolId,
            permissions,
            createdBy: user?._id,
            action_type: "create",
        });

        const history = new History({
            schoolId,
            actionType: 'ROLE_CREATED',
            details: {
                roleId: role._id,
                createdBy: user?._id,
            },
            message: `${user.fullName} created new role with (ID: ${role._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user?._id,
            entityId: role._id,
            entityType: 'ROLE'  // The type of the entity
        });


        await Promise.all([
            role.save(),
            history.save(),
        ]);

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

