/**
 * Retrieve the initials of a set of words
 * @param {String} input set of names separated by spaces
 * @returns {String} concatenation of the first letter of each names
 */
function getInitials(input: string) {
    const names = input.split(' ');

    return names.map((name) => name[0]).join('');
}

export default getInitials;
