import React, { Component } from 'react';
import { getColor } from '../../helpers/BondRating';
import DateFormatter from '../../helpers/formatters/DateFormatter';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getLabel } from '../../helpers/BondOutlook';
import style from './bondInfoHeader.sass';

class BondInfoHeader extends Component {
  constructor(props) {
    super(props);
  }

  toggleExclude() {}

  isExcludedIssuer() {}

  toggleExcludeIssuer() {}

  addSetOfSimilarBonds() {}

  render(){
    const bond = this.props.bond;
    if(bond != null && bond.isin != null ) {
      return (
        <div className={style.reportAsideBondHeader}>
          <ul className={style.reportAsideBondHeader_rows}>
            <li className={style.reportAsideBondHeader_line}>
              <a href={'/bond/' + bond.isin } target="_blank"
                 className={style.reportAsideBond_link + ' ' + style.reportAsideBondHeader_title}>{bond.info.standardName}</a>
              {/*<input type="checkbox" className={style.reportAsideBondHeader_excluded + ' ' + style.__bond}
               onClick={this.toggleExclude()}/>
               */}
            </li>
            <li className={style.reportAsideBondHeader_line}>
              <ul className={style.reportAsideBondHeader_list}>
                <li className={style.reportAsideBondHeader_item}>
                  <span>Maturity date </span>
                  <span>{DateFormatter(DateDayCaster.cast(bond.info.maturityDate))}</span>
                </li>
                { (bond.daily != null && bond.daily.coupon != null) &&
                  <li className={style.reportAsideBondHeader_item}>
                    <span>Coupon </span>
                    <span>{bond.daily.coupon}</span>
                  </li>
                }
                { bond.putDate &&
                  <li className={style.reportAsideBondHeader_item}>
                    <span>({DateFormatter(bond.putDate)})</span>
                  </li>
                }
                <li className={style.reportAsideBondHeader_line}>
                  <ul className={style.reportAsideBondHeader_list}>
                    <li className={style.reportAsideBondHeader_item + ' ' + style.reportAsideBondHeader_item__issuer}>
                      {/* !this.isExcludedIssuer() ?
                       <input type="checkbox" className={style.reportAsideBondHeader_excluded + ' ' + style.__issuer}
                       onClick={this.toggleExcludeIssuer()} checked/>
                       :
                       <input type="checkbox" className={style.reportAsideBondHeader_excluded + ' ' + style.__issuer}
                       onClick={this.toggleExcludeIssuer()}/>
                       */}
                      <a href={'/issuer/' + bond.info.issuerId }
                         className={style.reportAsideBond_link}>{bond.info.issuer}</a>
                    </li>
                    <li className={style.reportAsideBondHeader_item}>
                      <a href="" className={style.reportAsideBond_link} onClick={this.addSetOfSimilarBonds()}></a>
                      <span>{bond.info.sector}, </span>
                      <span style={{color: getColor(bond.info.ratingGroup)}}>{bond.info.ratingGroup}</span>
                    </li>
                    <li className={style.reportAsideBondHeader_item + ' ' + style.reportAsideBondHeader_outlook}>
                      <span>{ getLabel(bond.info.outlook) }</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className={style.reportAsideBondHeader_line}>
              <ul className={style.reportAsideBondHeader_list}>
                <li className={style.reportAsideBondHeader_item}>{bond.isin}</li>
              </ul>
            </li>
          </ul>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
}

BondInfoHeader.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondInfoHeader;
