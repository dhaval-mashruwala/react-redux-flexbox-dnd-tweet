import React from "react";
import PropTypes from 'prop-types';
import Tweet from '../../components/Tweet';
import Loader from '../../components/Loader';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// this is left section of application which contains search and tweets results
export default class LeftSection extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      message: '',
      error: {
        emptyQuery: false 
      }
    };
  }
  // this will be called when user hits seach and call to fetch tweets will be handled
  onSearch = async () => {
    const { searchText, error } = this.state;
    if( searchText ) {
      this.setState({error, loading: true});
      await this.props.fetchTweets(searchText);
      error.emptyQuery = false;
      this.setState({error, loading: false});
    } else {
      error.emptyQuery = true;
      this.setState({error, message: 'search query cannot be empty'});
    }
  }

  _renderTweets = (tweets) => {
    return tweets.map((tweet, index)=>(
      <Draggable
        key={tweet.id}
        draggableId={tweet.id}
        index={index}>
        {(provided, snapshot) => (
          <Tweet
            provided={provided} 
            photo={tweet.user && tweet.user.biggerProfileImageURL}
            name={tweet.user && tweet.user.name}
            screenName={tweet.user && tweet.user.screenName}
            text={tweet.text}
            date={tweet.createdAt}
          />
        )}
      </Draggable>
     ))
  }

  _renderLoader = () => (
    <div className='loader-container'>
      <Loader></Loader>
      <Loader></Loader>
      <Loader></Loader>
      <Loader></Loader>
      <Loader></Loader>
    </div>
  )


  /* Render the component */
  render() {
    const { searchText, error, message, loading } = this.state;
    const { tweets } = this.props;
    return (
      <div className='left-section'>
        <div className='wrapper'>
        <div className='search-wrapper'>
          {error.emptyQuery && message && <span className='error'>{message}</span>}
          <input 
            className='search-box' 
            placeholder='Search Twitter' 
            type='text'
            onChange={(e)=>this.setState({searchText:e.currentTarget.value})} 
            value={searchText}
          />
          <button className='search-btn' onClick={this.onSearch}>
            <i className='fa fa-search'></i>
          </button>
        </div>
        <Droppable droppableId="left-section">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            className='tweets-list-container'>
            {loading?this._renderLoader():null}
            {!loading && tweets.length ? this._renderTweets(tweets): null}
            {!loading && !tweets.length ? (
              <div className='no-tweets'>
                <span> You have no tweets. Try search for it.</span>
              </div>
              ):null}
          </div>
        )}
        </Droppable>
        </div>
      </div>
    );
  }
}
LeftSection.propTypes = {
  fetchTweets: PropTypes.func,
  tweets: PropTypes.array
}
