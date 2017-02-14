import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchBond } from '../../actions';
import style from './styles.sass';

class Search extends Component {


  constructor(props) {
    super(props);
    const search = props.layers.layersById[props.layerId];
    this.state = {search}
  }

  componentWillReceiveProps(nextProps) {
    const search = nextProps.layers.layersById[nextProps.layerId];
    this.setState({search});
  }


  componentDidMount() {

  }

  onSearchClick() {
    console.log(this.state.search);
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

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { searchBond })(Search);
