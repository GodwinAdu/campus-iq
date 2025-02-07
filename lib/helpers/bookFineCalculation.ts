// utils/calculateFine.js
const calculateFine = (dueDate:Date, returnedDate:Date) => {
    const due = new Date(dueDate);
    const returned = new Date(returnedDate);
    const diffTime = Math.abs(returned - due);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const finePerDay = 5; // For example, 5 units of currency per day
    const fine = diffDays * finePerDay;

    return fine > 0 ? fine : 0;
};

export default calculateFine;
