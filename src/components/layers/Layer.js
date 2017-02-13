import React, { Component } from 'react';
import layersStyle from './layers.sass';


class Layer extends Component {
  constructor(props) {
    super(props);
    this.state = {'renameMode': false};
  }

  onLayerClose() {
    this.props.onLayerClose(this.props.id);
  }

  onLayerClick() {
    this.props.onLayerClick(this.props.id);
  }

  onLayerDblClick() {
    this.setState({renameMode: !this.state.renameMode});
  }

  onLayerRename(e) {
    if (e.key === 'Enter') {
      this.props.onLayerRename(this.props.id, e.target.value);
      this.setState({renameMode: false});
    }
  }

  render(){
    let readonly = (this.state.renameMode) ? false : true;
    return (
        <li className={layersStyle.reportLayersStrip_item + ' ' +(this.props.active ? layersStyle.__active : '')}>
          <div className={layersStyle.reportLayersStrip_content}>

            <div onClick={this.onLayerClick.bind(this)} onDoubleClick={this.onLayerDblClick.bind(this)}>
              <div className={layersStyle.reportLayersStrip_name}>
                <input
                  type='text'
                  defaultValue={this.props.name}
                  className={layersStyle.reportLayersStrip_name}
                  onKeyUp={this.onLayerRename.bind(this)}
                  readOnly={readonly}
                />

              </div>
            </div>
            <div className={layersStyle.reportLayersStrip_closeIcon} onClick={this.onLayerClose.bind(this)}></div>
            <div className='reportLayersStrip_filters'>
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
  onLayerClose: React.PropTypes.func.isRequired,
  onLayerClick: React.PropTypes.func.isRequired,
  onLayerRename: React.PropTypes.func.isRequired
};

export default Layer
