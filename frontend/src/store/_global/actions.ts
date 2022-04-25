import { GlobalActionTypes, RESET_STORE } from './types';

/* CROSS STORE ACTIONS */

/* eslint-disable-next-line */
export const resetStoreAction = (): GlobalActionTypes => ({
    type: RESET_STORE,
});
