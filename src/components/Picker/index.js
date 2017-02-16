import React, { Component } from 'react';
import style from './styles.sass';

class Picker extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  closePicker() {
    this.setState({open: false});
  }

  onLabelClick() {
    this.setState({open: true});
  }

  onPickerChange(picker) {
    this.props.onPickerChange(picker.value);
    this.closePicker();
  }

  render() {
    let activePicker;
    let pickerList = ((this.props.pickerList || []).map((picker, index) => {
      if(picker.value == this.props.selectedPicker) {
        activePicker = picker;
      }
      return (
        <li key={picker.value + '+pickerList' + index} className={(picker.value == this.props.selectedPicker) ? style.reportSelectPicker_item + ' ' + style.__selected : style.reportSelectPicker_item}
        onClick={this.onPickerChange.bind(this, picker)}>
          <span className={style.reportSelectPicker_text}>{picker.label}</span>
        </li>
      );
    }));
    return (
      <div className={(this.state.open) ? style.reportSelectPicker + ' ' + style.__open : style.reportSelectPicker} tabIndex='0' onBlur={this.closePicker.bind(this)}>
        <span className={style.reportSelectPicker_label} onClick={this.onLabelClick.bind(this)}>
          <span className={style.reportSelectPicker_value}>{activePicker.label}</span>
          <span className={style.reportSelectPicker_icon}></span>
        </span>
        <div className={(this.state.open) ? style.reportSelectPicker_dropdown + ' ' + style.__active : style.reportSelectPicker_dropdown}>
          <ul className={style.reportSelectPicker_list}>
            {pickerList}
          </ul>
        </div>
      </div>
    );
  }
}

Picker.propTypes = {
  pickerList: React.PropTypes.array.isRequired,
  selectedPicker: React.PropTypes.string,
  onPickerChange: React.PropTypes.func.isRequired
};

export default Picker;