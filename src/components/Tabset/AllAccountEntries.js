import React, { Component } from 'react';
import * as LCC from 'lightning-container';
import AccountEntry from './AccountEntry';

class AllAccountEntries extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      itemsToQuery: this.props.queryReq || 'Id',
      accounts: null
    };

    this.handleAccountQueryResponse = this.handleAccountQueryResponse.bind(this);
    this.getAllAccounts = this.getAllAccounts.bind(this);
    this.renderAccount = this.renderAccount.bind(this);
    this.getAllAccounts();
  }

  getAllAccounts() {
    LCC.callApex("QuickStartAppController.getAllAccounts",
                 this.state.itemsToQuery, this.handleAccountQueryResponse,
                 {escape: true});
  }

  handleAccountQueryResponse(result, event) {
    if (event.status) {
      // The apex returns a json object but all quotes are returned as &quot;
      let parse = result.replace(new RegExp("(&quot;)", 'g'), '"');
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