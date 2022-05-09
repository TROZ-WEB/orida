import { ReduxDispatch } from '@hooks/useThunkDispatch';
import OrganizationService, {
    CreateProps,
    Organization,
    UpdateProps,
} from '@services/organizations';

import { OrganizationActionTypes, UPSERT } from './types';

export const upsertAction = (organizations: Organization[]): OrganizationActionTypes => ({
    type: UPSERT,
    organizations,
});

export const create = (props: CreateProps) => {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await OrganizationService.create(props);
        dispatch(upsertAction([result]));
    };
};

export const update = (props: UpdateProps) => {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await OrganizationService.update(props);
        dispatch(upsertAction([result]));
    };
};

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await OrganizationService.getAll();
        dispatch(upsertAction(result));
    };

export const getOne =
    (id: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await OrganizationService.getOne(id);
        if (result) {
            dispatch(upsertAction([result]));
        }
    };
