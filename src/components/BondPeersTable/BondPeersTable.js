import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import style from './style.sass';

import {
  getPeersData,
  toggleBenchmark,
  togglePeer
} from '../../actions';

const Defaults = {
  Sort: {
    Column: '',
    Asc: false
  },
  PeersPerPage: 10
};

class BondPeersTable extends Component {
  constructor(props) {
    super(props);
    this._initValues()
    this.state = {
      'benchmarkChecked': true
    };
  }

  _initValues() {
    //parentBond = bondsProvider.peekBond @parentIsin
    this.parentBond = null
    this._peersPage = 0;
    this.peersPerPage = Defaults.PeersPerPage;
    this.peersTotal = this.props.peersIsins.length;
    this.isInitialLoad = true;
    this._sortSettings = {
      column: Defaults.Sort.Column,
      asc: Defaults.Sort.Asc
    }

  }

  componentWillMount() {
    this.getPeersBonds();
  }

  componentWillReceiveProps(nextProps) {

  }

  getPeersBonds() {
    let limitedPeersIsins = this.props.peersIsins.slice(0, this.peersPerPage + this.peersPerPage * this._peersPage);
    this.props.getPeersData(limitedPeersIsins, this.props.date);
  }

  _sortBonds(bonds) {
    //TODO: need to implement sorting on table header click
    if (this._sortSettings.column) {
      return bonds.sortBy((function(_this) {
        return function(bond) {
          return _this._getBondValue(bond, _this._sortSettings.column);
        };
      })(this), this._sortSettings.asc);
    }
  }

  _getBondValue(bond, valueName) {
    var ref, ref1, ref2, ref3;
    switch (valueName) {
      case 'name':
      case 'sector':
      case 'rating':
      case 'ratingGroup':
      case 'country':
        return bond["info"][valueName];
      case 'yield':
      case 'price':
      case 'duration':
      case 'coupon':
      case 'haircut':
        return (ref = bond.daily) != null ? ref[valueName] : void 0;
      case 'tr':
      case 'roe':
        return (ref1 = bond.portfolio[this.portfolioId]) != null ? (ref2 = ref1[this.props.date]) != null ? (ref3 = ref2.daily) != null ? ref3[valueName] : void 0 : void 0 : void 0;
      default:
        return null;
    }
  }

  getMutedClass (value) {
    let result = '';
    if (this.props.filters.indexOf(value) != -1) {
      result = '__muted';
    }
    return result
  }

  togglePeer = bond => {
    this.props.togglePeer(bond.isin);
  }

  toggleBenchmark () {
    this.props.toggleBenchmark();
    this.setState({ benchmarkChecked: !this.state.benchmarkChecked });
  }

  isPeerChecked (bond) {
    let pos = this.props.checkedPeersIsins.indexOf(bond.isin);
    return pos != - 1;
  }

  showNextPage () {
    this._peersPage++ ;
    this.getPeersBonds()
  }

