import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, GLYPHS } from '../../components/Icon';
import styles from './styles.sass'

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <nav className={styles.headerNav}>
          <Link className={styles.headerNav_home} to={'/home'}>Skybonds</Link>
          <ul className={styles.headerNav_list}>
            <li className={styles.headerNav_item}>
              <Link className={styles.headerNav_text} to={'/reports/market'}>Market report</Link>
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
};

export default Header;
