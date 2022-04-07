import classNamesOriginal, { Argument } from 'classnames';
import { overrideTailwindClasses } from 'tailwind-override';

// utils function to wrap classnames with override tailwind
export const classnames = (...args: Argument[]) => overrideTailwindClasses(classNamesOriginal(...args));
