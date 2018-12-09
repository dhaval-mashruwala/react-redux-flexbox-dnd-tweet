import { createConstants } from '../utils';

export const actions = createConstants(
  'FETCH_TWEETS_SUCCESS',
  'FETCH_TWEETS_ERROR',
  'SET_SAVED_TWEET',
  'REMOVE_SAVED_TWEET'
);
