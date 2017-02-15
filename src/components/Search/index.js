import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRequest, searchResponse } from '../../actions';
import { Icon, GLYPHS } from '../../components/Icon';
import styles from './styles.sass';

const DEBOUNCE_DELAY = 250;

class Search extends Component {

  constructor(props) {
    super(props);
    // if(this.props.layer)
    this.state = {
      query: props.layer.search.query,
      results: props.layer.search.results,
      dropdownActive: true
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log('np', nextProps);
    this.setState({
      results: nextProps.layer.search.results
    });
  }


  componentWillUnmount() {
    this.sendSearchRequest.cancel()
  }


  sendSearchRequest = _.debounce((query) => {
    this.props.searchRequest(this.props.layer.id, query);
  }, DEBOUNCE_DELAY);


  onSearchClick() {
    // console.log(this.state.search);
    console.log('search', this.props.layerId);
  }

  onSearchClear() {console.log('close');}

  onInputBlur() {console.log('blur');}

  onInputChange(event) {
    console.log('change', event.target.value);
    let query = event.target.value;
    this.setState({query: query});
    this.sendSearchRequest(query);
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

    console.log('render', this.state);
    return (
      <div className={styles.bondsSearch}>
        <input className={styles.bondsSearch_input}
               placeholder="Name, Issuer, ISIN or Rating"
               onBlur={this.onInputBlur.bind(this)}
               onChange={this.onInputChange.bind(this)}
               onKeyPress={this.onInputKeyPress.bind(this)}
               value={this.state.query}
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
export default connect(mapStateToProps, { searchRequest, searchResponse })(Search);
