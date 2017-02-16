import React, { Component } from 'react';
import style from './styles.sass';

class ButtonGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {buttons: props.buttons, selectedButton: props.selectedButton}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({buttons: nextProps.buttons, selectedButton: nextProps.selectedButton});
  }

  onButtonClick(buttonValue) {
    this.props.onButtonClick(buttonValue);
    this.setState({selectedButton: buttonValue});
  }

  render() {
    let buttons = ((this.state.buttons || []).map((button, index) => {
      return (
        <li key = {button.value + '_btn_' + index} className={style.buttonGroup_item + ' ' + (this.state.selectedButton == button.value ? style.__active : '') }>
          <a className={style.buttonGroup_link} onClick={this.onButtonClick.bind(this, button.value)}>
            {(button.label ? button.label : button.value)}
          </a>
        </li>
      );
    }));
    return (
      <div>
        <ul className={style.buttonGroup}>
          {buttons}
        </ul>
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  buttons: React.PropTypes.array.isRequired,
  selectedButton: React.PropTypes.string,
  onButtonClick: React.PropTypes.func.isRequired
};

export default ButtonGroup;
