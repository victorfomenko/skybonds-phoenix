import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layerSearchRequest } from '../../actions';
import Search from '../Search';

class LayerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: props.layer.dataSource.search.query,
      searchBonds: props.layer.dataComputed.search.bonds,
      filtersIsins: props.layer.dataComputed.filters.isins
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchQuery: nextProps.layer.dataSource.search.query,
      searchBonds: nextProps.layer.dataComputed.search.bonds,
      filtersIsins: nextProps.layer.dataComputed.filters.isins
    });
  }

  sendSearchRequest(query, date) {
    this.props.layerSearchRequest(this.props.layer.id, query, date, this.state.filtersIsins);
  }

  render() {
    return (
      <div>
        <Search
          query={this.state.searchQuery}
          bonds={this.state.searchBonds}
          sendSearchRequest={this.sendSearchRequest.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { layerSearchRequest })(LayerSearch);
