import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { AppState } from '../store';

export type ReduxDispatch = ThunkDispatch<AppState, {}, AnyAction>;

const useThunkDispatch = (): ReduxDispatch => useDispatch<ReduxDispatch>();

export default useThunkDispatch;
