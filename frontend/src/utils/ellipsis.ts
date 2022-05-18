/**
 * Truncate the given input to a defined length if the limit is exceeded.
 * Note that truncation is dumb (ie, do not care about words, line space, white space or anything else)
 * @param {String} input initial value
 * @param {number} length limit of char
 * @returns {String} truncate string with three dots as ellipsis marker
 */
const ellipsis = (input: string, length: number) => {
    const normalizedInput = input.trim();

    if (normalizedInput.length < length) return normalizedInput;

    return `${normalizedInput.substring(0, length).trim()}...`;
};

export default ellipsis;
