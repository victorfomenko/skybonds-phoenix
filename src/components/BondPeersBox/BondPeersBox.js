import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import BondPeersTable from '../BondPeersTable/BondPeersTable';
import BondPeersTimeSeries from '../BondPeersTimeSeries';
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
    });
  }


  render(){
    if(this.state.peersIsins.length > 0){
      return (
        <div className={style.bondPeersBox} id="peers">
          <div className={style.bondPeersBox_title}>Peers</div>
          <BondPeersTimeSeries bond={this.props.bond} />
          <BondPeersTable
            bond={this.props.bond}
            date={this.props.date}
            parentIsin={this.parentIsin}
            peersIsins={this.state.peersIsins}
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
