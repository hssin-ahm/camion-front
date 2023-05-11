import { createAction, props } from '@ngrx/store';
import { Contract } from '../../../models/contract.interface';
import { Fournisseur } from '../../../models/founisseur.interface';
import { TruckModel } from '../../../models/truck_model.interface';

export const SELECTED_TAB = '[Add truck page] number tab selected';

export const LOAD_TRUCKS_MODEL = '[Add truck page] load model trucks';
export const LOAD_TRUCKS_MODEL_SUCCESS =
  '[Add truck page] load trucks model success';
export const ADD_TRUCKS_MODEL = '[Add truck page] add model trucks';
export const ADD_TRUCKS_MODEL_SUCCESS =
  '[Add truck page] add model trucks success';
export const ADD_TRUCK_ACTION = '[add truck page] add truck';
export const ADD_TRUCK_SUCCESS = '[add truck page] add truck success';
export const LOAD_FOUNISSEURS = '[Add truck page] load founisseur';
export const LOAD_FOUNISSEUR_SUCCESS =
  '[Add truck page] load founisseur success';

export const ADD_FOUNISSEUR = '[Add truck page] add founisseur';
export const ADD_FOUNISSEUR_SUCCESS = '[Add truck page] add founisseur success';

export const ADD_CONTRACT = '[Add truck page] add contract';
export const ADD_CONTRACT_SUCCESS = '[add truck page] add contract success';
export const UPDATE_CONTRACT = '[Add truck page] update contract';
export const UPDATE_CONTRACT_SUCCESS =
  '[Add truck page] update contract success';
export const UPDATE_CONTRACT_FAIL = '[Add truck page] update contract fail';

export const GET_TRUCK_CONTRACT = '[add truck page] get truck contract';
export const GET_TRUCK_CONTRACT_SUCCESS =
  '[add truck page] get truck contract success';

export const GET_SINGLE_TRUCK = '[Add truck page] get single truck';
export const GET_SINGLE_TRUCK_SUCCESS =
  '[Add truck page] get single truck success';
export const GET_TRUCK_CONTRACT_FAIL =
  '[add truck page] get truck contract fail';

export const GET_SINGLE_TRUCK_FAIL = '[Add truck page] get single truck fail';

export const UPDATE_TRUCK = '[Add truck page] update truck';
export const UPDATE_TRUCK_SUCCESS = '[Add truck page] update truck success';

export const GET_COSTS = '[cost page] get all costs truck';
export const GET_COSTS_SUCCESS = '[cost page] get all costs success';

export const GET_TOTAL_PRICE =
  '[cost page] get total price for specifique truck';
export const GET_TOTAL_PRICE_SUCCESS =
  '[cost page] get total price success for specifique truck';

export const selectedTab = createAction(
  SELECTED_TAB,
  props<{ tab_number: number }>()
);
export const loadTruckModel = createAction(LOAD_TRUCKS_MODEL);

export const loadTruckModelSuccess = createAction(
  LOAD_TRUCKS_MODEL_SUCCESS,
  props<{ truck_models: TruckModel[] }>()
);

export const AddTruckModel = createAction(
  ADD_TRUCKS_MODEL,
  props<{ model: TruckModel }>()
);

export const AddTruckModelSuccess = createAction(ADD_TRUCKS_MODEL_SUCCESS);

export const addTruck = createAction(ADD_TRUCK_ACTION, props<{ truck }>());

export const addTruckSuccess = createAction(
  ADD_TRUCK_SUCCESS,
  props<{ truck_id: number }>()
);

export const loadFounisseurs = createAction(LOAD_FOUNISSEURS);

export const loadFounisseursSuccess = createAction(
  LOAD_FOUNISSEUR_SUCCESS,
  props<{ fournisseurs }>()
);
export const AddFounisseur = createAction(
  ADD_FOUNISSEUR,
  props<{ fournisseur: Fournisseur }>()
);
export const AddFounisseurSuccess = createAction(ADD_FOUNISSEUR_SUCCESS);
export const addContract = createAction(ADD_CONTRACT, props<{ contract }>());
export const addContractSuccess = createAction(ADD_CONTRACT_SUCCESS);
export const updateContract = createAction(
  UPDATE_CONTRACT,
  props<{ contract }>()
);
export const updateContractFail = createAction(UPDATE_CONTRACT_FAIL);
export const updateContractSuccess = createAction(UPDATE_CONTRACT_SUCCESS);

export const getTruckContract = createAction(
  GET_TRUCK_CONTRACT,
  props<{ truck_id }>()
);
export const getTruckContractSuccess = createAction(
  GET_TRUCK_CONTRACT_SUCCESS,
  props<{ contract: Contract }>()
);
export const getTruckContractFail = createAction(GET_TRUCK_CONTRACT_FAIL);

export const getSingleTruck = createAction(GET_SINGLE_TRUCK, props<{ id }>());
export const getSingleTruckSuccess = createAction(
  GET_SINGLE_TRUCK_SUCCESS,
  props<{ truck }>()
);
export const getSingleTruckFail = createAction(GET_SINGLE_TRUCK_FAIL);
export const updateTruck = createAction(UPDATE_TRUCK, props<{ truck }>());
export const updateTruckSuccess = createAction(UPDATE_TRUCK_SUCCESS);
GET_TOTAL_PRICE;
export const getCosts = createAction(
  GET_COSTS,
  props<{ truck_id; page: number; limit: number }>()
);
export const getCostsSuccess = createAction(
  GET_COSTS_SUCCESS,
  props<{ costs }>()
);

export const getTotalPrice = createAction(
  GET_TOTAL_PRICE,
  props<{ truck_id }>()
);
export const getTotalPriceSuccess = createAction(
  GET_TOTAL_PRICE_SUCCESS,
  props<{ total }>()
);
