import { ReduxDispatch } from '@hooks/useThunkDispatch';
import ProjectService, { CreateProps, Project } from '@services/projects';

import {
    ADD,
    ProjectActionTypes,
} from './types';

export const addAction = (projects: Project[]): ProjectActionTypes => ({
    type: ADD,
    projects,
});

export const create = (props: CreateProps) => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    const result = await ProjectService.create(props);
    dispatch(addAction([result]));
};

export const getAll = () => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    const result = await ProjectService.getAll();
    dispatch(addAction(result));
};
