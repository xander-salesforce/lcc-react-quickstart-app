import React, { Component } from 'react';
import AllAccountEntries from './AllAccountEntries';

class RemoteActionsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};
  }


  render() {
    return (
      <div id="tab-default-3" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide')} role="tabpanel" aria-labelledby="tab-default-3__item">
        <AllAccountEntries queryReq='Id,Name,AccountNumber,AnnualRevenue,Industry'/>
      </div>
    );
  }
}

export default RemoteActionsTab;