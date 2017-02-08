import React, { Component } from 'react';
import Filters from './Filters';
import phonix from '../../phonix.sass';
// import layers from './layers.sass';


class Layers extends Component {
  constructor(props) {
    super(props);

  }

  handleFilterChange(isins) {
    this.props.filteredDataHandler(isins);
  }

  render(){
    return (
      <div className={phonix.reportLayers}>
        <ul className={phonix.reportLayersStrip_list}>
          <li className={phonix.reportLayersStrip_item}>
          <div className="reportLayersStrip_content">

            <input className={phonix.reportLayersStrip_name}/>
            <input className={phonix.reportLayersStrip_name}/>
            <svg-icon className={phonix.reportLayersStrip_remove}></svg-icon>
          </div>
          </li>
        </ul>
        <div className={phonix.reportLayersStrip_buttons}>
          <span className={phonix.reportLayersStrip_button + ' ' + phonix.__set}>
            set
          </span>
          <span className={phonix.reportLayersStrip_button + ' ' + phonix.__spread}>
            spread
          </span>
        </div>
        <Filters filteredDataHandler={this.handleFilterChange.bind(this)} />
      </div>
    )
  }
}



Layers.propTypes = {
  filteredDataHandler: React.PropTypes.func.isRequired
};

export default Layers
