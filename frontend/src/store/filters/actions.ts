import Budget from '@customTypes/budget';
import { ReduxDispatch } from '@hooks/useThunkDispatch';
import { Category } from '@services/categories';
import { Status } from '@services/status';

import {
    FiltersActionTypes,
    SELECT_BUDGET,
    SELECT_CATEGORY,
    SELECT_STATUS,
    UNSELECT_BUDGET,
    UNSELECT_CATEGORY,
    UNSELECT_STATUS,
} from './types';

// ----- CATEGORIES -----
export const selectCategoryAction = (item: Category): FiltersActionTypes => ({
    type: SELECT_CATEGORY,
    category: item,
});

export const unselectCategoryAction = (item: Category): FiltersActionTypes => ({
    type: UNSELECT_CATEGORY,
    category: item,
});

export const selectCategory =
    (value: Category) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(selectCategoryAction(value));
    };

export const unselectCategory =
    (value: Category) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(unselectCategoryAction(value));
    };

// ----- STATUS -----
export const selectStatusAction = (item: Status): FiltersActionTypes => ({
    type: SELECT_STATUS,
    status: item,
});

export const unselectStatusAction = (item: Status): FiltersActionTypes => ({
    type: UNSELECT_STATUS,
    status: item,
});

export const selectStatus =
    (value: Status) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(selectStatusAction(value));
    };

export const unselectStatus =
    (value: Status) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(unselectStatusAction(value));
    };

// ----- BUDGETS -----
export const selectBudgetAction = (item: Budget): FiltersActionTypes => ({
    type: SELECT_BUDGET,
    budget: item,
});

export const unselectBudgetAction = (item: Budget): FiltersActionTypes => ({
    type: UNSELECT_BUDGET,
    budget: item,
});

export const selectBudget =
    (value: Budget) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(selectBudgetAction(value));
    };

export const unselectBudget =
    (value: Budget) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(unselectBudgetAction(value));
    };
