import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Call from './Call.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'loading'
    }
    this.changeView = this.changeView.bind(this);
  }

  toggleArchive(call) {
    // Update the state of the call
    call.is_archived = !call.is_archived
    var newCalls = this.state.calls.map(c => {
      return c.id == call.id ? call : c
    })
    this.setState({
      calls: newCalls
    })

    // Notify API of the change
    fetch(`https://aircall-job.herokuapp.com/activities/${call.id}`, {
      'method': 'POST',
      'body': {
        'is_archived': call.is_archived
      }
    })
  }

  componentDidMount() {
    fetch('https://aircall-job.herokuapp.com/activities', {
      'method': 'GET'
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        calls: response,
        view: 'inbox'
      });
    })
  }

  changeView(val) {
    this.setState({
      view: val
    })
  }

  render() {

    // Decide what content can be viewed based on 'view' state
    var content;
    if (this.state.view=='loading') {
      content = 'Loading';
    } else {
      // Calls are selected based on 'view' state
      var calls;
      if (this.state.view == 'inbox') {
        calls = this.state.calls.filter(c => !c.is_archived)
      } else calls = this.state.calls;
      
      content = calls.map(call => {
        return <Call {...call} 
          toggleArchive={this.toggleArchive.bind(this, call)}
          key={call.id}
        />
      })
    }
    
    return (
      <div className='container'>
        <Header/>
        <div className="container-view">{content}</div>
        <Footer
          changeView={this.changeView}
          view={this.state.view}
        />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
