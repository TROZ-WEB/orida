import { Category } from '@services/categories';
import { Status } from '@services/status';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import {
    FiltersActionTypes,
    FiltersState,
    initialState,
    SELECT_CATEGORY,
    SELECT_STATUS,
    UNSELECT_CATEGORY,
    UNSELECT_STATUS,
} from './types';

/* eslint-disable-next-line default-param-last */
const filtersReducer = (state = initialState, action: FiltersActionTypes): FiltersState => {
    switch (action.type) {
        case SELECT_CATEGORY:
            return {
                ...state,
                categories: uniq<Category>([...state.categories, action.category], ['id']),
            };
        case UNSELECT_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter((cat) => cat.id !== action.category.id),
            };
        case SELECT_STATUS:
            return {
                ...state,
                status: uniq<Status>([...state.status, action.status], ['id']),
            };
        case UNSELECT_STATUS:
            return {
                ...state,
                status: state.status.filter((cat) => cat.id !== action.status.id),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default filtersReducer;
