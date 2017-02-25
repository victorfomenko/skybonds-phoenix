import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assign } from 'lodash';

import Layer from './Layer';
import LayerSearch from './LayerSearch';
import Filters from '../Filters';
import layersStyle from './styles.sass';

import {
  addSet,
  addSpread,
  removeLayer,
  activateLayer,
  renameLayer,
  changeLayerViewMode
} from '../../actions';


class Layers extends Component {
  constructor(props) {
    super(props);
    this.state = {'loaded': false};
  }

  componentDidMount() {
    this.setState({'loaded': true});
  }

  onNewSet() {
    this.props.addSet();
  }

  onNewSpread() {
    this.props.addSpread();
  }

  onLayerClick(layerId) {
    this.props.activateLayer(layerId);
  }

  onLayerRemove(layerId) {
    this.props.removeLayer(layerId);
  }

  onLayerRename(layerId, layerName) {
    this.props.renameLayer(layerId, layerName);
  }

  onLayerViewModeChange(layerId, viewMode) {
    this.props.changeLayerViewMode(layerId, viewMode);
  }

  render(){
    let layersState = this.props.layers;
    let { activeLayerId } = this.props;

    let layers = ((layersState.ids || []).map((layerID, index) => {
      let layer = layersState.layersById[layerID];

      return <Layer
                key={'layer_key_' + index}
                id={layerID}
                name={layer.ui.name ? layer.ui.name : layer.ui.autoName}
                active={layerID === activeLayerId}
                viewMode={layerById.viewMode}
                onLayerRemove={this.onLayerRemove.bind(this)}
                onLayerClick={this.onLayerClick.bind(this)}
                onLayerRename={this.onLayerRename.bind(this)}
                onLayerViewModeChange={this.onLayerViewModeChange.bind(this)} />;
    }));

    if(this.state.loaded){
      return (
        <div className={layersStyle.reportLayers}>
          <div className={layersStyle.reportLayersStrip}>
            <ul className={layersStyle.reportLayersStrip_list}>
              {layers}
            </ul>
            <div className={layersStyle.reportLayersStrip_buttons}>
              <span className={layersStyle.reportLayersStrip_button + ' ' + layersStyle.__set}
                    onClick={this.onNewSet.bind(this)}>
                set
              </span>
              <span className={layersStyle.reportLayersStrip_button + ' ' + layersStyle.__set}
                    onClick={this.onNewSpread.bind(this)}>
                spread
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
  addSet: React.PropTypes.func.isRequired,
  addSpread: React.PropTypes.func.isRequired,
  removeLayer: React.PropTypes.func.isRequired,
  renameLayer: React.PropTypes.func.isRequired,
  changeLayerViewMode: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ layers: state.reports.market.layers, activeLayerId: state.reports.market.activeLayerId });
export default connect(mapStateToProps, {
    addSet, addSpread, removeLayer, activateLayer, renameLayer, changeLayerViewMode
  })(Layers);
