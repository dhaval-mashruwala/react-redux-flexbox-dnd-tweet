import {actions} from '../../actions';
import {fetchTweets as fetchTweetsApi, fetchBackupTweets} from '../../api'


export const fetchTweets = (query) => {
  return async dispatch => {
    try{
      const res = await fetchTweetsApi(query, 10);
      dispatch({
        type: actions.FETCH_TWEETS_SUCCESS,
        data:res.data
      });

    } catch(e){
      /* rest api is giving CORS error hence this is backup response if it gives CORS error */
      try {
        const res = await fetchBackupTweets();
        dispatch({
          type: actions.FETCH_TWEETS_SUCCESS,
          data:res.data
        });
      } catch(e) {
        dispatch({
          type: actions.FETCH_TWEETS_ERROR,
          error:e.toString()
        });
  
      }
    }
  }
}

export const setSavedTweets = (draggedTweet) => {
  return dispatch => {
    try{
      dispatch({
        type: actions.SET_SAVED_TWEET,
        data:draggedTweet
      });

    } catch(e){
      throw e;
    }
  }
}
export const removeSavedTweet = (tweetIndex) => {
  return dispatch => {
    try{
      dispatch({
        type: actions.REMOVE_SAVED_TWEET,
        data:tweetIndex
      });

    } catch(e){
      throw e;
    }
  }
}
