export function generateSchoolCode(schoolName: string): string {
    // Split the school name into words and take the first word
    const firstWord = schoolName.split(' ')[0].toLowerCase();

    // Remove non-alphanumeric characters from the first word
    const sanitizedFirstWord = firstWord.replace(/[^a-zA-Z0-9]/g, '');

    // Generate a random number between 100 and 999
    const randomNumber = Math.floor(100 + Math.random() * 900);

    // Combine the sanitized first word and random number
    const uniqueCode = sanitizedFirstWord + randomNumber;

    return uniqueCode;
}