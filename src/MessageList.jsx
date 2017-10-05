import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    render() {
              
      let messageComponents = this.props.messages.map((eachMsg) => {
        // let {id, username, content } = eachMsg;
          return <Message id={eachMsg.id} key={eachMsg.id}username={eachMsg.username}
        content={eachMsg.content} />
        //  return <Message key={id} username = {username} content={content} />;
      });

        console.log("Rendering <MessageList/>");

        return (
            <main className="messages">
              {messageComponents}     
            </main>
        );
    }
}

export default MessageList;