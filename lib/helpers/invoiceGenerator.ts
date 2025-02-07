
export function generateInvoiceNumber() {
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // January is 0, so we add 1
    const day = today.getDate();

    // Format the date components into a string suitable for an invoice number
    const invoiceNumber = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`;

    return invoiceNumber;
}