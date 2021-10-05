import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faBox, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

class Call extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.is_archived
    }
  }

  render() {

    // Determine icon based on call direction
    var directionIcon;
    if (this.props.direction == 'inbound') directionIcon = faArrowDown;
    else directionIcon = faArrowUp;

    var to = this.props.to==null ? 'Uknown Caller' : this.props.to;

    var blurb;
    switch (this.props.call_type) {
      case 'voicemail':
        blurb = `left a voicemail for ${to}`;
        break;

      case 'missed':
        blurb = `tried to call ${to}`;
        break;

      default:
        blurb = `called ${to}`;
    }

    return (
      <div className={`call ${this.props.call_type} ${this.props.is_archived ? 'archived': ''}`}>
        <div className='direction-arrow'>
          <FontAwesomeIcon icon={directionIcon}/>
        </div>
        <div className='call-body'>
          <p className='from'>{this.props.from}</p>
          <p className='to'>{blurb}</p>
          <p className='via'>{this.props.via}</p>
        </div>
        <div className='archive-button'>
          <button
            onClick={this.props.toggleArchive}
            onMouseOver={() => {this.setState({open: !this.props.is_archived})}}
            onMouseOut={() => {this.setState({open: this.props.is_archived})}}
          >
            <FontAwesomeIcon icon={this.state.open ? faBoxOpen : faBox}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    );
  }
}

export default Call;