import Budget from '@customTypes/budget';
import { Category } from '@services/categories';
import { Status } from '@services/status';
import { GlobalActionTypes } from '@store/_global/types';

export const SELECT_CATEGORY = 'FILTERS_SELECT_CATEGORY';
export const UNSELECT_CATEGORY = 'FILTERS_UNSELECT_CATEGORY';
export const SELECT_STATUS = 'FILTERS_SELECT_STATUS';
export const UNSELECT_STATUS = 'FILTERS_UNSELECT_STATUS';
export const SELECT_BUDGET = 'FILTERS_SELECT_BUDGET';
export const UNSELECT_BUDGET = 'FILTERS_UNSELECT_BUDGET';

export interface SelectCategory {
    type: typeof SELECT_CATEGORY;
    category: Category;
}

export interface UnselectCategory {
    type: typeof UNSELECT_CATEGORY;
    category: Category;
}

export interface SelectStatus {
    type: typeof SELECT_STATUS;
    status: Status;
}

export interface UnselectStatus {
    type: typeof UNSELECT_STATUS;
    status: Status;
}

export interface SelectBudget {
    type: typeof SELECT_BUDGET;
    budget: Budget;
}

export interface UnselectBudget {
    type: typeof UNSELECT_BUDGET;
    budget: Budget;
}

export type FiltersActionTypes =
    | GlobalActionTypes
    | SelectCategory
    | UnselectCategory
    | SelectStatus
    | UnselectStatus
    | SelectBudget
    | UnselectBudget;

export interface FiltersState {
    categories: Category[];
    status: Status[];
    budgets: Budget[];
}

export const initialState: FiltersState = {
    categories: [],
    status: [],
    budgets: [],
};
