import { Category } from '@services/categories';
import { GlobalActionTypes } from '@store/_global/types';

export const ADD = 'CATEGORIES_ADD';

export interface Add {
    type: typeof ADD;
    categories: Category[];
}

export type CategoriesActionTypes = GlobalActionTypes | Add;

export interface CategoriesState {
    data: Category[];
}

export const initialState: CategoriesState = {
    data: [],
};
