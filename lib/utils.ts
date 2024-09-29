import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Sign-in */
export const authFormSchema = () =>
  z.object({
    staff_id: z.string().regex(/^\d+$/, "Staff ID must be a numeric string"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });
