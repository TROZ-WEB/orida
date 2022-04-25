import { ReduxDispatch } from '@hooks/useThunkDispatch';
import CategoriesService, { Category } from '@services/categories';

import { ADD, CategoriesActionTypes } from './types';

export const addAction = (categories: Category[]): CategoriesActionTypes => ({
    type: ADD,
    categories,
});

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await CategoriesService.getAll();
        dispatch(addAction(result));
    };
