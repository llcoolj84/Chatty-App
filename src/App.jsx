import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navigation from './Navigation.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          key: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          key: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <ChatBar  name={this.state.currentUser.name}  />
          <MessageList messages={this.state.messages}/>
        <Navigation/>
      </div>
    );
  }
}


export default App;


//////////////

// export default class TimerComponent extends Component {
//   // set the initial state to indicate that that the timer is not loading
//   // React will call the functions in the following order when it mounts the component:
//   //   constructor
//   //   componentWillMount (not used in this component)
//   //   render
//   //   componentDidMount
//   constructor(props) {
//     super(props);
//     this.state = {loading: false};
//   }

//   // Called after the component was rendered and it was attached to the DOM.
//   // This is a good place to make ajax requests or setTimeout.
//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({loading: true})  // change the state. this calls render() and the component updates.
//     }, 3000)
//   }

//   // Called any time the props or state changes. The jsx elements returned in this
//   // method are rendered in the DOM.
//   render() {
//     if(this.state.loading) {
//       return <h1>Loading...</h1>
//     } else {
//       return <h1>3 seconds have elapsed and page is loaded</h1>
//     }
//   }
// }