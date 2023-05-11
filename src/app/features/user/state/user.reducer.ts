// import { Action, createReducer, on } from '@ngrx/store';
// import { getMe } from './user.actions';
// import { LayoutState, initialState } from './user.state';

// const _layoutReducer = createReducer(
//   initialState,
//   on(getMe, (state, action): LayoutState => {
//     return {
//       ...state,
//       currentUser: action.currentUser,
//     };
//   })
// );

// export function LayoutReducer(state: LayoutState, action: Action) {
//   return _layoutReducer(state, action);
// }
