import { Category } from '@services/categories';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { ADD, CategoriesActionTypes, CategoriesState, initialState } from './types';

const categoriesReducer = (
    /* eslint-disable-next-line default-param-last */
    state = initialState,
    action: CategoriesActionTypes
): CategoriesState => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                data: uniq<Category>([...state.data, ...action.categories], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default categoriesReducer;
