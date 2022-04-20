function normalize(value: string) {
    return value
        .trim() // remove heading and tailing spaces
        .toLowerCase() // remove case sensitivity
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // remove accentuation
}

export default normalize;
