import { TypedUseSelectorHook, useSelector as reduxUseSelector } from 'react-redux'
import type { AppState } from '@store'

const useSelector: TypedUseSelectorHook<AppState> = reduxUseSelector;

export default useSelector;
