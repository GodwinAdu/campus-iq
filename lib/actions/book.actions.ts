"use server"

import { revalidatePath } from "next/cache";

import Book from '../models/book.models';
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";

interface CreateBookProps {
    title: string;
    author: string;
    publicationYear: number;
    isbn?: string | undefined;
    copiesAvailable?: number | undefined;
}
export async function createBook(values: CreateBookProps, path: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('You must be logged in');

        const schoolId = user.schoolId;

        const { title, author, isbn, publicationYear, copiesAvailable } = values;

        await connectToDB();

        const existingBook = await Book.findOne({ title, author });

        if (existingBook) {
            throw new Error("Book already exists")
        };

        const book = new Book({
            schoolId,
            title,
            author,
            isbn: isbn || "",
            publicationYear,
            copiesAvailable,
            createdBy: user?._id,
            action_type: "created"
        })

        await book.save();

        revalidatePath(path)

    } catch (error) {
        console.log("Unable to create book", error);
        throw error;
    }
}

export async function fetchBookById(bookId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const book = await Book.findById(bookId);

        if (!book) {
            throw new Error("Book not found");
        }

        return JSON.parse(JSON.stringify(book))

    } catch (error) {
        console.log("unable to fetch book by id", error);
        throw error;
    }
}


export async function fetchAllBooks() {
    try {
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        const schoolId = user.schoolId;

        await connectToDB();

        const books = await Book.find({ schoolId });

        if (!books) {
            return [];
        };

        return JSON.parse(JSON.stringify(books));

    } catch (error) {
        console.log("Unable to fetch all books", error);
        throw error;
    }
}

export async function deleteBook(id: string) {
    try {
        await connectToDB();
        const data = await Book.findByIdAndDelete(id);

        if (!data) {
            throw new Error("Book cant be delete")
        }

        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        console.log("unable to delete book", error);
        throw error;
    }
}


export async function updateBook(bookId: string, values: Partial<CreateBookProps>, path: string) {
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

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: newValues },
            { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!updatedBook) {
            console.log("Book not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedBook));
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}
