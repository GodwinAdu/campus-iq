
export function generateCode(value:string) {
    // Extract the first letter of the first name
    const letter = value.charAt(0);

    // Generate 3 random letters
    const randomLetters:any = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

    // Generate 3 random numbers
    const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10).toString());

    // Combine the first letter, random letters, and random numbers to create a 6-character string
    const result = letter + randomLetters.join('') + randomNumbers.join('');

    return result;
}