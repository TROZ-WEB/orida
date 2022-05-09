import { Category } from '@services/categories';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'CATEGORIES_UPSERT';

export interface Upsert {
    type: typeof UPSERT;
    categories: Category[];
}

export type CategoriesActionTypes = GlobalActionTypes | Upsert;

export interface CategoriesState {
    data: Category[];
}

export const initialState: CategoriesState = {
    data: [],
};
