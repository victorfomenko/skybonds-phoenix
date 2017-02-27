import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIReportsNav from '@skybonds/ui-reports-nav';
import { withRouter } from 'react-router-dom'


class ReportsSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allReports: this.props.all,
      activeReportId: this.props.activeReportId
    }
    this.onRemoveReport = this.onRemoveReport.bind(this)
    this.onRenameReport = this.onRenameReport.bind(this)
    this.onSelectReport = this.onSelectReport.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allReports: nextProps.all,
      activeReportId: nextProps.activeReportId
    })
  }

  onRemoveReport(){
    console.log('onRemoveReport')
  }
  onRenameReport(){
   console.log('onRenameReport')
  }
  onSelectReport(id){
    console.log(this.state.activeReportId, id)
    if (id !== this.state.activeReportId){
      this.props.push(`/reports/market/${id}`)
      window.location.reload()
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

const mapStateToProps = state => ({
  all: state.reports.all,
  activeReportId: state.reports.market.id
});

ReportsSelector = withRouter(ReportsSelector)
export default connect(mapStateToProps)(ReportsSelector);
