/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { merge } from 'lodash/fp';
import * as actions from './actions';


const routeInitialState = fromJS({
  location: null,
});

const readReducer = handleActions({
  [actions.saveOnStore]: (state, { payload }) => merge({ [payload.name]: payload.data }, state)
}, {});

const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
};

const createReducer = (injectedReducers) => combineReducers({
  route: routeReducer,
  ...injectedReducers,
  cache: readReducer,
});

export default createReducer;
