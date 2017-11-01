import React, { Component } from 'react';
import AllAccountEntries from './AllAccountEntries';
import PropTypes from 'prop-types';

class RemoteActionsTab extends Component {
  static propTypes = {
    isActive: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {isActive: this.props.isActive};
  }


  render() {
    if (this.props.isActive !== undefined) {
      this.setState({isActive: this.props.isActive});
    }
    return (
      <div id="tab-default-3" className={'slds-tabs_default__content ' + (this.state.isActive ? 'slds-show' : 'slds-hide')} role="tabpanel" aria-labelledby="tab-default-3__item">
        <AllAccountEntries queryReq="Id,Name,AccountNumber,AnnualRevenue,Industry"/>
      </div>
    );
  }
}

export default RemoteActionsTab;