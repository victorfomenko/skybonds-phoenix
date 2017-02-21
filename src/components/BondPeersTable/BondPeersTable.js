import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import { isPortfolioScb } from '../../helpers/portfolio';
import { connect } from 'react-redux';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import style from './style.sass';

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
      'peersBonds': [],
      'checkedIsins': this.props.checkedIsins
    };
  }

  _initValues() {
    //parentBond = bondsProvider.peekBond @parentIsin
    this.parentBond = null
    this.peersBonds = [];
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
    this._preformPeersBonds()
  }

  _preformPeersBonds() {
    let limitedPeersIsins = this.props.peersIsins.slice(0, this.peersPerPage + this.peersPerPage * this._peersPage)
    let promises = [
      Data.getBondsInfo([this.props.parentIsin]),
      Data.getBondsDaily([this.props.parentIsin], this.props.date),
      Data.getBondsInfo(limitedPeersIsins),
      Data.getBondsDaily(limitedPeersIsins, this.props.date)
    ];
    if(isPortfolioScb(this.props.user)) {
      //promises.push(bondsPortfolioProvider.preformDailyQuantityData @peersBonds, @portfolioId, @date.getValue()
      //promises.push bondsPortfolioProvider.preformDailyData @peersBonds, @portfolioId, @date.getValue()
    }

     Promise.all(promises).then((response)=> {
       this.parentBond = {
         isin: this.props.parentIsin,
         info: response[0][0].data,
         daily: response[1][0].data
       };

       this.peersBonds = [];
       let peersBonds = [];
       for (let i = 0, len1 = response[2].length; i < len1; i++) {
           let itemInfo =  response[2][i];
           peersBonds.push({
             isin: itemInfo.isin,
             info: itemInfo.data
           });

         for (let j = 0, len2 = response[3].length; j < len2; j++) {
           let itemDaily = response[3][i];
           if (itemDaily.isin == itemInfo.isin) {
             peersBonds[i]['daily'] = itemDaily.data;
           }
         }
       }

       this.setState({
        'peersBonds': peersBonds
       });

       this.bondCurrency = this.parentBond.info.ccy;
       this._sortSettings = {
         column: Defaults.Sort.Column,
         asc: Defaults.Sort.Asc
       };

       this._sortBonds();
     })

  }

  _sortBonds() {
    if (this._sortSettings.column) {
      return this.peersBonds.sortBy((function(_this) {
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

  isBenchmarkChecked () {
    return this.showBenchmark
  }

  togglePeer (bond) {
    let checkedIsins = this.state.checkedIsins;
    let pos = checkedIsins.indexOf(bond.isin);
    if (pos == -1) {
      checkedIsins.push(bond.isin)
    } else {
      checkedIsins.splice(pos, 1)
    }
    this.setState({
      'checkedIsins': checkedIsins
    });
  }

  toggleBenchmark () {
    if (this.showBenchmark) {
      this.showBenchmark = false;
    } else {
      this.showBenchmark = true;
    }
  }

  isPeerChecked (bond) {
    let pos = this.state.checkedIsins.indexOf(bond.isin);
    return pos != - 1;
  }

  showNextPage () {
    this._peersPage++ ;
    this._preformPeersBonds()
  }

  render(){
    let parentBond = this.parentBond;
    let peersBonds = this.state.peersBonds;

    if(parentBond != null) {

      var peersList = peersBonds.map((bond, index) => {
        return (
          <tr key={index} className={style.bondPeersTable_row} onClick={this.togglePeer.bind(this, bond)}>
            <td className={style.bondPeersTable_cell + ' ' + style.__check}>
              { (this.isPeerChecked(bond)) ?
                <input type="checkbox" className={style.bondPeersTable_check} checked/>
                :
                <input type="checkbox" className={style.bondPeersTable_check}/>
              }
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
                    <span>{this.bondCurrency}</span>
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
              <tr className={style.bondPeersTable_row + ' ' + (this.isBenchmarkChecked() ?  style.__checked : '')} onClick={this.toggleBenchmark()}>
                <td className={style.bondPeersTable_cell + ' ' + style.__check}>
                  { (this.isBenchmarkChecked()) ?
                    <input type="checkbox" className={style.bondPeersTable_check} checked/>
                    :
                    <input type="checkbox" className={style.bondPeersTable_check}/>
                  }
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
                this.peersTotal - this.peersBonds.length
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
  bond: React.PropTypes.object.isRequired,
  date: React.PropTypes.object.isRequired,
  parentIsin: React.PropTypes.string.isRequired,
  peersIsins: React.PropTypes.array.isRequired,
  checkedIsins: React.PropTypes.array.isRequired,
  filters: React.PropTypes.array.isRequired
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(BondPeersTable);
