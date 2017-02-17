import React, { Component } from 'react';

class BondBidAskTable extends Component {
  constructor(props) {
    super(props);
    console.log('BondBidAskTable')
  }

  render() {
    return (
      <div>Bond Bid Ask Table</div>
    )
  }
}

BondBidAskTable.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondBidAskTable;
