import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function handlePrismaError(error: any): string {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle user-caused errors
        switch (error.code) {
            case "P2002": // Unique constraint failed
                return "Unique data constraint failed, something wrong with your data or such data already exists.";
            case "P2025": // Record not found
                return "The requested data does not exist. Maybe it was deleted or made unavailable for public.";
            // Add more cases as needed
            default:
                return "An error occurred with your request. Try refreshing the page or seek for our support.";
        }
    } else if (
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error.code.startsWith("P1") || // Server errors like P1000, etc
        error.code.startsWith("P6")
    ) {
        // Prisma Accelerate-related errors
        // Handle server-related errors

        console.error(error); // Log the error to the console

        return "Internal server error, please submit a support request.";
    } else {
        // Handle all other errors that are not specifically user-caused or server-related

        console.error(error); // Log the error to the console
        return "An unexpected error occurred.";
    }
}
