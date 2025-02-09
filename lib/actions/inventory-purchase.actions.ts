"use server"

import InventoryPurchase from '../models/inventory-purchase.models';
import InventoryProduct from '../models/inventory-product.models';
import { connectToDB } from '../mongoose';
import { revalidatePath } from 'next/cache';
import InventorySupplier from '../models/inventory-supplier.models';
import InventoryStore from '../models/inventory-store.models';
import { currentUser } from '../helpers/current-user';

interface ItemsProps {
    products: string;
    quantity: number;
    discount: number;
}

interface PurchaseProps {
    supplierId: string;
    storeId: string;
    status?: string;
    purchaseDate: Date;
    purchaseItems: ItemsProps[];
}

export async function createPurchase(values: PurchaseProps, path: string) {
    try {
        const { supplierId, storeId, status, purchaseDate, purchaseItems } = values;
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        // Fetch and update product quantities
        for (const item of values.purchaseItems) {
            const product = await InventoryProduct.findById(item.products);
            if (product) {
                product.quantity += item.quantity;
                await product.save();
            } else {
                throw new Error(`Product with ID ${item.products} not found.`);
            }
        }

        // Create new purchase
        const newPurchase = new InventoryPurchase({
            schoolId,
            supplierId,
            storeId,
            status,
            purchaseDate,
            purchaseItems,
            createdBy: user._id,
            action_type: "created"
        });

        await newPurchase.save();
        revalidatePath(path); // Revalidate the cache for the updated data

    } catch (error) {
        console.error('Error creating purchase:', error);
        // Handle the error as needed, e.g., throw it, return a value, etc.
        throw error;
    }
}



export async function fetchAllPurchases() {
    try {
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        // Fetch all purchases and populate the related fields
        const purchases = await InventoryPurchase.find({schoolId})
            .populate([
                { path: 'supplierId', model: InventorySupplier, select: 'name' },
                { path: 'storeId', model: InventoryStore, select: 'name' },
            ]) // Populate supplier details, assuming the Supplier model has a `name` field
            .exec();

        if (purchases.length === 0) {
            return []
        }

        return JSON.parse(JSON.stringify(purchases));
    } catch (error) {
        console.error('Error fetching purchases:', error);
        throw error;
    }
}


export async function fetchPurchaseById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const purchase = await InventoryPurchase.findById(id).lean()

        if (!purchase) {
            console.log('Purchase not found');
            return null;
        }

        return JSON.parse(JSON.stringify(purchase));
    } catch (error) {
        console.error('Error fetching purchase by ID:', error);
        throw error;
    }
}


export async function updatePurchase(purchaseId: string, values: Partial<PurchaseProps>, path: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated"
        }

        const updatedPurchase = await InventoryPurchase.findByIdAndUpdate(
            purchaseId,
            { $set:  newValues  },
            { new: true, runValidators: true }
        );

        if (!updatedPurchase) {
            console.log('Purchase not found');
            return null;
        }

        console.log('Update successful');

        // Revalidate the path if necessary
        revalidatePath(path);

    } catch (error) {
        console.error('Error updating purchase status:', error);
        throw error;
    }
}



export async function deletePurchase(id: string) {
    try {
        await connectToDB();

        const purchase = await InventoryPurchase.findByIdAndDelete(id)
        if (!purchase) {
            console.log('Purchase not found');
            return null; // or throw an error if you want to handle it differently
        }

        // Subtract the quantity of products purchased from the respective products
        for (const item of purchase.purchaseItems) {
            const product = await InventoryProduct.findById(item.products);
            if (product) {
                product.quantity -= item.quantity;
                await product.save();
            } else {
                throw new Error(`Product with ID ${item.products} not found.`);
            }
        }

        console.log('Delete successful');

        return JSON.parse(JSON.stringify(purchase));
    } catch (error) {
        console.error('Error deleting purchase:', error);
        throw error;
    }
}