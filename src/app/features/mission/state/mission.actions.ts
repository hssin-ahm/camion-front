import { createAction, props } from '@ngrx/store';
import { Driver } from '../../driver/models/driver.interface';
import { Truck } from '../../truck/models/truck.interface';
import { Mission } from '../models/mission.interface';
import { MissionHistoryReq } from '../models/missionHistoryReq.interface';

export const DELETE_MISSION_ACTION = '[missions page] delete mission';
export const DELETE_MISSION_SUCCESS = '[missions page] delete mission success';
export const LOAD_MISSIONS = '[missions page] load missions';
export const LOAD_MISSIONS_SUCCESS = '[missions page] load missions success';
export const SEARCH_MISSIONS = '[missions page] search missions';
export const SEARCH_MISSIONS_SUCCESS =
  '[missions page] Search missions success';
export const LOAD_MISSIONS_MODEL = '[Add mission page] load model missions';
export const LOAD_MISSIONS_MODEL_SUCCESS =
  '[Add mission page] load missions model success';

//form mission page
export const ADD_MISSION_ACTION = '[add mission page] add mission';
export const ADD_MISSION_SUCCESS = '[add mission page] add mission success';
export const GET_SINGLE_MISSION = '[Add mission page] get single mission';
export const GET_SINGLE_MISSION_SUCCESS =
  '[Add mission page] get single mission success';
export const GET_SINGLE_MISSION_FAIL =
  '[Add mission page] get single mission fail';
export const UPDATE_MISSION = '[Add mission page] update mission';
export const UPDATE_MISSION_SUCCESS =
  '[Add mission page] update mission success';

export const LOAD_TRUCKS = '[missions page] load trucks';
export const LOAD_TRUCKS_SUCCESS = '[missions page] load trucks success';

export const LOAD_DRIVERS = '[missions page] load drivers';
export const LOAD_DRIVERS_SUCCESS = '[missions page] load drivers success';

export const LOAD_CLIENTS = '[missions page] load clients';
export const LOAD_CLIENTS_SUCCESS = '[missions page] load clients success';

// mission history page
export const FILTER_MISSION_BETWEEN_TWO_DATES =
  '[missions history page] filter mission between two dateS';
export const FILTER_MISSION_BETWEEN_TWO_DATES_SUCCESS =
  '[missions history page] filter mission between two date success';
export const FILTER_MISSION_BETWEEN_TWO_DATES_FAIL =
  '[missions history page] filter mission between two date fail';

// mission tracking page
export const LOAD_ALL_MISSIONS =
  '[missions page] load missions without pagination';
export const LOAD_ALL_MISSIONS_SUCCESS =
  '[missions page] load missions without pagination success';
export const LOAD_ALL_MISSIONS_FAIL =
  '[missions page] load missions without pagination fail';

export const deleteMission = createAction(
  DELETE_MISSION_ACTION,
  props<{ id; page; limit }>()
);
export const deleteMissionSuccess = createAction(DELETE_MISSION_SUCCESS);

export const loadMissions = createAction(
  LOAD_MISSIONS,
  props<{
    page: number;
    limit: number;
    searchField?;
    value?;
  }>()
);
export const loadMissionsSuccess = createAction(
  LOAD_MISSIONS_SUCCESS,
  props<{ missions: Mission[] }>()
);
export const searchMissions = createAction(
  SEARCH_MISSIONS,
  props<{ value: string }>()
);
export const searchMissionsSuccess = createAction(
  SEARCH_MISSIONS_SUCCESS,
  props<{ missions: Mission[] }>()
);

//form mission page

export const addMission = createAction(
  ADD_MISSION_ACTION,
  props<{ mission }>()
);

export const addMissionSuccess = createAction(ADD_MISSION_SUCCESS);

export const getSingleMission = createAction(
  GET_SINGLE_MISSION,
  props<{ id }>()
);
export const getSingleMissionSuccess = createAction(
  GET_SINGLE_MISSION_SUCCESS,
  props<{ mission }>()
);
export const getSingleMissionFail = createAction(GET_SINGLE_MISSION_FAIL);
export const updateMission = createAction(UPDATE_MISSION, props<{ mission }>());
export const updateMissionSuccess = createAction(UPDATE_MISSION_SUCCESS);

export const loadTrucksWithoutPagination = createAction(LOAD_TRUCKS);
export const loadTrucksWithoutPaginationSuccess = createAction(
  LOAD_TRUCKS_SUCCESS,
  props<{ trucks: Truck[] }>()
);

export const loadDriversWithoutPagination = createAction(LOAD_DRIVERS);
export const loadDriversWithoutPaginationSuccess = createAction(
  LOAD_DRIVERS_SUCCESS,
  props<{ drivers: Driver[] }>()
);

export const loadClientsWithoutPagination = createAction(LOAD_CLIENTS);
export const loadClientsWithoutPaginationSuccess = createAction(
  LOAD_CLIENTS_SUCCESS,
  props<{ clients: any }>()
);

//form mission page
export const filterMissionBetweenTwoDate = createAction(
  FILTER_MISSION_BETWEEN_TWO_DATES,
  props<{ missionHistoryReq: MissionHistoryReq }>()
);
export const filterMissionBetweenTwoDateSuccess = createAction(
  FILTER_MISSION_BETWEEN_TWO_DATES_SUCCESS,
  props<{ missions }>()
);
export const filterMissionBetweenTwoDateFail = createAction(
  FILTER_MISSION_BETWEEN_TWO_DATES_FAIL
);
// mission tracking page

export const loadMissionsWithoutPagination = createAction(LOAD_ALL_MISSIONS);
export const loadMissionsWithoutPaginationSuccess = createAction(
  LOAD_ALL_MISSIONS_SUCCESS,
  props<{ missions }>()
);
export const loadMissionsWithoutPaginationFail = createAction(
  LOAD_ALL_MISSIONS_FAIL
);
