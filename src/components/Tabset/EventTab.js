import React, { Component } from 'react';
import * as LCC from 'lightning-container';

class EventTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.getMessageForm = this.getMessageForm.bind(this);
    this.handleToast = this.handleToast.bind(this);
    this.handleSuccessToast = this.handleSuccessToast.bind(this);
    this.handleWarningToast = this.handleWarningToast.bind(this);
    this.handleErrorToast = this.handleErrorToast.bind(this);
  }

  handleMessageChange(event) {
    this.setState({sendMessageValue: event.target.value});
  }

  handleToast(event) {
    this.sendMessage("LccToastEvent", "info", this.state.sendMessageValue);
    return event;
  }

  handleErrorToast(event) {
    this.sendMessage("LccToastEvent", "error", this.state.sendMessageValue);
    return event;
  }

  handleWarningToast(event) {
    this.sendMessage("LccToastEvent", "warning", this.state.sendMessageValue);
    return event;
  }

  handleSuccessToast(event) {
    this.sendMessage("LccToastEvent", "success", this.state.sendMessageValue);
    return event;
  }
  
  sendMessage(event_type, subtype, message) {
    LCC.sendMessage({name: event_type, subtype: subtype, value: message});
  }

  getMessageForm() {
    return (
      <div className="slds-form-element">
        <label className="slds-form-element__label" for="input-unique-id">Toast Message:</label>
        <div className="slds-form-element__control">
          <input type="text" id="input-unique-id" className="slds-input" placeholder="Placeholder Text" value={this.state.sendMessageValue} onChange={this.handleMessageChange} />
        </div>
      </div>
    );
  }

  render() {
    let messageForm = this.getMessageForm();
    return (
      <div id="tab-default-2" className={'slds-tabs_default__content ' + (this.props.isActive ? 'slds-show' : 'slds-hide')} role="tabpanel" aria-labelledby="tab-default-2__item">
        {messageForm}
        <ul className="slds-button-group-list">
          <li>
            <button className="slds-button slds-button_neutral" onClick={this.handleToast}>Info Toast</button>
          </li>
          <li>
            <button className="slds-button slds-button_neutral" onClick={this.handleSuccessToast}>Success Toast</button>
          </li>
          <li>
            <button className="slds-button slds-button_neutral" onClick={this.handleWarningToast}>Warning Toast</button>
          </li>
          <li>
            <button className="slds-button slds-button_neutral" onClick={this.handleErrorToast}>Error Toast</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default EventTab;