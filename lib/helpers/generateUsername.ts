


export function generateUniqueUsername(fullName:string):string {
  // Remove spaces and convert to lowercase
  const namePart = fullName.replace(/\s+/g, '').toLowerCase();

  // Generate a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  // Combine the name part and random number to form the unique username
  const username = `${namePart}${randomNum}`;

  return username;
}

 