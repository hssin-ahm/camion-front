import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MissionState } from './mission.state';
export const MISSION_STATE_NAME = 'mission';

export const missionFeatureSelector =
  createFeatureSelector<MissionState>(MISSION_STATE_NAME);
export const getMissions = createSelector(
  missionFeatureSelector,
  (missionState: MissionState) => missionState.missions
);

export const getSiglemissionSelector = createSelector(
  missionFeatureSelector,
  (missionState: MissionState) => missionState.mission
);

export const getTrucksWithoutPagination = createSelector(
  missionFeatureSelector,
  (missionState: MissionState) => missionState.trucks
);

export const getDriversWithoutPagination = createSelector(
  missionFeatureSelector,
  (missionState: MissionState) => missionState.drivers
);
export const getClientsWithoutPagination = createSelector(
  missionFeatureSelector,
  (missionState: MissionState) => missionState.clients
);
export const getMissionsHistory = createSelector(
  missionFeatureSelector,
  (missionState: MissionState) => missionState.missionsHistory
);
export const getMissionsWithoutPagination = createSelector(
  missionFeatureSelector,
  (missionState: MissionState) => missionState.missionsWP
);
