import React, { Component } from 'react';
import styles from './styles.sass';

export const GLYPHS = {
  SEARCH: require('../../resources/icons/search.svg'),
  CLOSE: require('../../resources/icons/close.svg'),
  INFO: require('../../resources/icons/info.svg'),
  GEAR: require('../../resources/icons/gear.svg'),
  TRIANGLE: require('../../resources/icons/triangle.svg'),
  VIEW_SCATTERPLOT: require('../../resources/icons/view-scatterplot.svg'),
  VIEW_TIMESERIES: require('../../resources/icons/view-timeseries.svg'),
  VIEW_TABLE: require('../../resources/icons/view-table.svg'),
  SET_VIEW_BONDS: require('../../resources/icons/set-view-bonds.svg'),
  SET_VIEW_CURVES: require('../../resources/icons/set-view-curves.svg'),
  SET_VIEW_BONDS_AND_CURVES: require('../../resources/icons/set-view-bonds-and-curves.svg'),
  SET_VIEW_HIDDEN: require('../../resources/icons/set-view-hidden.svg')
};

export class Icon extends Component {
  render() {
    let glyph = this.props.glyph;
    return (
      <svg className={this.props.className ? this.props.className + ' svgIcon' : 'svgIcon'}
           onClick={this.props.onClick}
           width={this.props.width}
           height={this.props.height}
           dangerouslySetInnerHTML={{__html: '<use xlink:href="' + glyph + '"></use>'}}/>
    );
  }
}
