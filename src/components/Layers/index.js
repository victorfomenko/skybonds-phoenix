import React, { Component } from 'react';
import { connect } from 'react-redux';
import {assign} from 'lodash';

import Layer from './Layer';
import LayerSearch from './LayerSearch';
import Filters from '../Filters';
import layersStyle from './styles.sass';

import {
        addLayer,
        deleteLayer,
        activateLayer,
        renameLayer,
        changeLayerView
      } from '../../actions';


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

  onNewSet() {
    this.props.addLayer();
  }

  onLayerClose(layerId) {
    this._removeLayerSet(layerId);
  }

  onLayerClick(layerId) {
    this.props.activateLayer(layerId);
  }

  onLayerRename(layerId, layerName) {
    this.props.renameLayer(layerId, layerName);
  }

  onLayerViewChange(layerId, viewMode) {
    this.props.changeLayerView(layerId, viewMode);
  }

  render(){
    let layersState = this.props.layers;
    let { activeLayerId } = this.props;

    let layers = ((layersState.ids || []).map((layerID, index) => {
      let layer = layersState.layersById[layerID];

      return <Layer
                key={'layer_key_' + index}
                id={layerID}
                name={layer.ui.name}
                active={layer.ui.active}
                onLayerClose={this.onLayerClose.bind(this)}
                onLayerClick={this.onLayerClick.bind(this)}
                onLayerRename={this.onLayerRename.bind(this)}
                onLayerViewChange={this.onLayerViewChange.bind(this)} />;
    }));

    if(this.state.loaded){
      return (
        <div className={layersStyle.reportLayers}>
          <div className={layersStyle.reportLayersStrip}>
            <ul className={layersStyle.reportLayersStrip_list}>
              {layers}
            </ul>
            <div className={layersStyle.reportLayersStrip_buttons}>
              <span className={layersStyle.reportLayersStrip_button + ' ' + layersStyle.__set} onClick={this.onNewSet.bind(this)}>
                set
              </span>
            </div>
          </div>
          <div className={layersStyle.reportLayerSettings}>
            <div className={layersStyle.reportLayerSettings_search}>
              <LayerSearch layer={layersState.layersById[activeLayerId]} />
            </div>
            <div className={layersStyle.reportLayerSettings_filters}>
              <Filters layer={layersState.layersById[activeLayerId]} />
            </div>
          </div>
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
  addLayer: React.PropTypes.func.isRequired,
  deleteLayer: React.PropTypes.func.isRequired,
  renameLayer: React.PropTypes.func.isRequired,
  changeLayerView: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ layers: state.reports.market.layers, activeLayerId: state.reports.market.activeLayerId });
export default connect(mapStateToProps, {
    addLayer, deleteLayer, activateLayer, renameLayer, changeLayerView
  })(Layers);
