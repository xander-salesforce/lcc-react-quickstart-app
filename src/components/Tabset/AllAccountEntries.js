import React, { Component } from 'react';
import * as LCC from 'lightning-container';
import AccountEntry from './AccountEntry';

class AllAccountEntries extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      itemsToQuery: this.props.queryReq || 'Id',

      // accounts:[{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009xA1wIAE"},"Name":"Hyatt","Id":"001B0000009xA1wIAE"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009xAvfIAE"},"Name":"Dream Boat","Id":"001B0000009xAvfIAE"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j8IAC"},"Name":"GenePoint","AccountNumber":"CC978213","AnnualRevenue":30000000,"Industry":"Biotechnology","Id":"001B0000009D7j8IAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j6IAC"},"Name":"United Oil &amp; Gas, UK","AccountNumber":"CD355119-A","Industry":"Energy","Id":"001B0000009D7j6IAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7iyIAC"},"Name":"Edge Communications","AccountNumber":"CD451796","AnnualRevenue":139000000,"Industry":"Electronics","Id":"001B0000009D7iyIAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7izIAC"},"Name":"Burlington Textiles Corp of America","AccountNumber":"CD656092","AnnualRevenue":350000000,"Industry":"Apparel","Id":"001B0000009D7izIAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j0IAC"},"Name":"Pyramid Construction Inc.","AccountNumber":"CC213425","AnnualRevenue":950000000,"Industry":"Construction","Id":"001B0000009D7j0IAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j1IAC"},"Name":"Dickenson plc","AccountNumber":"CC634267","AnnualRevenue":50000000,"Industry":"Consulting","Id":"001B0000009D7j1IAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j2IAC"},"Name":"Grand Hotels &amp; Resorts Ltd","AccountNumber":"CD439877","AnnualRevenue":500000000,"Industry":"Hospitality","Id":"001B0000009D7j2IAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j4IAC"},"Name":"Express Logistics and Transport","AccountNumber":"CC947211","AnnualRevenue":950000000,"Industry":"Transportation","Id":"001B0000009D7j4IAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j5IAC"},"Name":"University of Arizona","AccountNumber":"CD736025","Industry":"Education","Id":"001B0000009D7j5IAC"},
      //           {"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j3IAC"},"Name":"United Oil &amp; Gas Corp.","AccountNumber":"CD355118","AnnualRevenue":5600000000,"Industry":"Energy","Id":"001B0000009D7j3IAC"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j9IAC"},"Name":"sForce","Id":"001B0000009D7j9IAC"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009D7j7IAC"},"Name":"United Oil &amp; Gas, Singapore","AccountNumber":"CD355120-B","Industry":"Energy","Id":"001B0000009D7j7IAC"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B000000B1uVFIAZ"},"Name":"Community Account","Id":"001B000000B1uVFIAZ"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009tkcaIAA"},"Name":"salesforce","Id":"001B0000009tkcaIAA"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B0000009x9s6IAA"},"Name":"Marriott Marquis","Id":"001B0000009x9s6IAA"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B000000Aex2pIAB"},"Name":"Klean","Id":"001B000000Aex2pIAB"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B000000J3PYNIA3"},"Name":"ParkerHarris, Inc.","Id":"001B000000J3PYNIA3"},{"attributes":{"type":"Account","url":"/services/data/v41.0/sobjects/Account/001B000000RIjDpIAL"},"Name":"shuk","Id":"001B000000RIjDpIAL"}]
     accounts: null
    };

    this.handleAccountQueryResponse = this.handleAccountQueryResponse.bind(this);
    this.getAllAccounts = this.getAllAccounts.bind(this);
    this.renderAccount = this.renderAccount.bind(this);
    this.getAllAccounts();
  }

  getAllAccounts() {
    /* ftplatform.QuickStartAppController */
    LCC.callApex("ftplatform.QuickStartAppController.getAllAccounts",
                 this.state.itemsToQuery, this.handleAccountQueryResponse,
                 {escape: true});
  }

  handleAccountQueryResponse(result, event) {
    if (event.status) {
      // The apex returns a json object but all quotes are returned as &quot;
      let parse = result.replace(new RegExp("(&quot;)", 'g'), '"');
      console.warn("Parsed result:" + parse);
      let json_result = JSON.parse(parse);
      this.setState({accounts: json_result});
    }
    else if (event.type === "exception") {
      console.warn(event.message + " : " + event.where);
    }
  }

  renderAccount(account) {
    let account_row = this.state.itemsToQuery
      .split(',')
      .filter((entry) => entry != 'Id')
      .map((acct_key) => <AccountEntry accountType={acct_key} accountId={account['Id']} accountValue={account[acct_key] || ''}/>)

      return (
      <tr className="slds-hint-parent">      
        {account_row}
      </tr>
    );
  }

  render() {
    if (!this.state.accounts) {
      return (
        <div></div>
      );
    }
    return (
      <div className="slds-card__body">
        LCC allows you to access context information through the use of apex remote actions.
        Below is a sample of that information: <br/><br/>

        <table className="slds-table slds-table_fixed-layout slds-table_bordered slds-no-row-hover slds-table_cell-buffer">
          <thead>
            <tr className="slds-text-title_caps">
            {
              this.state.itemsToQuery.split(',')
                .filter((entry) => entry != 'Id')
                .map((fieldName) =>
                  <th scope="col">
                    <div className="slds-truncate" title={fieldName}>{fieldName}</div>
                  </th>
                )
            }
            </tr>
          </thead>
          <tbody>
              {this.state.accounts.map((account) => this.renderAccount(account))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllAccountEntries;