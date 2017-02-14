import React, { Component } from 'react';
import style from './style.sass';

class BondGeneral extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
       
      </div>
    )
  }
}

BondGeneral.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondGeneral
