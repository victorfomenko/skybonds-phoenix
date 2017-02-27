import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Market from './Market';
import ReportsSelector from '../../components/ReportsSelector';
import Header from '../../components/Header';

import { loadAllReports } from '../../actions';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      pending: true,
    }
    this.props.loadAllReports();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      pending: nextProps.all.pending
    })
  }

  render() {
    const { user, pending } = this.state;
    return (
      <div className='skybondsWrap'>
        <Header firstName={user.firstName} lastName={user.lastName} />
        { !pending ?
          <Route path={`${this.props.match.url}/market/:reportID?`} component={Market}/>
          /*<Route path="/reports/portfolio" component={Portfolio} />*/
        : <div>...loading reports</div>}
        <ReportsSelector />
      </div>
  )
  }
}

Reports.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
  summary: React.PropTypes.object.isRequired,
  loadAllReports: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.user, summary: state.summary, all: state.reports.all });
export default connect(mapStateToProps, { loadAllReports })(Reports);
