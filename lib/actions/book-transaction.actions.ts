"use server"

import { revalidatePath } from "next/cache";;
import BookFine from "../models/book-fine.models";
import BookTransaction from "../models/book-transaction.models";
import Book from "../models/book.models";
import { connectToDB } from "../mongoose";
import { ClientSession, startSession } from "mongoose";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";

export async function createFinedAmount(amount: number): Promise<void> {
    try {
        const user = await currentUser();

        if (!user) throw new Error("You must be logged in");

        const schoolId = user.schoolId

        await connectToDB()
        // Create a new BookFine document
        const newBookFine = new BookFine({
            amount,
            schoolId,
            createdBy: user?._id,
            action_type: "created"
        });
        const history = new History({
            schoolId,
            actionType: 'BOOKFINE_CREATED', // Use a relevant action type
            details: {
                itemId: newBookFine._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new Behavior for  a student with (ID: ${newBookFine._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id, // User who performed the action,
            entityId: newBookFine._id,  // The ID of the deleted unit
            entityType: 'BOOKFINE',  // The type of the entity
        });

        await Promise.all([
            newBookFine.save(),
            history.save()
        ]);
    } catch (error) {
        console.error("Error adding amount to user:", error);
        throw error;
    }
}

export async function fetchFinedAmounts() {
    try {
        const user = await currentUser();

        if(!user) throw new Error('user not logged in');

        const schoolId = user.schoolId

        await connectToDB();
        // Fetch all BookFine documents from the database
        const bookFines = await BookFine.findOne({schoolId});

        if (!bookFines) {
            return [];
        }

        return JSON.parse(JSON.stringify(bookFines));

    } catch (error) {
        console.error("Error fetching BookFines:", error);
        throw error;
    }
}

export async function resetBookFine(id: string) {
    try {
        const user = await currentUser();
        if(!user) throw new Error("user not logged in");

        await connectToDB();
        // Find the user by their ID
        const result = await BookFine.findByIdAndDelete(id)
        if (!result) {
            console.log("BookFine not found");
            // Optionally, you can throw an error here if you want to handle it differently
        } else {
            console.log("BookFine deleted successfully");
        }
    } catch (error) {
        console.error("Error adding amount to result:", error);
        throw error;
    }
}

interface IssueBookProps {
    bookId: string;
    studentId: string;
    classId: string;
    issuedDate: Date;
    dueDate: Date;
}

export async function createIssueBook(values: IssueBookProps, path: string) {
    try {
        const { bookId, studentId, issuedDate, dueDate } = values;

        if (!bookId || !studentId || !issuedDate || !dueDate) {
            throw new Error("Invalid parameters. All fields are required.");
        }

        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const schoolId = user.schoolId;

        await connectToDB();

        // Fetch the book and check if it is already issued to the student
        const [book, existingBookIssued] = await Promise.all([
            Book.findById(bookId),
            BookTransaction.findOne({ bookId, studentId })
        ]);

        if (!book) {
            throw new Error("Book not found");
        }

        if (book.copiesAvailable === undefined || book.copiesAvailable <= 0) {
            throw new Error("Book not available");
        }

        if (existingBookIssued) {
            throw new Error("Book already issued to this student");
        }

        // Create a new book transaction
        const newIssue = new BookTransaction({
            schoolId,
            bookId,
            studentId,
            librarian: user._id,
            issuedDate,
            dueDate,
            createdBy: user._id,
            action_type: "created"
        });

        await newIssue.save();

        // Update book availability
        if (book.copiesIssued !== undefined) {
            book.copiesIssued += 1;
        } else {
            book.copiesIssued = 1;
        }
        book.copiesAvailable -= 1;
        await book.save();

        // Revalidate the path for Next.js ISR/SSG
        revalidatePath(path);

        return { success: true, message: "Book issued successfully" };

    } catch (error) {
        console.error("Unable to create issue book:", error);
        throw error;
    }
}


export async function fetchAllBooksIssued() {
    try {
        const user = await currentUser();

        if (!user) throw new Error("User not authenticated");
        const schoolId = user.schoolId;
        await connectToDB();

        const issuedBooks = await BookTransaction.find({schoolId})
            .populate([{ path: "bookId" }, { path: "studentId" }, { path: "librarian" }]);
        if (!issuedBooks) throw new Error("Book transaction not find");

        return JSON.parse(JSON.stringify(issuedBooks));

    } catch (error) {
        console.error("unable to connect to fetch all books issued:", error);
        throw error;
    }
}



export async function deleteBookIssued(id: string) {
    // Declare session variable
    let session: ClientSession | null = null;

    try {
        await connectToDB();

        // Start a session for transaction
        session = await startSession();
        session.startTransaction();

        // Find the issued book transaction
        const issuedBook = await BookTransaction.findById(id).session(session);
        if (!issuedBook) {
            throw new Error("Issued book not found");
        }

        const bookId = issuedBook.bookId.toString();

        // Find the corresponding book
        const book = await Book.findById(bookId).session(session);
        if (!book) {
            throw new Error("Book not found");
        }

        // Delete the issued book transaction
        await BookTransaction.findByIdAndDelete(id).session(session);

        // Update book copies
        if (book.copiesIssued !== undefined) {
            book.copiesIssued -= 1;
        } else {
            book.copiesIssued = 0;
        }
        if (book.copiesAvailable !== undefined) {
            book.copiesAvailable += 1;
        } else {
            book.copiesAvailable = 1;
        }

        // Save the updated book details
        await book.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        console.log("Book issue deleted successfully");

        return { success: true, message: "Book issue deleted successfully" };

    } catch (error) {
        console.error("Unable to delete book issue:", error);
        // Check if session is defined and in a transaction, then abort
        if (session && session.inTransaction()) {
            await session.abortTransaction();
        }
        throw error;
    } finally {
        // End the session if it was started
        if (session) {
            session.endSession();
        }
    }
}
