import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layerSearchBonds, layerGetFilterStats, changeLayersBonds } from '../../actions';
import Search from '../Search';

class LayerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.layer.source.search.query,
      bonds: props.layer.data.bonds
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.layer.source.search.query,
      bonds: nextProps.layer.data.bonds
    });
  }

  async sendSearchRequest(query, date) {
    await this.props.layerSearchBonds(this.props.layer.id, query, date);
    await this.props.layerGetFilterStats(this.props.layer.id, this.props.layer.dataSource.filters, this.state.isins);
    this.props.changeLayersBonds(this.props.layer.id, this.state.isins, date);
  }

  render() {
    return (
      <div>
        <Search
          query={this.state.query}
          bonds={this.state.bonds}
          sendSearchRequest={this.sendSearchRequest.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { layerSearchBonds, layerGetFilterStats, changeLayersBonds })(LayerSearch);
