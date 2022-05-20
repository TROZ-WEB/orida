import { ReduxDispatch } from '@hooks/useThunkDispatch';
import RolesService, { Role } from '@services/roles';

import { RolesActionTypes, UPSERT } from './types';

export const upsertAction = (roles: Role[]): RolesActionTypes => ({
    type: UPSERT,
    roles,
});

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await RolesService.getAll();
        dispatch(upsertAction(result));
    };
