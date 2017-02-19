import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRequest, searchResponse } from '../../actions';
import Search from '../Search';
import styles from './styles.sass';

const MIN_QUERY_LENGTH = 3;
const defaultDate = new Date('2017/02/05');

class LayerSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.layer.search.query,
      results: props.layer.search.results,
      dropdownActive: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.layer.search.query,
      results: nextProps.layer.search.results
    });
  }

  sendSearchRequest(query, date) {
    this.props.searchRequest(this.props.layer.id, query, date);
  }

  render() {

    return (
      <div>
        <Search
          query={this.state.query}
          results={this.state.results}
          sendSearchRequest={this.sendSearchRequest.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { searchRequest, searchResponse })(LayerSearch);
