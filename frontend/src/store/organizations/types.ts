import { Organization } from '@services/organizations';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'ORGANIZATIONS_UPSERT';
export interface Upsert {
    type: typeof UPSERT;
    organizations: Organization[];
}

export type OrganizationActionTypes = GlobalActionTypes | Upsert;

export interface OrganizationState {
    data: Organization[];
}

export const initialState: OrganizationState = {
    data: [],
};
