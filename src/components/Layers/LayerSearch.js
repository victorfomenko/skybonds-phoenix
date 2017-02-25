import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layerSearchQueryChange, layerSearchRequest, layerGetFilterStats, changeLayersBonds } from '../../actions';
import Search from '../Search';

class LayerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.layer.source.search.query,
      bonds: props.layer.data.bonds,
      pending: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.layer.source.search.query,
      bonds: nextProps.layer.data.bonds
    });
  }

  searchQueryChange(query) {
    this.setState({
      pending: true
    });
    this.props.layerSearchQueryChange(this.props.activeLayerId, query);
  }

  async searchRequest(query, date) {
    await this.props.layerSearchRequest(this.props.activeLayerId, query, date);
    if(this.props.layer.data.isinsAll.length) {
      // await this.props.layerGetFilterStats(this.props.activeLayerId, this.props.layer.source.filters, this.props.layer.data.isinsAll);
      await this.props.changeLayersBonds(this.props.activeLayerId, this.props.layer.data.isinsAll, date);
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

const mapStateToProps = state => ({ layers: state.reports.market.layers, activeLayerId: state.reports.market.activeLayerId });
export default connect(mapStateToProps, { layerSearchQueryChange, layerSearchRequest, layerGetFilterStats, changeLayersBonds })(LayerSearch);
