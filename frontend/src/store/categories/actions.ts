import { ReduxDispatch } from '@hooks/useThunkDispatch';
import CategoriesService, { Category } from '@services/categories';

import { CategoriesActionTypes, UPSERT } from './types';

export const upsertAction = (categories: Category[]): CategoriesActionTypes => ({
    type: UPSERT,
    categories,
});

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await CategoriesService.getAll();
        dispatch(upsertAction(result));
    };
