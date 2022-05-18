type SortByDirection = 'ASC' | 'DESC';

function sortBy<T>(propName: keyof T, direction: SortByDirection = 'ASC') {
    return (a: T, b: T) => {
        if (a[propName] > b[propName]) return direction === 'ASC' ? 1 : -1;
        if (a[propName] < b[propName]) return direction === 'ASC' ? -1 : 1;

        return 0;
    };
}

export default sortBy;
