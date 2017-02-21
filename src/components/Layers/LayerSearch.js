import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layerSearchBonds } from '../../actions';
import Search from '../Search';

class LayerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.layer.dataSource.search.query,
      bonds: props.layer.dataComputed.search.bonds,
      placeholderBonds: props.layer.dataComputed.search.placeholderBonds,
      filtersIsins: props.layer.dataComputed.filters.isins
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.layer.dataSource.search.query,
      bonds: nextProps.layer.dataComputed.search.bonds,
      placeholderBonds: nextProps.layer.dataComputed.search.placeholderBonds,
      filtersIsins: nextProps.layer.dataComputed.filters.isins
    });
  }

  async sendSearchRequest(query, date) {
    await this.props.layerSearchBonds(this.props.layer.id, query, date, this.state.filtersIsins);
  }

  render() {
    return (
      <div>
        <Search
          query={this.state.query}
          bonds={this.state.bonds}
          placeholderBonds={this.state.placeholderBonds}
          sendSearchRequest={this.sendSearchRequest.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { layerSearchBonds })(LayerSearch);
