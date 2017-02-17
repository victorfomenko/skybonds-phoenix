import React, { Component } from 'react';
import styles from './styles.sass';

export const GLYPHS = {
  SEARCH: require('../../resources/icons/search.svg'),
  CLOSE: require('../../resources/icons/close.svg'),
  INFO: require('../../resources/icons/info.svg'),
  GEAR: require('../../resources/icons/gear.svg'),
  TRIANGLE: require('../../resources/icons/triangle.svg')
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
