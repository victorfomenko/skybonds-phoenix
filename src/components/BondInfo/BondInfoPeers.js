import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import { getPeersData } from '../../actions';
import { connect } from 'react-redux';
import styles from './bondInfoPeers.sass';

class BondInfoPeers extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._getPeers();
  }

  async _getPeers(bond = null) {
    let peersLimit = 3;
    const peersData = await Data.getPeers(this.props.bond.isin, this.props.bond.date);
    console.log('peersData', peersData);
    let isins = peersData.peers.slice(0,peersLimit);
    this.props.getPeersData(isins, this.props.bond.date);
    console.log('peersData', peersData.peers.slice(0,peersLimit))
  }


  render() {

    let bond = this.props.bond;
    let peersBonds = this.props.peersBonds;
    console.log('bond', bond);
    console.log('peersBonds', peersBonds);
    return (
      <table className={styles.reportAsideBondCalculator_table}>

      </table>
    );
  }

};

BondInfoPeers.propTypes = {
  bond: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({ });
export default connect(mapStateToProps, {getPeersData})(BondInfoPeers);
