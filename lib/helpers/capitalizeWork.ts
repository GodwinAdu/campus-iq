export function capitalizeWords(inputString:string):string {
    return inputString.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}