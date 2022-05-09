// remove duplicates of objects from an array
function isPropValuesEqual<T>(subject: T, target: T, propNames: (keyof T)[]) {
    return propNames.every((propName) => subject[propName] === target[propName]);
}

// TODO : return the function
// (/!\ indexes of array from left to right : new values needs to be first in array or they will be erased by old ones)
function uniq<T>(items: T[], propNames: (keyof T)[]) {
    return items.filter(
        (item, index, array) =>
            index ===
            array.findIndex((foundItem) => isPropValuesEqual<T>(foundItem, item, propNames))
    );
}

export default uniq;
