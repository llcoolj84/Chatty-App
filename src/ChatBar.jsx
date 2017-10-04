import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onType = this.onType.bind(this);
    
  } 

  // new function 
  onType(target) {

     if(target.key === 'Enter'){
      this.props.chatBox(document.getElementById('chatbarUsername').value,
      document.getElementById('chatbarMessage').value);
      document.getElementById('chatbarMessage').value = '';
    };
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
       <input id='chatbarUsername' className="chatbar-username" defaultValue={this.props.name} placeholder="Your Name (Optional)" />
        <input id='chatbarMessage' className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.onType} />
      </footer>
    );
  }
}
export default ChatBar;
