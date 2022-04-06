import type { AppState } from '@store';
import { TypedUseSelectorHook, useSelector as reduxUseSelector } from 'react-redux';

const useSelector: TypedUseSelectorHook<AppState> = reduxUseSelector;

export default useSelector;
