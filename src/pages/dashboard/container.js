import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import View from './view';

const mapStateToProps = state => {
  return {tweets:state.tweets.tweets,savedTweets:state.savedTweets.savedTweets};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
};

let container = connect(mapStateToProps, mapDispatchToProps)(View);

export default container;
