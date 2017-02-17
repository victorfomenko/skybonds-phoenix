import React, { Component } from 'react';
import style from './style.sass';

class BondHeader extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    return (
      <div className={style.bondHeader}>
        <div className={style.bondHeaderWatchlist}>
          <div className={style.bondHeaderWatchlist_isin}>
            {this.props.bond.isin}
          </div>
        </div>
        <ul className={style.bondHeaderAnchors}>
          <li className={style.bondHeaderAnchors_item}>
            <a href="#general" className={style.bondHeaderAnchors_link}>General</a>
            </li>
            <li className={style.bondHeaderAnchors_item}>
            <a href="#peers" className={style.bondHeaderAnchors_link}>Peers</a>
            </li>
            <li className={style.bondHeaderAnchors_item}>
            <a href="#bidask" className={style.bondHeaderAnchors_link}>Bid & Ask</a>
            </li>
            <li className={style.bondHeaderAnchors_item}>
            <a href="#payments" className={style.bondHeaderAnchors_link}>Рayments schedule</a>
          </li>
        </ul>

        <div className={style.bondHeaderName}>
          {this.props.bond.info.standardName}
        </div>

        <ul className={style.bondHeaderInfo}>
          <li className={style.bondHeaderInfo_item}>
            <a href="/issuer/{{ bondStatic.issuerId }}" className="common-link">
              {this.props.bond.info.issuer}
            </a>
          </li>
          <li className={style.bondHeaderInfo_item}>
            {this.props.bond.info.sector}
          </li>
          <li className={style.bondHeaderInfo_item}>
            {this.props.bond.info.rating}
          </li>
          <li className={style.bondHeaderInfo_item}>
            <span className={style.bondHeaderInfo_label}>Yield</span>
          </li>
            <span className={style.bondHeaderInfo_value}>
              {this.props.bond.daily.yield}
            </span>
          <li className={style.bondHeaderInfo_item}>
            <span className={style.bondHeaderInfo_label}>Price</span>
            <span className={style.bondHeaderInfo_value}>
              {this.props.bond.daily.price}
            </span>
            <span> </span>
            <span className={style.bondHeaderInfo_value + '__shaded'}>
              <span>+ </span>
              <span className={style.bondHeaderInfo_value}>
                {this.props.bond.daily.accruedCoupon}
              </span>
              <span> = </span>
              <span className={style.bondHeaderInfo_value}>
                {this.props.bond.daily.price + this.props.bond.daily.accruedCoupon}
              </span>
            </span>
          </li>
          <li className={style.bondHeaderInfo_item}>
            <span className={style.bondHeaderInfo_label}>Duration</span>
              <span className={style.bondHeaderInfo_value}>
                {this.props.bond.daily.duration}
              </span>
          </li>
          <li className={style.bondHeaderInfo_item}>
            <span className={style.bondHeaderInfo_label}>Maturity date</span>
            <span className={style.bondHeaderInfo_value}>
              {this.props.bond.daily.maturityDate}
            </span>
          </li>
          <li className={style.bondHeaderInfo_item}>
            <span className={style.bondHeaderInfo_label}>Coupon</span>
            <span className={style.bondHeaderInfo_value}>
              {this.props.bond.daily.coupon}
            </span>
          </li>
        </ul>
        <span className={style.bondHeaderInfo_line}></span>
      </div>
    );
  }
}

BondHeader.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondHeader;
