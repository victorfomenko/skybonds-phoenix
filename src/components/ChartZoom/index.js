import React, { Component } from 'react';
import style from './styles.sass';

class ChartZoom extends Component {

  constructor(props) {
    super(props);
  }

  validateScale(scale) {
    if ((typeof scale === 'undefined' || scale === null) || isNaN(scale)) {
      scale = 1;
    }
    return scale;
  }

  onPlusClick() {
    let scale = this.props.currentScale + this.props.scaleStep;
    this.validateScale(scale);
    this.props.onZoomChange(scale);
  }

  onMinusClick() {
    const scale = this.props.currentScale - this.props.scaleStep;
    this.validateScale(scale);
    this.props.onZoomChange(scale);
  }

  render() {
    return (
      <div className={style.reportViewScatterPlotZoomPicker}>
        <div className={style.reportViewScatterPlotZoomPicker_button + ' ' + style.__plus} onClick={this.onPlusClick.bind(this)}>+</div>
        <div className={style.reportViewScatterPlotZoomPicker_button + ' ' + style.__minus} onClick={this.onMinusClick.bind(this)}>−</div>
      </div>
    );
  }
}

ChartZoom.propTypes = {
  currentScale: React.PropTypes.number.isRequired,
  scaleStep: React.PropTypes.number.isRequired,
  onZoomChange: React.PropTypes.func.isRequired
};

export default ChartZoom;
