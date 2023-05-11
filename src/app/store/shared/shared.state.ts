export interface SharedState {
  showLoading: boolean;
  actuelItem: string;
  actuelItemActive: string;
}
export const initialState: SharedState = {
  showLoading: false,
  actuelItem: '',
  actuelItemActive: '',
};
