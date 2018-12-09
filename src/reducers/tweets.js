import { actions } from '../actions';

const initialState = {
  errors: false,
  tweets:[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TWEETS_SUCCESS:
    return {
      ...state,
      tweets: action.data && action.data.tweets
    };

    case actions.FETCH_TWEETS_ERROR:
    return {
      ...state,
      error: action.error
    }
    default:
    return state;
  }
}
