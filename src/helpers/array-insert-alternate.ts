// export const insertAlternate = (firstArray: any[], secondArray) => {
// const result: any[] = [];
// const min = (firstArray.length, secondArray.length);
// }

export const insertAlternate = (array: any[], between: any, insertEnd: boolean) => {
    const result: any[] = [];
    for (let i = 0; i < array.length; i++) {
        result.push(array[i]);
        if (i < array.length - 1 || insertEnd) {
            result.push(between);
        }
    }

    return result;
}