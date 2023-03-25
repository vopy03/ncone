import { createGlobalState } from 'react-hooks-global-state';

const initialState:any = { favorites: []};
const { setGlobalState, useGlobalState } = createGlobalState(initialState);

export { setGlobalState, useGlobalState }