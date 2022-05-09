import { ReduxDispatch } from '@hooks/useThunkDispatch';
import { Category } from '@services/categories';
import ProjectService, { CreateProps, Project } from '@services/projects';
import { Status } from '@services/status';

import { FILTER, ProjectActionTypes, SEARCH, UPSERT } from './types';

export const upsertAction = (projects: Project[]): ProjectActionTypes => ({
    type: UPSERT,
    projects,
});

// search page
export const searchAction = (projects: Project[]): ProjectActionTypes => ({
    type: SEARCH,
    projects,
});

// explore page
export const filterAction = (projects: Project[]): ProjectActionTypes => ({
    type: FILTER,
    projects,
});

export const create =
    (props: CreateProps) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.create(props);
        dispatch(upsertAction([result]));
    };

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.getAll();
        dispatch(upsertAction(result));
    };

export const getOne =
    (id: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.getOne(id);
        if (result) {
            dispatch(upsertAction([result]));
        }
    };

export const search =
    (value: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.search({ search: value });
        dispatch(searchAction(result));
    };

interface FilterFiltersProps {
    status: Status[];
    categories: Category[];
}

export const filter = ({ status, categories }: FilterFiltersProps) => {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.search({ status, categories });
        dispatch(filterAction(result));
    };
};

export const resetSearch =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(searchAction([]));
    };
