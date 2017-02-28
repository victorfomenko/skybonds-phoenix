import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import { connect } from 'react-redux';
import { isPortfolioScb } from '../../helpers/portfolio';
import * as PortfolioData from '../../data/providers/Portfolio';
import LoadingCover from '../LoadingCover';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import DateFormatter from '../../helpers/formatters/DateFormatter';
import DateDayCaster from '../../data/casters/DateDayCaster';
import styles from './bondInfoContent.sass';

class BondInfoContent extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.state = {
      bondDailyPortfolio: null
    };
    this._refreshTable();
  }

  async _refreshTable() {
    let isin = this.props.bond.isin;

    // TODO Check the correct calculating Issuer Limit
    if(isPortfolioScb(this.props.user)) {
      const bondDailyPortfolioResp = await PortfolioData.getDailyData([ isin ], this.props.bond.date );

      let bondDailyPortfolioData = bondDailyPortfolioResp[0].data;
      let issuerTotalLimits = bondDailyPortfolioData.limits;
      let issuerTotalLimit = null;
      let issuerUsedLimit = null;
      if ( issuerTotalLimits != null) {
        issuerTotalLimit = issuerTotalLimits.limitLcy;
        issuerUsedLimit = issuerTotalLimits.usedLimitLcy
      }

      let issuerLimitRatio = issuerUsedLimit / issuerTotalLimit;
      let issuerLimitArc = d3.svg.arc().innerRadius(0).outerRadius(6).startAngle(0);

      this.setState({
        bondDailyPortfolio: {
          issuerUsedLimit: this._formatMillions(issuerUsedLimit),
          issuerTotalLimit: this._formatMillions(issuerTotalLimit),
          issuerLimitArc: issuerLimitArc({
            endAngle: issuerLimitRatio * Math.PI * 2
          }),
          issuerLimitClass: (function() {
            switch (false) {
              case !((0 < issuerLimitRatio && issuerLimitRatio < 0.2)):
                return '0-20';
              case !((0.2 < issuerLimitRatio && issuerLimitRatio < 0.4)):
                return '20-40';
              case !((0.4 < issuerLimitRatio && issuerLimitRatio < 0.6)):
                return '40-60';
              case !((0.6 < issuerLimitRatio && issuerLimitRatio < 0.8)):
                return '60-80';
              default:
                return '80-100';
            }
          })()
        }
      })
    }
  }

  _formatMillions(value) {
    return NumberFormatter(Math.round(value / 1000), { minFraction: 2, maxFraction: 2} )

  }

  render() {
    let bond = this.props.bond;
    let bondPortfolio = this.state.bondDailyPortfolio;

    return (
        <div className={styles.reportAsideBondContent_section}>
          <table className={styles.reportAsideBondContent_table}>
            <tbody>
            <tr className={styles.reportAsideBondContent_row}>
              <td className={styles.reportAsideBondContent_cell} colSpan={3}>{ bond.info.isAmortizing ? 'Amortizing' : 'Non-Amortizing'}</td>
            </tr>
            <tr className={styles.reportAsideBondContent_row}>
              <td className={styles.reportAsideBondContent_cell}>Discount</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.haircut, { minFraction: 2, maxFraction: 2, isPercent: true} )}</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__unit}>%</td>
            </tr>
            <tr className={styles.reportAsideBondContent_row}>
              <td className={styles.reportAsideBondContent_cell}>Turnover</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__number}>{ (bond.daily.turnover && bond.daily.turnover != 0) ? this._formatMillions(bond.daily.turnoverLcy) : null }</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__unit}>
                { (bond.daily.turnover && bond.daily.turnover != 0) &&
                  <span>RUB eq, M</span>
                }
              </td>
            </tr>
            <tr className={styles.reportAsideBondContent_row}>
              <td className={styles.reportAsideBondContent_cell}>Principal</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__number}>{bond.daily.principal}</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__unit}>{bond.info.ccy}</td>
            </tr>
            <tr className={styles.reportAsideBondContent_row}>
              <td className={styles.reportAsideBondContent_cell}>Total outstanding</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__number}>{NumberFormatter(bond.info.amountOutstandingLC, { minFraction: 2, maxFraction: 2} )}</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__unit}>
                <span>M </span>
                <span>{bond.info.ccy}</span>
              </td>
            </tr>
            <tr className={styles.reportAsideBondContent_row}>
              <td className={styles.reportAsideBondContent_cell}>Issue date</td>
              <td className={styles.reportAsideBondContent_cell + ' ' + styles.__number}>{DateFormatter(DateDayCaster.cast(bond.info.issueDate))}</td>
              <td className={styles.reportAsideBondContent_cell}></td>
            </tr>
            { /*bondPortfolio != null*/ false &&
              <tr className={styles.reportAsideBondContent_row}>
                <td className={styles.reportAsideBondContent_cell}>Issuer limit</td>
                <td className={styles.reportAsideBondContent_cell + ' ' + styles.__number}>
                  { bondPortfolio.issuerTotalLimit != null &&
                  <div>
                    <svg className={styles.reportAsideBondPortfolio_limit + ' ' + '__' + bondPortfolio.issuerLimitClass }
                         width="14"
                         height="14">
                      <g transform="translate(7,7)">
                        <path d="M0,6A6,6 0 1,1 0,-6A6,6 0 1,1 0,6Z" fill="none"></path>
                        <path d={ bondPortfolio.issuerLimitArc }></path>
                      </g>
                    </svg>
                    <span>{bondPortfolio.issuerTotalLimit}</span>
                  </div>
                  }

                </td>
                <td className={styles.reportAsideBondContent_cell + ' ' + styles.__unit}>
                  { bondPortfolio.issuerTotalLimit != null &&
                    <span>RUB eq, M</span>
                  }
                </td>
              </tr>
            }
            </tbody>
          </table>
          { bond.info.floatingRateFormula != null &&
          <ul className={styles.reportAsideBondContent_list}>
            <li className={styles.reportAsideBondContent_item}>
              <span>Floating Rate Formula: </span>
              <span>{bond.info.floatingRateFormula}</span>
            </li>
          </ul>
          }
        </div>
    )
  }

};

BondInfoContent.propTypes = {
  bond: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(BondInfoContent);
