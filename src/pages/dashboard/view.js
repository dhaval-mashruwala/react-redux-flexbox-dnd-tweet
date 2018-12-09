import React from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import components from './components';
const { Header, LeftSection, RightSection } = components;
export default class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDraggedTweet = (draggedTweetId) => {
    const { tweets } = this.props;
    return tweets.find((tweet)=>(tweet.id === draggedTweetId));
  }

  removeSavedTweet = (tweetIndex) => {
    try {
      const {removeSavedTweet} = this.props;
      removeSavedTweet(tweetIndex);
    } catch (e) {
      console.log('Something went wrong',e);
    }
  }

  onDragEnd = result => {
    try {
      const {setSavedTweets} = this.props;
      const { destination, draggableId } = result;
      // if dropable is invalid
      if (!destination) {
        return;
      }
      if(destination.droppableId === 'right-section' && draggableId){
        let draggedTweet = this.getDraggedTweet(draggableId);
        if( draggedTweet ) {
          setSavedTweets( draggedTweet );
        }
      }
    } catch (e) {
      console.log('Something went wrong',e);
    }
  }

  /* Render the component */
  render() {
    const { fetchTweets, tweets, savedTweets } = this.props;
    return (
      <div className='container'>
        <Header></Header>
        <div className='tweet-container'>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <LeftSection 
            fetchTweets={fetchTweets}
            tweets={tweets}
          />
          <div className='drag-arrow-container'>
            <span>Drag tweet</span>
            <i className='fa fa-arrow-right arrow-right'></i>
            <span>To save</span>
          </div>
          <RightSection
            savedTweets={savedTweets}
            removeSavedTweet={this.removeSavedTweet}
          />
        </DragDropContext>
          
        </div>
      </div>
    );
  }
}
