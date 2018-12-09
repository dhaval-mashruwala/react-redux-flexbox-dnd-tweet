import React from "react";
import PropTypes from 'prop-types';
import Tweet from '../../components/Tweet';
import { Droppable } from 'react-beautiful-dnd';
// this is right section component which contains saved tweets
export default class RightSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderTweets = (savedTweets) => {
    const { removeSavedTweet } = this.props;
    return savedTweets.map((tweet, index)=>(
      <Tweet
        key={tweet.id}
        photo={tweet.user && tweet.user.biggerProfileImageURL}
        name={tweet.user && tweet.user.name}
        screenName={tweet.user && tweet.user.screenName}
        text={tweet.text}
        date={tweet.createdAt}
        isRemovable={true}
        removeSavedTweet={removeSavedTweet.bind(this, index)}
      />
     ));
  }


  /* Render the component */
  render() {
    const { savedTweets } = this.props;
    
    return (
      <div className='right-section'>
        <div className='wrapper'>
        <div className='empty-container'>
          
        </div>
        <Droppable droppableId="right-section">
        {(provided, snapshot) => (
          <div 
          ref={provided.innerRef}
          className='tweets-list-container'
          >
          {savedTweets.length ? this._renderTweets(savedTweets): null}
          {!savedTweets.length ? (
            <div className='no-tweets'>
              <span> You have no saved tweets</span>
            </div>
            ):null}
          </div>
        )}
        </Droppable>
        </div>
      </div>
    );
  }
};

RightSection.propTypes = {
  savedTweets: PropTypes.array,
  removeSavedTweet: PropTypes.func
};
