// remove duplicates of objects from an array
function isPropValuesEqual<T>(subject: T, target: T, propNames: (keyof T)[]) {
    return propNames.every((propName) => subject[propName] === target[propName]);
}

function uniq<T>(items: T[], propNames: (keyof T)[]) {
    return items.filter(
        (item, index, array) => index === array.findIndex(
            (foundItem) => isPropValuesEqual<T>(foundItem, item, propNames),
        ),
    );
}

export default uniq;
