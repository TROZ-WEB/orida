import { ReduxDispatch } from '@hooks/useThunkDispatch';
import ProjectService, { CreateProps, Project } from '@services/projects';

import { ADD, ProjectActionTypes, SEARCH } from './types';

export const addAction = (projects: Project[]): ProjectActionTypes => ({
    type: ADD,
    projects,
});

export const searchAction = (projects: Project[]): ProjectActionTypes => ({
    type: SEARCH,
    projects,
});

export const create =
    (props: CreateProps) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.create(props);
        dispatch(addAction([result]));
    };

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.getAll();
        dispatch(addAction(result));
    };

export const search =
    (value: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.search(value);
        dispatch(searchAction(result));
    };

export const resetSearch =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(searchAction([]));
    };
