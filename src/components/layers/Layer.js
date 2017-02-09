import React, { Component } from 'react';
import layersStyle from './layers.sass';



class Layer extends Component {
  constructor(props) {
    super(props);

  }

  handleClose() {
    this.props.onCloseHandler(this.props.id);
  }

  onLayerClick() {
    this.props.onLayerClick(this.props.id);
  }

  render(){
    return (
        <li className={layersStyle.reportLayersStrip_item + ' ' +(this.props.active ? layersStyle.__active : '')}>
          <div className={layersStyle.reportLayersStrip_content}>
            <div onClick={this.onLayerClick.bind(this)}>{this.props.name}</div>
            <div className={layersStyle.reportLayersStrip_closeIcon} onClick={this.handleClose.bind(this)}></div>
            <div className="reportLayersStrip_filters">
            </div>
          </div>
        </li>
    )
  }
}



Layer.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  onCloseHandler: React.PropTypes.func.isRequired,
  onLayerClick: React.PropTypes.func.isRequired
};

export default Layer
