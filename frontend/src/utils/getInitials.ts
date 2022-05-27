/**
 * Retrieve the initials of a set of words
 * @param {String} input set of names separated by spaces
 * @returns {String} concatenation of the first letter of each names
 */
function getInitials(input: string) {
    const names = input
        .split(' ') // consider whitespace as a separator for names
        .filter(value => value.length > 0); // remove empty strings (occurs when a user enter mmultiple whitespaces)

    return names.map((name) => name[0].toUpperCase()).join('');
}

export default getInitials;
