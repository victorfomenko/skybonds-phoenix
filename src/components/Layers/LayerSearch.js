import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layerSearchBonds, layerGetFilterStats, changeLayersBonds } from '../../actions';
import Search from '../Search';

class LayerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: props.layer.source.search.query,
      layerIsins: props.layer.data.isins,
      layerBonds: props.layer.data.bonds
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchQuery: nextProps.layer.source.search.query,
      layerIsins: nextProps.layer.data.isins,
      layerBonds: nextProps.layer.data.bonds
    });
  }

  async sendSearchRequest(query, date) {
    await this.props.layerSearchBonds(this.props.layer.id, query, date);
    await this.props.layerGetFilterStats(this.props.layer.id, this.props.layer.dataSource.filters, this.state.layerIsins);
    this.props.changeLayersBonds(this.props.layer.id, this.state.layerIsins, date);
  }

  render() {
    return (
      <div>
        <Search
          query={this.state.searchQuery}
          bonds={this.state.layerBonds}
          sendSearchRequest={this.sendSearchRequest.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { layerSearchBonds, layerGetFilterStats, changeLayersBonds })(LayerSearch);