  render(){
    let parentBond = this.props.parentBond;
    let peersBonds = this.props.peersBonds;
    if(parentBond != null) {

      var peersList = peersBonds.map((bond, index) => {
        return (
          <tr key={index} className={style.bondPeersTable_row} onClick={this.togglePeer.bind(this, bond, index)}>
            <td className={style.bondPeersTable_cell + ' ' + style.__check}>
              <input type="checkbox"
                className={style.bondPeersTable_check}
                checked={(this.props.selectedPeersIsins.indexOf(bond.isin) !== -1)}
                onChange={this.togglePeer.bind(this, bond)}
                />
            </td>
            <td className={style.bondPeersTable_cell + ' ' + style.__text}>
              <span className={style.bondPeersTable_text}>
                <a href={'/bond/' + bond.isin } target="_blank" className="common-link" title={ bond.info.standardName }>{bond.info.standardName}</a>
              </span>
            </td>
            <td className={style.bondPeersTable_cell + ' ' + style.__icon}></td>
            <td className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + this.getMutedClass('country')}>{bond.info.country}</td>
            <td className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + style.__rating  + ' ' + this.getMutedClass('ratingGroup')}>{bond.info.rating}</td>
            <td className={style.bondPeersTable_cell + ' ' + style.__number}>{NumberFormatter(bond.daily.coupon, {
              minFraction: 2,
              maxFraction: 2
            })}</td>
            <td className={style.bondPeersTable_cell + ' ' + style.__number}>{NumberFormatter(bond.daily.price, {
              minFraction: 2,
              maxFraction: 2
            })}</td>
            <td className={style.bondPeersTable_cell + ' ' + style.__number}>{NumberFormatter(bond.daily.yield, {
              minFraction: 2,
              maxFraction: 2
            })}</td>
            <td className={style.bondPeersTable_cell + ' ' + style.__number}>{NumberFormatter(bond.daily.delta, {
              minFraction: 2,
              maxFraction: 2
            })}</td>
            <td
              className={style.bondPeersTable_cell + ' ' + style.__number + ' ' + this.getMutedClass('durationRange')}>{NumberFormatter(bond.daily.duration, {
              minFraction: 2,
              maxFraction: 2
            })}</td>
            <td
              className={style.bondPeersTable_cell + ' ' + style.__number}>{( bond.portfolio != null && bond.portfolio.quantity) ? bond.portfolio.daily.tr : null}</td>
            <td className={style.bondPeersTable_cell + ' ' + style.__number}>{bond.daily.haircut}</td>
            <td
              className={style.bondPeersTable_cell + ' ' + style.__number}>{( bond.portfolio != null && bond.portfolio.quantity) ? bond.portfolio.daily.roe : null}</td>
            <td
              className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + this.getMutedClass('industrySimilar')}>{bond.info.sector}</td>
          </tr>
        );
      })

      return (
        <div className={style.bondPeersTableGeneral}>
          <table className={style.bondPeersTable}>
            <thead className={style.bondPeersTable_thead}>
              <tr className={style.bondPeersTable_row}>
                <th className={style.bondPeersTable_cell + ' ' + style.__check}></th>
                <th
                  className={style.bondPeersTable_cell + ' ' +  style.__sortable + ' ' + style.__text + ' ' + style.__name}>
                  Bonds
                  <span className={style.bondPeersTable_unit}>
                    <span>in </span>
                    <span>{parentBond.info.ccy}</span>
                  </span>
                </th>
                <th className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + style.__liquidity}></th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__country + ' ' + this.getMutedClass('country')}>
                  Country
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__rating  + ' ' + this.getMutedClass('ratingGroup')}>
                  Rating
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__coupon + ' ' + this.getMutedClass('coupon')}>
                  Coupon
                  <span className={style.bondPeersTable_unit}>%</span>
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__price }>
                  Price
                  <span className={style.bondPeersTable_unit}>%</span>
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__yield}>
                  Yield
                  <span className={style.bondPeersTable_unit}>%</span>
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__delta}>
                  Δ to
                  <div>benchmark</div>
                  <span className={style.bondPeersTable_unit}>%</span>
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__duration + ' ' + this.getMutedClass('durationRange')}>
                  Duration
                  <span className={style.bondPeersTable_unit}>yrs</span>
                </th>
                <th className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__tr}>
                  Total
                  <div>Return</div>
                  <span className={style.bondPeersTable_unit}>%</span>
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__discount}>
                  Discount
                  <span className={style.bondPeersTable_unit}>%</span>
                </th>
                <th className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__roe}>
                  ROE
                  <span className={style.bondPeersTable_unit}>%</span>
                </th>
                <th
                  className={style.bondPeersTable_cell + ' ' + style.__sortable + ' ' + style.__text + ' ' + style.__industry + ' ' + this.getMutedClass('industrySimilar')}>
                  Industry
                </th>
              </tr>
              <tr className={style.bondPeersTable_row + ' ' + style.__parent}>
                <td className={style.bondPeersTable_cell + ' ' + style.__check}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__text}>
                  <span className={style.bondPeersTable_text}>{parentBond.info.standardName}</span>
                </td>
                <th className={style.bondPeersTable_cell + ' ' + style.__icon}></th>
                <td
                  className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + this.getMutedClass('country')}>{parentBond.info.country}</td>
                <td
                  className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + this.getMutedClass('ratingGroup')}>{parentBond.info.rating}</td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}>{NumberFormatter(parentBond.daily.coupon, {
                  minFraction: 2,
                  maxFraction: 2
                })}</td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}>{NumberFormatter(parentBond.daily.price, {
                  minFraction: 2,
                  maxFraction: 2
                })}</td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}>{NumberFormatter(parentBond.daily.yield, {
                  minFraction: 2,
                  maxFraction: 2
                })}</td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}>{parentBond.daily.delta}</td>
                <td
                  className={style.bondPeersTable_cell + ' ' + style.__number + ' ' + this.getMutedClass('durationRange')}>{NumberFormatter(parentBond.daily.duration, {
                  minFraction: 2,
                  maxFraction: 2
                })}</td>
                <td
                  className={style.bondPeersTable_cell + ' ' + style.__number}>{( parentBond.portfolio != null && parentBond.portfolio.quantity) ? parentBond.portfolio.daily.tr : null}</td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}>{parentBond.daily.haircut}</td>
                <td
                  className={style.bondPeersTable_cell + ' ' + style.__number}>{( parentBond.portfolio != null && parentBond.portfolio.quantity) ? parentBond.portfolio.daily.roe : null}</td>
                <td
                  className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + this.getMutedClass('industrySimilar')}>{parentBond.info.sector}</td>
              </tr>
            </thead>
            <tbody className={style.bondPeersTable_tbody}>
              <tr className={style.bondPeersTable_row + ' ' + (this.state.benchmarkChecked ?  style.__checked : '')} onClick={this.toggleBenchmark.bind(this)}>
                <td className={style.bondPeersTable_cell + ' ' + style.__check}>
                  <input type="checkbox"
                    className={style.bondPeersTable_check}
                    checked = {this.state.benchmarkChecked}
                    onChange = {this.toggleBenchmark.bind(this)}
                  />
                </td>
                <td className={style.bondPeersTable_cell + ' ' + style.__text}>
                  <span className={style.bondPeersTable_text}>Benchmark from filtered peers</span>
                </td>
                <td className={style.bondPeersTable_cell + ' ' + style.__icon}>
                </td>
                <td className={style.bondPeersTable_cell + ' ' + style.__text  + ' ' + this.getMutedClass('country')} ></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__text + ' ' + this.getMutedClass('ratingGroup')}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number }></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number + ' ' + this.getMutedClass('durationRange')}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__number}></td>
                <td className={style.bondPeersTable_cell + ' ' + style.__text}></td>
              </tr>

              {peersList}
            </tbody>
          </table>
          { peersBonds.length < this.peersTotal ?
          <a className={style.bondPeersTableMore} onClick={this.showNextPage.bind(this)}>
            <span>Show next </span>
            <span>
              { (this.peersTotal - peersBonds.length > this.peersPerPage) ?
                this.peersPerPage
              :
                this.peersTotal - this.props.peersBonds.length
              }
            </span>
            <span> peers</span>
          </a>
            : ''}
        </div>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}

BondPeersTable.propTypes = {
  parentBond: React.PropTypes.object.isRequired,
  date: React.PropTypes.object.isRequired,
  parentIsin: React.PropTypes.string.isRequired,
  peersIsins: React.PropTypes.array.isRequired,
  selectedPeersIsins: React.PropTypes.array.isRequired,
  peersBonds: React.PropTypes.array.isRequired,
  filters: React.PropTypes.array.isRequired
};

const mapStateToProps = state => ({  });
export default connect(mapStateToProps, {
  getPeersData, toggleBenchmark, togglePeer
})(BondPeersTable);
