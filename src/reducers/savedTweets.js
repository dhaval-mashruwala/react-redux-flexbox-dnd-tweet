import { actions } from '../actions';

const initialState = {
  savedTweets:[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SAVED_TWEET:
  {    
    let savedTweets = [...state.savedTweets];
    const savedTweetsIds = savedTweets.map((tweet)=>(tweet.id));

    if( savedTweetsIds.indexOf(action.data.id) ) {
        savedTweets.push(action.data);
    }
    return {
      ...state,
      savedTweets
    };
  }
    case actions.REMOVE_SAVED_TWEET:
    
    {
      let savedTweets = [...state.savedTweets];
    savedTweets.splice(action.data, 1);
    return {
      ...state,
      savedTweets
    };
  }

    default:
    return state;
  }
}
