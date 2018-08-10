
import { createAction } from 'redux-actions';
import { get } from 'axios';
import { toast } from 'react-toastify';
import { API } from '../constants';

export const saveOnStore = createAction('SAVE-ON-STORE');

export const read = (opts) => (async (dispatch) => {
  try {
    const res = await get(`${API}${opts.slug}`);
    const { data } = res;
    dispatch(saveOnStore({ data, name: opts.name }));
  } catch (e) {
    toast.error('Erro! nada encontrado', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
});
