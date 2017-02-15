import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchChange } from '../../actions';
import * as SearchProvider from '../../data/providers/Search';
import { Icon, GLYPHS } from '../../components/Icon';
import styles from './styles.sass';

const DEBOUNCE_DELAY = 250;
const SEARCH_LIMIT = 200;

class Search extends Component {

  constructor(props) {
    super(props);
    // if(this.props.layer)
    this.state = {
      query: props.layer.search.query,
      results: { bonds: [], issuers: [] },
      dropdownActive: true
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.layer.search.query,
      results: { bonds: [], issuers: [] }
    });
  }


  componentWillUnmount() {
    this.getSearchResults.cancel()
  }


  getSearchResults = _.debounce((query) => {
    // if(this.props.layer)
    SearchProvider.search(query, SEARCH_LIMIT, ['maturityDate', 'finalDate', 'issueDate', 'status']).then((results)=>{
      this.props.searchChange(this.props.layer.id, query);
      this.setState({ results: results });
    });
  }, DEBOUNCE_DELAY);


  onSearchClick() {
    // console.log(this.state.search);
  }

  onSearchClear() {console.log('close');}

  onInputBlur() {console.log('blur');}

  onInputChange(event) {
    console.log('change', event.target.value);
    this.getSearchResults(event.target.value);
    this.setState({query: event.target.value})
  }

  onInputKeyPress() {console.log('press');}

  render() {

    let resultGroups = [];
    if(this.state.results) {
      for(let issuer of this.state.results.issuers) {
        let resultGroup = {
          name: issuer.name,
          bonds: []
        };
        for(let bond of this.state.results.bonds) {
          if(bond.issuerId == issuer.id) {
            resultGroup.bonds.push(bond);
          }
        }
        resultGroups.push(resultGroup);
      }
    }

    let groupsTemplate = resultGroups.map((group, index)=> {
      let bondsTemplate = group.bonds.map((bond, index)=> {
        return <li key={ 'search_result_item_key_' + index }>
          { bond.name }
        </li>
      });

      return <div key={ 'search_result_group_key_' + index }>
        <div>{ group.name }</div>
        <ul>
          { bondsTemplate }
        </ul>
      </div>
    });

    console.log('render', this.state.query);
    return (
      <div className={styles.bondsSearch}>
        <input className={styles.bondsSearch_input}
               placeholder="Name, Issuer, ISIN or Rating"
               onBlur={this.onInputBlur.bind(this)}
               onChange={this.onInputChange.bind(this)}
               onKeyPress={this.onInputKeyPress.bind(this)}
               value={this.state.query || ''}
              />

        <Icon className={styles.bondsSearch_icon}
              glyph={GLYPHS.SEARCH}
              width="10" height="10"
              onClick={this.onSearchClick.bind(this)} />

        <Icon className={styles.bondsSearch_icon__close}
              glyph={GLYPHS.CLOSE}
              width="8" height="8"
              onClick={this.onSearchClear.bind(this)} />

        <div className={styles.bondsSearch_dropdown + (this.state.dropdownActive ? ' ' + styles.__active : '')}>
          <div className={styles.bondsSearch_content}>
            <ul className={styles.bondsSearch_list}>
              { groupsTemplate }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  // layer: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { searchChange })(Search);
