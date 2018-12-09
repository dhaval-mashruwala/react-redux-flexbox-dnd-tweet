import {combineReducers} from 'redux';
import tweets from './tweets';
import savedTweets from './savedTweets';

const allReducers = combineReducers({
  tweets,
  savedTweets
});

export default allReducers;
