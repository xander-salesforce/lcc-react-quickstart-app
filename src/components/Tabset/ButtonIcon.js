import React, { Component } from 'react';
import PropTypes from 'prop-types';

// require("../../../node_modules/@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg");
require("../../../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg");

class ButtonIcon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        stateful: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        hint: PropTypes.string.isRequired
    }
    render() {
        let useTag = '<use xlink:href="symbols.svg#' + this.props.name + '" />';
        let className  = "slds-button__icon";
        if (this.props.stateful) {
            className += "--stateful";
        }
        if (this.props.position) {
            className = className + " slds-button__icon--" + this.props.position;
        }
        if (this.props.size) {
            className = className + " slds-button__icon--" + this.props.size;
        }
        if (this.props.hint) {
            className = className + " slds-button__icon--hint";
        }
        return <svg  aria-hidden="true" className={className} dangerouslySetInnerHTML={{__html: useTag }} />;
    }
}

export default ButtonIcon;