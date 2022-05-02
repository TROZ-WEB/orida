function sortBy<T>(propName: keyof T) {
    return (a: T, b: T) => {
        if (a[propName] > b[propName]) return 1;
        if (a[propName] < b[propName]) return -1;

        return 0;
    };
}

export default sortBy;
