import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layerSearchQueryChange, layerSearchRequest, layerGetFilterStats, changeLayersBonds } from '../../actions';
import Search from '../Search';

class LayerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.layer.dataSource.search.query,
      bonds: props.layer.dataComputed.bonds,
      pending: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.layer.dataSource.search.query,
      bonds: nextProps.layer.dataComputed.bonds
    });
  }

  searchQueryChange(query) {
    this.setState({
      pending: true
    });
    this.props.layerSearchQueryChange(this.props.layer.id, query);
  }

  async searchRequest(query, date) {
    await this.props.layerSearchRequest(this.props.layer.id, query, date);
    if(this.props.layer.dataComputed.isinsAll.length) {
      await this.props.layerGetFilterStats(this.props.layer.id, this.props.layer.dataSource.filters, this.props.layer.dataComputed.isinsAll);
      await this.props.changeLayersBonds(this.props.layer.id, this.props.layer.dataComputed.isinsAll, date);
    }
    this.setState({
      pending: false
    });
  }

  render() {
    return (
      <div>
        <Search
          query={this.state.query}
          bonds={this.state.bonds}
          pending={this.state.pending}
          searchQueryChange={this.searchQueryChange.bind(this)}
          searchRequest={this.searchRequest.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { layerSearchQueryChange, layerSearchRequest, layerGetFilterStats, changeLayersBonds })(LayerSearch);
