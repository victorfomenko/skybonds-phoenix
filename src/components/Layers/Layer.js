import React, { Component } from 'react';
import styles from './styles.sass';


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

  onLayerViewChange(viewMode) {
    this.props.onLayerViewChange(this.props.id, viewMode);
  }

  render(){
    let readonly = (this.state.renameMode) ? false : true;
    return (
        <li className={styles.reportLayersStrip_item + ' ' +(this.props.active ? styles.__active : '')}>
          <div className={styles.reportLayersStrip_content}>
            <div className={styles.reportLayersView}>
              &#9662;
              <div className={styles.reportLayersView_wrap}>
                <ul className={styles.reportLayersView_list}>
                  <li className={styles.reportLayersView_item}>
                    <a className={styles.reportLayersView_link} onClick={this.onLayerViewChange.bind(this, 'bonds')}><span>Bonds</span></a>
                  </li>
                  {/*<li className={styles.reportLayersView_item}>
                    <a className={styles.reportLayersView_link} onClick={this.onLayerViewChange.bind(this, 'curves')}>
                      <span>Curves</span>
                    </a>
                  </li>
                  <li className={styles.reportLayersView_item}>
                    <a className={styles.reportLayersView_link} onClick={this.onLayerViewChange.bind(this, 'bonds&curves')}><span>Bonds &amp; Curves</span></a>
                  </li>*/}
                  <li className={styles.reportLayersView_item}>
                    <a className={styles.reportLayersView_link} onClick={this.onLayerViewChange.bind(this, 'hidden')}><span>Hidden</span></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.reportLayersStrip_name} onClick={this.onLayerClick.bind(this)} onDoubleClick={this.onLayerDblClick.bind(this)}>
              <input
                type='text'
                key={'layer_input_'+this.props.id}
                defaultValue={this.props.name}
                className={styles.reportLayersStrip_name}
                onKeyUp={this.onLayerRename.bind(this)}
                readOnly={readonly}
              />

            </div>
            <span className={styles.reportLayersStrip_closeIcon} onClick={this.onLayerClose.bind(this)}></span>
          </div>
        </li>
    );
  }
}



Layer.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  onLayerClose: React.PropTypes.func.isRequired,
  onLayerClick: React.PropTypes.func.isRequired,
  onLayerRename: React.PropTypes.func.isRequired,
  onLayerViewChange: React.PropTypes.func.isRequired
};

export default Layer;
