import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuickstartApp from './components/QuickstartApp';
//import registerServiceWorker from './registerServiceWorker';
require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');
//require('salesforce-lightning-design-system-css');
//require("slds-loader");

ReactDOM.render(<QuickstartApp />, document.getElementById('app'));
