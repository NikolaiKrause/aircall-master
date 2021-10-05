import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(newProps) {
    return (this.props.view != newProps.view)
  }

  render() {
    var changeView = this.props.changeView;
    return (
      <footer>
        <button 
          id="inbox"
          onClick={() => changeView('inbox')}
          className={this.props.view=='inbox'?'nav-button selected':'nav-button'}
        >
          Inbox
        </button>
        <button 
          id="inbox"
          onClick={() => changeView('all')}
          className={this.props.view=='all'?'nav-button selected':'nav-button'}
        >
          All Calls
        </button>
      </footer>
    )
  }
}

export default Footer;