import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';

import { AppState } from '../store';

export type ReduxDispatch = ThunkDispatch<AppState, {}, AnyAction>;

const useThunkDispatch = (): ReduxDispatch => {
    return useDispatch<ReduxDispatch>();
};

export default useThunkDispatch;
