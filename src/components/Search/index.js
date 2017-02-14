import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchBond } from '../../actions';
import style from './styles.sass';

class Search extends Component {


  constructor(props) {
    super(props);
    //this.state = {}
  }


  componentDidMount() {

  }

  onSearchClick() {
    this.props.searchBond(this.props.layerId);
    console.log('search', this.props.layerId);
  }


  render() {
    return (
      <div onClick={this.onSearchClick.bind(this)}>search</div>
    );
  }
}

Search.propTypes = {
  searchBond: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ search: state.reports.market.search });
export default connect(mapStateToProps, { searchBond })(Search);
