import { get } from 'lodash/fp';

export const findPoke = (state = {}, poke) => get(poke, state);
