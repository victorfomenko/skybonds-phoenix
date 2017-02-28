import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIReportsNav from '@skybonds/ui-reports-nav';
import { withRouter } from 'react-router-dom'

import { selectReport, removeReport } from '../../actions';


class ReportsSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allReports: this.props.allReports,
      activeReportId: this.props.activeReportId
    }
    this.onRemoveReport = this.onRemoveReport.bind(this)
    this.onRenameReport = this.onRenameReport.bind(this)
    this.onSelectReport = this.onSelectReport.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allReports: nextProps.allReports,
      activeReportId: nextProps.activeReportId
    })
  }

  async onRemoveReport(id){
    const reportId = await this.props.removeReport(id);
    this.props.push(`/reports/market/${reportId}`)
  }

  onRenameReport(id, name){
   console.log('onRenameReport', id, name)
  }

  onSelectReport(id){
    if (id !== this.state.activeReportId){
      this.props.push(`/reports/market/${id}`)
      window.location.reload();
      // this.props.selectReport(id);
    }
  }

  makeViewModel(allReports, activeReportId) {
    return allReports.ids.map(id => {
      const report = allReports.reportsById[id];
      return {
        id: report.id,
        name: report.ui.spaceName,
        active: report.id === activeReportId
      }
    })
  }

  render(){
    const { activeReportId, allReports } = this.state;
    const reports = this.makeViewModel(allReports, activeReportId);

    return(
      <UIReportsNav
        reports={reports}
        onRemoveReport={this.onRemoveReport}
        onRenameReport={this.onRenameReport}
        onSelectReport={this.onSelectReport}
       />
    )
  }
}

ReportsSelector.propTypes = {
  allReports: React.PropTypes.object.isRequired,
  selectReport: React.PropTypes.func.isRequired,
  removeReport: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allReports: state.reports.all,
  activeReportId: state.reports.market.id
});

ReportsSelector = withRouter(ReportsSelector)
export default connect(mapStateToProps, { selectReport, removeReport })(ReportsSelector);
