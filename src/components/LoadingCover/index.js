import React, { Component } from 'react';
import styles from './styles.sass';

class LoadingCover extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.isLoading) {
      return (
      <div className={styles.loadingCover + ' ' + styles.dynamicCover}>
        <div className={styles.loadingMessageContainer}>
          <div className={styles.loadingCaption}>Loading data</div>
          <div className={styles.spinner}>
            <div className={styles.bounce1}></div>
            <div className={styles.bounce2}></div>
            <div className={styles.bounce3}></div>
          </div>
        </div>
      </div>
      )
    } else
    return <span></span>
  }
}


LoadingCover.propTypes = {
  isLoading: React.PropTypes.bool
}

export default LoadingCover;
