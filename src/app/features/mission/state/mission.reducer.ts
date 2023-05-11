import { Action, createReducer, on } from '@ngrx/store';
import {
  filterMissionBetweenTwoDateFail,
  filterMissionBetweenTwoDateSuccess,
  getSingleMissionSuccess,
  loadClientsWithoutPaginationSuccess,
  loadDriversWithoutPaginationSuccess,
  loadMissionsSuccess,
  loadMissionsWithoutPaginationSuccess,
  loadTrucksWithoutPaginationSuccess,
} from './mission.actions';
import { initialState, MissionState } from './mission.state';

const _missionReducer = createReducer(
  initialState,
  on(loadMissionsSuccess, (state, action): MissionState => {
    return {
      ...state,
      missions: action.missions,
    };
  }),
  on(getSingleMissionSuccess, (state, action): MissionState => {
    return {
      ...state,
      mission: action.mission,
    };
  }),
  on(loadTrucksWithoutPaginationSuccess, (state, action): MissionState => {
    return {
      ...state,
      trucks: action.trucks,
    };
  }),
  on(loadDriversWithoutPaginationSuccess, (state, action): MissionState => {
    return {
      ...state,
      drivers: action.drivers,
    };
  }),
  on(loadClientsWithoutPaginationSuccess, (state, action): MissionState => {
    return {
      ...state,
      clients: action.clients,
    };
  }),
  on(filterMissionBetweenTwoDateSuccess, (state, action): MissionState => {
    return {
      ...state,
      missionsHistory: action.missions,
    };
  }),
  on(filterMissionBetweenTwoDateFail, (state, action): MissionState => {
    return {
      ...state,
      missionsHistory: null,
    };
  }),
  on(loadMissionsWithoutPaginationSuccess, (state, action): MissionState => {
    return {
      ...state,
      missionsWP: action.missions,
    };
  })
);

export function MissionReducer(state: MissionState, action: Action) {
  return _missionReducer(state, action);
}
