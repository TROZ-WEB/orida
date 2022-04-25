import { ReduxDispatch } from '@hooks/useThunkDispatch';
import { Category } from '@services/categories';
import { Status } from '@services/status';

import {
    FiltersActionTypes,
    SELECT_CATEGORY,
    SELECT_STATUS,
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
