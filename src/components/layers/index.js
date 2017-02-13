import React, { Component } from 'react';
import { connect } from 'react-redux';
import {assign} from 'lodash';

import Layer from './Layer';
import Filters from './Filters';
import layersStyle from './layers.sass';

import { addLayer, deleteLayer, activateLayer, renameLayer, changeFilter } from '../../actions'


class Layers extends Component {
  constructor(props) {
    super(props);
    this.state = {'loaded': false};
  }

  componentDidMount() {
    this.setState({'loaded': true});
  }

  _removeLayerSet(layerId) {
    this.props.deleteLayer(layerId);
  }

  handleNewSet() {
    this.props.addLayer();
  }

  handleClose(layerId) {
    this._removeLayerSet(layerId);
  }

  handleLayerClick(layerId) {
    this.props.activateLayer(layerId);
  }

  handleLayerRename(layerId, layerName) {
    this.props.renameLayer(layerId, layerName);
  }

  handleFilterChange(isins, filtersState) {
    this.props.changeFilter(filtersState.all);
    this.props.filteredDataHandler(isins);
  }

  render(){
    let layersState = this.props.layers;
    let layers = ((layersState.layers || []).map((layer, index) => {
      let layerById = layersState.layersById[layer];
      return <Layer
                key={'layer_key_' + index}
                id={layerById.id}
                name={layerById.name}
                active={(layerById.id == this.props.layers.activeLayer)? true: false}
                onLayerClose={this.handleClose.bind(this)}
                onLayerClick={this.handleLayerClick.bind(this)}
                onLayerRename={this.handleLayerRename.bind(this)}
            />
    }));

    if(this.state.loaded){
      return (
        <div className={layersStyle.reportLayers}>
          <ul className={layersStyle.reportLayersStrip_list}>
            {layers}
          </ul>
          <div className={layersStyle.reportLayersStrip_buttons}>
            <span className={layersStyle.reportLayersStrip_button + ' ' + layersStyle.__set} onClick={this.handleNewSet.bind(this)}>
              set
            </span>
          </div>
          <Filters
            filteredDataHandler={this.handleFilterChange.bind(this)}
            filters={layersState.layersById[layersState.activeLayer].filters}
          />
        </div>
      );
    }
    else {
      return(<div>Loading...</div>);
    }
  }
}



Layers.propTypes = {
  layers: React.PropTypes.object.isRequired,
  filteredDataHandler: React.PropTypes.func.isRequired,
  addLayer: React.PropTypes.func.isRequired,
  deleteLayer: React.PropTypes.func.isRequired,
  renameLayer: React.PropTypes.func.isRequired,
  changeFilter: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ layers: state.layers });
export default connect(mapStateToProps, {
    addLayer, deleteLayer, activateLayer, renameLayer, changeFilter
  })(Layers);
