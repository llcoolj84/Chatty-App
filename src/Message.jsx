import React, {Component} from 'react';

export default class Message extends Component {
  render() {

    // Formats usernames and messages from parent component
    return (
      <div className='message'>
        <div className='message system' >{this.props.notification}</div>
        <span className='message-username' style={{color: this.props.color}}>{this.props.username}</span>
        <span className='message-content' style={{color: this.props.color}}>{this.props.content}</span>
      </div>
    );
  };
};

