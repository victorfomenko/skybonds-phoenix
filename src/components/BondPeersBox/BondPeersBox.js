import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import BondPeersTable from '../BondPeersTable/BondPeersTable';
import BondPeersTimeSeries from '../BondPeersTimeSeries';
import BondPeersScatterPlot from '../BondPeersScatterPlot';
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
    this.parentIsin = this.props.bond.parentBond.isin;
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
        <div className={style.bondPeersBox}>
          <div className={style.bondPeersBox_title}>Peers</div>
          <div className={style.bondPeersDiagrams}>
            <div className={style.bondPeersDiagrams_timeseries}>
              <BondPeersTimeSeries
                parentBond={this.props.bond.parentBond}
                selectedPeersIsins={this.props.bond.selectedPeersIsins}
                peersBonds={this.props.bond.peersBonds}
                showBenchmark={this.props.bond.showBenchmark}
              />
            </div>
            <div className={style.bondPeersDiagrams_scatterplot}>
              <span className={style.bondPeersDiagrams_label +' '+ style.__y}>Yield</span>
              <span className={style.bondPeersDiagrams_label +' '+ style.__x}>Duration</span>
              <div className={style.bondPeersDiagrams_now}>Now
              </div>
              <div className={style.bondPeersScatterPlot}>
                <BondPeersScatterPlot bond={this.props.bond} />
              </div>
            </div>
          </div>
          <BondPeersTable
            parentBond={this.props.bond.parentBond}
            date={this.props.date}
            parentIsin={this.parentIsin}
            peersIsins={this.state.peersIsins}
            selectedPeersIsins = {this.props.bond.selectedPeersIsins}
            peersBonds={this.props.bond.peersBonds}
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
  date: React.PropTypes.object.isRequired,
};

export default BondPeersBox;
