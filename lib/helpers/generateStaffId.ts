export function generateUniqueStaffId() {
    // Generate an 8-digit random number
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);

    return randomNum.toString();
}