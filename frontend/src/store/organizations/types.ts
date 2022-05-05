import { Organization } from '@services/organizations';
import { GlobalActionTypes } from '@store/_global/types';

export const ADD = 'ORGANIZATIONS_ADD';
export interface Add {
    type: typeof ADD;
    organizations: Organization[];
}

export type OrganizationActionTypes = GlobalActionTypes | Add;

export interface OrganizationState {
    data: Organization[];
}

export const initialState: OrganizationState = {
    data: [],
};
