
import { createAction } from 'redux-actions';
import { get } from 'axios';
import { API } from '../constants';

export const saveOnStore = createAction('SAVE-ON-STORE');

export const read = (slug) => (async (dispatch) => {
  const res = await get(`${API}${slug}`);
  const { data } = res;

  dispatch(saveOnStore(data));

  console.log('chegou aq');
});
