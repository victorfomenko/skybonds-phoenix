import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import { getPeersData } from '../../actions';
import { connect } from 'react-redux';
import LoadingCover from '../LoadingCover';
import { getColor } from '../../helpers/BondRating';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
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
    let isins = peersData.peers.slice(0,peersLimit);
    this.props.getPeersData(isins, this.props.bond.date);
  }


  render() {
    let parentBond = this.props.bond;
    let peersBonds = this.props.bond.peersBonds;

    if (peersBonds != null) {

      let peersBondsList = peersBonds.map((bond, index) => {
        return (
          <tr key={index} className={styles.reportAsideBondPeers_row}>
            <td className={styles.reportAsideBondPeers_cell + ' ' + styles.__text}>
              <a href={'/bond/' + bond.isin } className={styles.reportAsideBond_link} target='_blank'>{bond.info.standardName}</a>
            </td>
            <td className={styles.reportAsideBondPeers_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.yield, { isPercent: true, asNumber: true})}</td>
            <td className={styles.reportAsideBondPeers_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.price, { asNumber: true})}</td>
            <td className={styles.reportAsideBondPeers_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.duration, { asNumber: true})}</td>
            <td className={styles.reportAsideBondPeers_cell + ' ' + styles.__text}>{bond.info.country}</td>
            <td className={styles.reportAsideBondPeers_cell + ' ' + styles.__text}>{bond.info.sector}</td>
            <td className={styles.reportAsideBondPeers_cell + ' ' + styles.__text} style={{color: getColor(bond.info.ratingGroup)}}>{bond.info.ratingGroup}</td>
          </tr>
        )
      });

      return (
        <div className={styles.reportAsideBondPeers}>
          <div className={styles.reportAsideBondPeers}>
            <table className={styles.reportAsideBondPeers_table}>
              <thead className={styles.reportAsideBondPeers_thead}>
              <tr className={styles.reportAsideBondPeers_row}>
                <th className={styles.reportAsideBondPeers_cell + ' ' + styles.__text + ' ' + styles.__name}>Peers</th>
                <th className={styles.reportAsideBondPeers_cell + ' ' + styles.__number + ' ' + styles.__yield}>Yield
                  <span className={styles.reportAsideBondPeers_unit}> %</span>
                </th>
                <th className={styles.reportAsideBondPeers_cell + ' ' + styles.__number + ' ' + styles.__price}>Price
                  <span className={styles.reportAsideBondPeers_unit}> %</span>
                </th>
                <th className={styles.reportAsideBondPeers_cell + ' ' + styles.__number + ' ' + styles.__duration}>Duration</th>
                <th className={styles.reportAsideBondPeers_cell + ' ' + styles.__country}></th>
                <th className={styles.reportAsideBondPeers_cell + ' ' + styles.__industry}></th>
                <th className={styles.reportAsideBondPeers_cell + ' ' + styles.__rating}></th>
              </tr>
              </thead>
              <tbody className={styles.reportAsideBondPeers_tbody}>
              {peersBondsList}
              </tbody>
            </table>
            <div className={styles.reportAsideBondPeers_more}>
              <span>Show more peers </span>
              {/*<a href="" onClick={addSetOfPeers()} className="report-aside-bond_link report-aside-bond-peers_link">on a new set</a>
              <span> or</span>*/}
              <a href={'/bond/' + parentBond.isin } target='_blank' className={styles.reportAsideBond_link}> on bond page</a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.reportAsideBondPeers}>
          <LoadingCover isLoading={ true } />
        </div>
      )
    }
  }

};

BondInfoPeers.propTypes = {
  bond: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({ });
export default connect(mapStateToProps, {getPeersData})(BondInfoPeers);
