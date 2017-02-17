import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './style.sass';

import { filtersApply, getBondsInfo, getBondsDaily } from '../../data/providers/Data';

class Home extends Component {
  render () {
    const { user } = this.props;
    return (
      <div className={style.home}>
        <div>First name: {JSON.stringify(user.firstName)}</div>
        <div>Last name: {JSON.stringify(user.lastName)}</div>
        <div className={style.home_info}>
          <span className={style.home_title}>Home page</span>
          <ul className={style.home_list}>
            <li className={style.home_item}><Link to={'/'}>Home</Link></li>
            <li className={style.home_item}><Link to={'/reports/market'}>Market</Link></li>
            {!user.token ? <li className={style.home_item}><Link to={'/login'}>Login</Link></li> : null}
            {user.token ? <li className={style.home_item}><Link to={'/logout'}>Logout</Link></li> : null}
          </ul>
        </div>

      </div>
    );
  }
}


Home.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
};

export default connect(state => ({ user: state.user }))(Home);
