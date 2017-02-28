import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addReport } from '../../actions';

import { Icon, GLYPHS } from '../../components/Icon';
import styles from './styles.sass'



class Header extends Component {
  constructor(props) {
    super(props);
    this.onClickMarket = this.onClickMarket.bind(this);
  }

  onClickMarket(e){
    if(this.isOnMarket()) {
      e.preventDefault();
      this.props.addReport();
    }

  }

  isOnMarket(){
    return this.props.location.pathname.indexOf('/reports/market') != -1
  }

  render() {
    return (
      <div className={styles.header}>
        <nav className={styles.headerNav}>
          <Link className={styles.headerNav_home} to={'/'}>Skybonds</Link>
          <ul className={styles.headerNav_list}>
            <li className={styles.headerNav_item}>
              <Link className={styles.headerNav_text} to={'/reports/market'} onClick={this.onClickMarket}>Market report</Link>
            </li>
          </ul>
          <ul className={styles.headerNav_list + ' ' + styles.__aux}>
            <li className={styles.headerNav_item + ' ' + styles.__user}>
              <span className={styles.headerNav_text}>
                {this.props.firstName + ' ' + this.props.lastName}
                <Icon className={styles.headerNav_icon}
                      glyph={GLYPHS.GEAR}
                      width="10" height="10" />
              </span>
              <div className={styles.headerNav_subwrap}>
                <ul className={styles.headerNav_sublist}>
                  <li className={styles.headerNav_subitem}>
                    <Link className={styles.headerNav_subtext} to={'/logout'}>Log out</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}


Header.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  allReports: React.PropTypes.object.isRequired,
};
Header = withRouter(Header)

const mapStateToProps = state => ({
  allReports: state.reports.all
});

export default connect(mapStateToProps, { addReport })(Header);
