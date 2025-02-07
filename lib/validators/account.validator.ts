import { z } from "zod";

export const AccountSchema= z.object({
    accountName: z.string().min(1, {
        message: "name must be at least 2 characters.",
    }),
    balance: z.coerce.number()
});