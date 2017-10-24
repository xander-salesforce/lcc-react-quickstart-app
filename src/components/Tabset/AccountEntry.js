import React, { Component } from 'react';
import * as LCC from 'lightning-container';
import ButtonIcon from './ButtonIcon';

class AccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingField: false,
      accountValue: this.props.accountValue,
      prevValue: this.props.accountValue
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEditFieldChange = this.handleEditFieldChange.bind(this);
    this.enableEditing = this.enableEditing.bind(this);
    this.handleAccountBackendUpdate = this.handleAccountBackendUpdate.bind(this);
    this.handleAccountUpdateResponse = this.handleAccountUpdateResponse.bind(this);

  }

  handleKeyDown (event) {
    if ( event.key === "Enter" ) {
      // this.setState({editingField: false});
     this.handleAccountBackendUpdate( event );
    }
  }

  handleEditFieldChange( event ) {
    this.setState({accountValue: event.target.value});
  }

  handleAccountBackendUpdate(event) {
    let update = [this.props.accountId, 
                 this.props.accountType,
                 event.target.value];
    console.warn("update: " + update);
    /* ftplatform.QuickStartAppController */
    LCC.callApex("ftplatform.QuickStartAppController.updateAccount",
                 update.join('|'), this.handleAccountUpdateResponse,
                 {escape: true});
  }

  handleAccountUpdateResponse(result, event) {
    if (event.status) {
      // The apex returns a json object but all quotes are returned as &quot;
      let parse = result.replace(new RegExp("(&quot;)", 'g'), '"');
      console.warn(parse);
      let json_result = JSON.parse(parse);
      if (json_result['status'] == 'successful') {
        this.setState({prevValue: json_result['value'], editingField: false});
      } else {
        console.warn("Failed to save, returned with status: " + json_result['status']);
        this.setState({accountValue: this.state.prevValue, editingField: false});
      }
    }
    else if (event.type === "exception") {
      console.warn(event.message + " : " + event.where);
      this.setState({accountValue: this.state.prevValue, editingField: false});
    }
  }

  enableEditing() {
    this.setState({editingField: true});
  }
  
  render() {
    if (this.state.editingField === true) {
      return (
        <td className="slds-cell-edit" role="gridcell">
          <span className="slds-grid slds-grid_align-spread">
            <div className="slds-form-element">
              <div className="slds-form-element__control">
                <input type="text" id="text-input-id-1" className="slds-input" value={this.state.accountValue} onBlur={this.handleAccountBackendUpdate} onChange={this.handleEditFieldChange} onKeyDown={this.handleKeyDown} />
              </div>
            </div>
          </span>
        </td>
      );
    }

    let edit_value = "Edit " + this.props.accountType + ": " + this.state.accountValue;
    return (
      <td className="slds-cell-edit" role="gridcell">
        <span className="slds-grid slds-grid_align-spread">
          <span className="slds-truncate" title={this.state.accountValue}>{this.state.accountValue}</span>
            <button className="slds-button slds-button_icon slds-cell-edit__button slds-m-left_x-small" onClick={this.enableEditing} tabIndex="-1" title={edit_value}>
              <ButtonIcon name="edit" />
              <span className="slds-assistive-text">{edit_value}</span>
            </button>
        </span>
      </td>
    );
  }
}
export default AccountEntry;