import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { filtersApply, getBondsInfo, getBondsDaily } from '../../data/providers/Data'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    try {
      const resp = await filtersApply({
            filters:[
              {name:'country',value:['RUS']},
              {name:'actual',value:['true']}
            ],
            date: '20161226'
          }
        )
      console.log(resp)
    }
    catch (e) {
      console.warn(e)
    }
    const bondsInfo = await getBondsInfo(['RU000A0JUGC6'])
    const bondsDaily = await getBondsDaily(['XS0088543193', 'ERROR'])
    
    console.log(bondsInfo)
    console.log(bondsDaily)
  }


  render () {
    const { user } = this.props
    return (
      <div>
        {JSON.stringify(user)}
        <span>Home page</span>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/reports/market'}>Market</Link></li>
          {!user.token ? <li><Link to={'/login'}>Login</Link></li> : null}
          {user.token ? <li><Link to={'/logout'}>Logout</Link></li> : null}
        </ul>
        
      </div>
    )
  }
}


Home.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
}

export default connect(state => ({ user: state.user }))(Home)