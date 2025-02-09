"use server"

import { revalidatePath } from "next/cache";
import InventoryCategory from "../models/inventory-category.models";
import InventoryProduct from "../models/inventory-product.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";


interface ProductProps {
    name: string;
    categoryId: string;
    purchasePrice: number;
    salePrice: number;
    quantity: number;
}

export async function createProduct(values: ProductProps, path: string) {
    try {
        const { name, categoryId, purchasePrice, salePrice, quantity } = values
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const [existingProduct, category] = await Promise.all([
            InventoryProduct.findOne({ schoolId, name }),
            InventoryCategory.findById(categoryId)
        ])


        if (existingProduct) {
            throw new Error("Product already exists");
        }

        if (!category) {
            throw new Error("Invalid category ID");
        }


        const newProduct = new InventoryProduct({
            schoolId,
            name,
            categoryId,
            purchasePrice,
            salePrice,
            quantity,
            createdBy: user._id,
            action_type: "created",
        });

        category.products.push(newProduct._id);
        await Promise.all([
            newProduct.save(),
            category.save(),
        ]);

        revalidatePath(path)

    } catch (error) {
        console.log("Error creating product: ", error);
        throw error;

    }

}


export async function fetchAllProducts() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const products = await InventoryProduct.find({ schoolId });

        if (products.length === 0) {
            console.log("No products found");
            return [];
        }

        return JSON.parse(JSON.stringify(products));

    } catch (error) {
        console.log("Error fetching inventory products: ", error);
        throw error;
    }
}


export async function fetchProductById(productId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        await connectToDB();

        const product = await InventoryProduct.findById(productId);

        if (!product) {
            console.log("Product not found");
            return null;
        }

        return JSON.parse(JSON.stringify(product));

    } catch (error) {
        console.log("Error fetching inventory product by id: ", error);
        throw error;
    }
}

// actions/product.actions.js



export async function fetchProductsByCategory(categoryId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();
        const products = await InventoryProduct.find({ schoolId, categoryId });
        if (!products) {
            console.log("No products found for this category");
            return [];
        }
        return JSON.parse(JSON.stringify(products));

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}



export async function updateProduct(productId: string, values: Partial<ProductProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        
        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated",
        };

        const updatedProduct = await InventoryProduct.findByIdAndUpdate(
            productId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            console.log("Product not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedProduct));
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export async function deleteProduct(id: string) {
    try {
        await connectToDB();

        const product = await InventoryProduct.findByIdAndDelete(id);
        if (!product) {
            console.log("Product doesn't exist");
            return null; // or throw an error if you want to handle it differently
        }

        // Remove the product ID from the products array in InventoryCategory
        await InventoryCategory.updateMany(
            { products: id },
            { $pull: { products: id } }
        );

        console.log("Delete successfully");

        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.error("Error deleting Product:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}
