import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homeSearchRequest } from '../../actions';
import Header from '../../components/Header';
import Search from '../../components/Search';
import { Link } from 'react-router-dom';
import style from './style.sass';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.search.query,
      results: props.search.results,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.search.query,
      results: nextProps.search.results
    });
  }

  sendSearchRequest(query, date) {
    this.props.homeSearchRequest(query, date);
  }

  render () {
    const { user } = this.props;
    return (
      <div className={style.home}>
        <Header firstName={this.props.user.firstName} lastName={this.props.user.lastName} />
        <div className={style.home_search}>
          <Search
            query={this.state.query}
            results={this.state.results}
            sendSearchRequest={this.sendSearchRequest.bind(this)}
          />
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({ user: state.user, search: state.home });
export default connect(mapStateToProps, { homeSearchRequest})(Home);
