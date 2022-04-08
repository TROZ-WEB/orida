import classNamesOriginal, { Argument } from 'classnames';
import { overrideTailwindClasses } from 'tailwind-override';

// utils function to wrap classnames with override tailwind
const classnames = (...args: Argument[]) => overrideTailwindClasses(classNamesOriginal(...args));

export default classnames;
