import { clsx, type ClassValue } from "clsx"
import moment from "moment";
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const getStartAndEndOfMonth = (month: number, year: number) => {
  const startDate = new Date(year, month - 1, 1); // Month is 0-indexed
  const endDate = new Date(year, month, 0); // Last day of the month
  return { startDate, endDate };
};

export const dayLeft = (date: Date) => {
  // Define the target date
  const targetDate = moment(date, 'YYYY-MM-DD');

  // Get today's date
  const today = moment();

  // Calculate the difference in days
  const daysLeft = targetDate.diff(today, 'days');
  return daysLeft;
}

export function getNextDate(today: Date, period: number): Date {
  const nextDate = new Date(today);

  // Add the specified period (in months) to the current date
  nextDate.setMonth(today.getMonth() + period);

  // Handle cases where adding months results in a day mismatch
  if (nextDate.getDate() !== today.getDate()) {
    nextDate.setDate(0); // Adjust to the last day of the previous month if the day mismatches
  }

  return nextDate;
}

export function getNextMonthDate(today: Date): Date {
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  if (nextMonth.getDate() !== today.getDate()) {
    nextMonth.setDate(0); // Last day of the previous month if day mismatch
  }
  return nextMonth;
}




const JWT_SECRET = process.env.TOKEN_SECRET_KEY!

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}

export function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function numberToWords(num: number): string {
  if (num === 0) return "zero";

  const belowTwenty: string[] = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens: string[] = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const thousands: string[] = ["", "thousand", "million", "billion"];

  function helper(n: number): string {
    if (n === 0) return "";
    else if (n < 20) return belowTwenty[n] + " ";
    else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
    else return belowTwenty[Math.floor(n / 100)] + " hundred " + helper(n % 100);
  }

  let result: string = "";
  for (let i = 0; num > 0; i++, num = Math.floor(num / 1000)) {
    if (num % 1000 !== 0) {
      result = helper(num % 1000) + thousands[i] + " " + result;
    }
  }

  return result.trim();
}


export function getOrdinalSuffix(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}


export type AttendanceRecord = {
  id: string;
  year: number;
  month: number;
  personId: string;
  type: 'student' | 'teacher';
  attendance: boolean[];
};

export const attendanceRecords: AttendanceRecord[] = [];

export function addAttendanceRecord(newRecord: AttendanceRecord) {
  const existingRecordIndex = attendanceRecords.findIndex(
    record => record.year === newRecord.year &&
    record.month === newRecord.month &&
    record.personId === newRecord.personId &&
    record.type === newRecord.type
  );

  if (existingRecordIndex !== -1) {
    attendanceRecords[existingRecordIndex] = newRecord;
  } else {
    attendanceRecords.push(newRecord);
  }
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

