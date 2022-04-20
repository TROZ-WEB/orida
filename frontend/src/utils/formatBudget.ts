/* SOURCE: https://stackoverflow.com/a/16637170 */

/**
 * Used to nicely format numbers with space separation
 * @param {number} budget  value to format
 * @returns {string} stringified value of the sum with a french formatting (numbers are grouped 3 digts at a time)
 * example: formatBudget(100) => "100"
 * example: formatBudget(10000) => "10 000"
 * example: formatBudget(123456789) => "123 456 789"
 */
function formatBudget(budget: number) {
    const parts = budget.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return parts.join('.');
}

export default formatBudget;
