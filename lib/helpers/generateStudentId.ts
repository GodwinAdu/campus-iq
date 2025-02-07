export function generateStudentID() {
    const prefix = "STU-";
    const maxRandomNumber = 999999; // The maximum random number within 6 digits
    const uniqueID = Math.floor(Math.random() * maxRandomNumber);
  
    const paddedID = uniqueID.toString().padStart(6, '0'); // Ensure it has 6 digits
  
    const studentID = `${prefix}${paddedID}`;
    return studentID;
  }
 