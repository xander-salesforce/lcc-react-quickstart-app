import React, { Component } from 'react';
import * as ForceJsService from './ForceJsService';
import PropTypes from 'prop-types';

export let requestUserInfo = id => {
  let q = "SELECT name, email, companyname, title, usertype FROM user WHERE id= '" + id + "'";
  return ForceJsService.query(q);
};

class ContextTab extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    userInfo: PropTypes.string.isRequired,
    enableSlds: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      userInfo: props.userInfo,
      enableSlds: props.enableSlds
    };
  }

  renderContext(contextJson) {
    if (contextJson === undefined) {
      return (
        <div/>
      );
    }
    if (this.props.enableSlds != this.state.enableSlds) {
      this.setState({enableSlds: this.props.enableSlds});
    }
    return (
      <div className="slds-card__body">
        By making calls into Apex, we can determine context information about the current user.
        Below is a sample of some context information that we have retrieved: <br/><br/>

        <table className={this.state.enableSlds ? "slds-table slds-table_fixed-layout slds-table_bordered slds-no-row-hover slds-table_cell-buffer" : ""}>
          <thead>
            <tr className={this.state.enableSlds ? "slds-text-title_caps" : ""}>
              <th scope="col">
                <div className="slds-truncate" title="Name">Name</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Company">Company</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Title">Title</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Email">Email</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="slds-hint-parent">
              <th scope="row">
                <div className="slds-truncate" title={contextJson['Name']}>{contextJson['Name']}</div>
              </th>
              <td>
                <div className="slds-truncate" title={contextJson['CompanyName']}>{contextJson['CompanyName']}</div>
              </td>
              <td>
                <div className="slds-truncate" title={contextJson['Title']}>{contextJson['Title']}</div>
              </td>
              <td>
                <div className="slds-truncate" title={contextJson['Email']}>{contextJson['Email']}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if (!this.state.userInfo && this.props.userInfo) {
      this.setState({userInfo: this.props.userInfo});
    }
    let userInfoParsed = this.state.userInfo ? this.renderContext(this.state.userInfo) : "";
    return (
      <div id="tab-default-1" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide')} role="tabpanel" aria-labelledby="tab-default-1__item">
        {userInfoParsed}
      </div>
    );
  }
}

export default ContextTab;
