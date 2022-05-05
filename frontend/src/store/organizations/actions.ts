import { ReduxDispatch } from '@hooks/useThunkDispatch';
import OrganizationService, { CreateProps, Organization } from '@services/organizations';

import { ADD, OrganizationActionTypes } from './types';

export const addAction = (organizations: Organization[]): OrganizationActionTypes => ({
    type: ADD,
    organizations,
});

export const create = (props: CreateProps) => {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await OrganizationService.create(props);
        dispatch(addAction([result]));
    };
};

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await OrganizationService.getAll();
        dispatch(addAction(result));
    };

export const getOne =
    (id: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await OrganizationService.getOne(id);
        if (result) {
            dispatch(addAction([result]));
        }
    };
