export function generateSchoolCode(schoolName: string): string {
    // Split the school name into words and take the first word
    let firstWord = schoolName.split(' ')[0].toLowerCase();

    // Remove non-alphanumeric characters from the first word
    let sanitizedFirstWord = firstWord.replace(/[^a-zA-Z0-9]/g, '');

    // Generate a random number between 100 and 999
    let randomNumber = Math.floor(100 + Math.random() * 900);

    // Combine the sanitized first word and random number
    let uniqueCode = sanitizedFirstWord + randomNumber;

    return uniqueCode;
}