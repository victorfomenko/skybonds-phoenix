import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homeSearchQueryChange, homeSearchRequest } from '../../actions';
import Header from '../../components/Header';
import Search from '../../components/Search';
import style from './style.sass';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.search.query,
      bonds: props.search.bonds,
      pending: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.search.query,
      bonds: nextProps.search.bonds
    });
  }

  searchQueryChange(query) {
    this.props.homeSearchQueryChange(query);
  }

  async searchRequest(query, date) {
    this.setState({
      pending: true
    });
    await this.props.homeSearchRequest(query, date);
    this.setState({
      pending: false
    });
  }

  render () {
    return (
      <div className={style.home}>
        <Header firstName={this.props.user.firstName} lastName={this.props.user.lastName} />
        <div className={style.home_search}>
          <Search
            query={this.state.query}
            bonds={this.state.bonds}
            pending={this.state.pending}
            searchQueryChange={this.searchQueryChange.bind(this)}
            searchRequest={this.searchRequest.bind(this)} />
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({ user: state.user, search: state.home });
export default connect(mapStateToProps, { homeSearchQueryChange, homeSearchRequest })(Home);
