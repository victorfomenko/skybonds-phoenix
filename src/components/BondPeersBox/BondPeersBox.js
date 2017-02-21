import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import BondPeersTable from '../BondPeersTable/BondPeersTable';
import style from './style.sass';


class BondPeersBox extends Component {
  constructor(props) {
    super(props);
    this._initValues()
    this.state = {
      'peersIsins': [],
      'peersFilters': []
    };
  }

  _initValues() {
    this.parentIsin = this.props.bond.isin;
    this.peersIsins = [];
    this.checkedIsins = [];
    this.filters = [];
  }

  componentWillMount() {
    this._getPeers(this.props.bond);
  }

  async _getPeers(bond = null) {
    const peersData = await Data.getPeers(this.parentIsin, this.props.date);
    this.setState({
      'peersIsins': peersData.peers,
      'peersFilters': peersData.filters
    })
    this.checkedIsins = [];
  }


  render(){
    if(this.state.peersIsins.length > 0){
      return (
        <div className={style.bondPeersBox}>
          <div className={style.bondPeersBox_title}>Peers</div>
          <BondPeersTable
            bond={this.props.bond}
            date={this.props.date}
            parentIsin={this.parentIsin}
            peersIsins={this.state.peersIsins}
            checkedIsins={this.checkedIsins}
            filters={this.state.peersFilters}
          />
        </div>
    )} else {
      return(<div>Loading...</div>);
    }

  }
}

BondPeersBox.propTypes = {
  bond: React.PropTypes.object.isRequired,
  date: React.PropTypes.object.isRequired
};

export default BondPeersBox;
