import React, { Component } from 'react';
import { Icon, GLYPHS } from '../../components/Icon';
import { LAYER_SET_VIEW_MODES } from '../../data/constants';
import styles from './styles.sass';


class Layer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renameMode: false
    };
  }

  onLayerClick() {
    this.props.onLayerClick(this.props.id);
  }

  onLayerInputClick() {
    if(this.props.active && !this.state.renameMode){
      this.setState({renameMode: true});
    }
  }

  onLayerRemove(e) {
    e.stopPropagation();
    this.props.onLayerRemove(this.props.id);
  }

  onBlur() {
    this.setState({renameMode: false});
  }

  onLayerRename(e) {
    this.props.onLayerRename(this.props.id, e.target.value);
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
      this.setState({renameMode: false});
    }
  }

  onLayerViewModeChange(viewMode) {
    this.props.onLayerViewModeChange(this.props.id, viewMode);
  }

  onSetViewModeClick() {
    let nextViewMode;
    switch(this.props.viewMode) {
      case LAYER_SET_VIEW_MODES.BONDS: nextViewMode = LAYER_SET_VIEW_MODES.CURVES; break;
      case LAYER_SET_VIEW_MODES.CURVES: nextViewMode = LAYER_SET_VIEW_MODES.BONDS_AND_CURVES; break;
      case LAYER_SET_VIEW_MODES.BONDS_AND_CURVES: nextViewMode = LAYER_SET_VIEW_MODES.HIDDEN; break;
      case LAYER_SET_VIEW_MODES.HIDDEN: nextViewMode = LAYER_SET_VIEW_MODES.BONDS; break;
    }
    this.props.onLayerViewModeChange(this.props.id, nextViewMode);
  }

  render(){
    let readonly = !this.state.renameMode;
    let glyph;
    switch(this.props.viewMode) {
      case LAYER_SET_VIEW_MODES.BONDS: glyph = GLYPHS.SET_VIEW_BONDS; break;
      case LAYER_SET_VIEW_MODES.CURVES: glyph = GLYPHS.SET_VIEW_CURVES; break;
      case LAYER_SET_VIEW_MODES.BONDS_AND_CURVES: glyph = GLYPHS.SET_VIEW_BONDS_AND_CURVES; break;
      case LAYER_SET_VIEW_MODES.HIDDEN: glyph = GLYPHS.SET_VIEW_HIDDEN; break;
    }
    let icon = <Icon glyph={glyph} width="15" height="13"
                     onClick={this.onSetViewModeClick.bind(this)} />;
    return (
        <li className={styles.reportLayersStrip_item + ' ' +(this.props.active ? styles.__active : '')}
            onClick={this.onLayerClick.bind(this, this.props.id)}>
          <div className={styles.reportLayersStrip_content}>
            <div className={styles.reportLayersView}>
              { icon }
              <div className={styles.reportLayersView_wrap}>
                <ul className={styles.reportLayersView_list}>
                  <li className={styles.reportLayersView_item + (this.props.viewMode === LAYER_SET_VIEW_MODES.BONDS ? ' ' + styles.__active : '')}>
                    <a className={styles.reportLayersView_link}
                       onClick={this.onLayerViewModeChange.bind(this, LAYER_SET_VIEW_MODES.BONDS)}>
                      <Icon glyph={GLYPHS.SET_VIEW_BONDS} width="15" height="13" />
                      <span>Bonds</span>
                    </a>
                  </li>
                  <li className={styles.reportLayersView_item + (this.props.viewMode === LAYER_SET_VIEW_MODES.CURVES ? ' ' + styles.__active : '')}>
                    <a className={styles.reportLayersView_link}
                       onClick={this.onLayerViewModeChange.bind(this, LAYER_SET_VIEW_MODES.CURVES)}>
                      <Icon glyph={GLYPHS.SET_VIEW_CURVES} width="15" height="13" />
                      <span>Curves</span>
                    </a>
                  </li>
                  <li className={styles.reportLayersView_item + (this.props.viewMode === LAYER_SET_VIEW_MODES.BONDS_AND_CURVES ? ' ' + styles.__active : '')}>
                    <a className={styles.reportLayersView_link}
                       onClick={this.onLayerViewModeChange.bind(this, LAYER_SET_VIEW_MODES.BONDS_AND_CURVES)}>
                      <Icon glyph={GLYPHS.SET_VIEW_BONDS_AND_CURVES} width="15" height="13" />
                      <span>Bonds &amp; Curves</span>
                    </a>
                  </li>
                  <li className={styles.reportLayersView_item + (this.props.viewMode === LAYER_SET_VIEW_MODES.HIDDEN ? ' ' + styles.__active : '')}>
                    <a className={styles.reportLayersView_link}
                       onClick={this.onLayerViewModeChange.bind(this, LAYER_SET_VIEW_MODES.HIDDEN)}>
                      <Icon glyph={GLYPHS.SET_VIEW_HIDDEN} width="15" height="13" />
                      <span>Hidden</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <input
              type='text'
              key={'layer_input_'+this.props.id}
              value={this.props.name}
              className={styles.reportLayersStrip_name}
              onChange={this.onLayerRename.bind(this)}
              onKeyUp={this.onKeyUp.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onClick={this.onLayerInputClick.bind(this)}
              size={this.props.name.length + 1}
              readOnly={readonly} />
            <Icon className={styles.reportLayersStrip_remove}
                  onClick={this.onLayerRemove.bind(this)}
                  glyph={GLYPHS.CLOSE} width="11" height="11" />
          </div>
        </li>
    );
  }
}



Layer.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  onLayerClick: React.PropTypes.func.isRequired,
  onLayerRemove: React.PropTypes.func.isRequired,
  onLayerRename: React.PropTypes.func.isRequired,
  onLayerViewModeChange: React.PropTypes.func.isRequired
};

export default Layer;
