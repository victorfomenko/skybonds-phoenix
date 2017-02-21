import React, { Component } from 'react';
import { Icon, GLYPHS } from '../../components/Icon';
import { getColor } from '../../helpers/BondRating';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import styles from './styles.sass';

const DEBOUNCE_DELAY = 250;
const MIN_QUERY_LENGTH = 3;
const defaultDate = new Date('2017/02/05');

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      bonds: props.bonds,
      placeholderBonds: props.placeholderBonds,
      dropdownActive: false,
      pending: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.query,
      bonds: nextProps.bonds,
      placeholderBonds: nextProps.placeholderBonds,
      pending: false
    });
  }

  componentWillUnmount() {
    this.sendSearchRequest.cancel();
  }

  sendSearchRequest = _.debounce((query, date) => {
    this.props.sendSearchRequest(query, date);
  }, DEBOUNCE_DELAY);

  onSearchClear() {
    this.setState({ query: '', bonds: [] });
    this.sendSearchRequest('', defaultDate);
  }

  onDropdownMouseDown(e) {
    e.preventDefault();
  }

  onInputFocus() {
    this.setState({ dropdownActive: true });
  }

  onInputBlur() {
    this.setState({ dropdownActive: false });
  }

  onInputChange(event) {
    let query = event.target.value;
    this.setState({query: query, bonds: [], pending: true});
    this.sendSearchRequest(query, defaultDate);
  }

  render() {
    let searchDropdown;
    let searchGroups = [];
    let searchGroupsMap = {};
    const isPlaceholderVisible =
      this.state.bonds.length == 0 &&
      this.state.placeholderBonds.length > 0;
    let currentBonds = isPlaceholderVisible ? this.state.placeholderBonds : this.state.bonds;

    for(let bond of currentBonds) {
      if(searchGroupsMap[bond.info.issuerId] == null) {
        searchGroupsMap[bond.info.issuerId] = {
          issuerId: bond.info.issuerId,
          issuer: bond.info.issuer,
          bonds: []
        };
        searchGroups.push(searchGroupsMap[bond.info.issuerId]);
      }
      searchGroupsMap[bond.info.issuerId].bonds.push(bond);
    }

    if(this.state.query.length >= MIN_QUERY_LENGTH && this.state.pending) {
      searchDropdown = <div className={styles.bondsSearch_status}>
        Loading…
      </div>;
    }

    else if(this.state.query.length < MIN_QUERY_LENGTH && !isPlaceholderVisible) {
      searchDropdown = <div className={styles.bondsSearch_status}>
        Enter 3+ characters…
      </div>;
    }

    else if(currentBonds.length == 0) {
      searchDropdown = <div className={styles.bondsSearch_status}>
        No bonds found.
      </div>;
    }

    else {
      let searchGroupsTemplate = searchGroups.map((group, index)=> {
        let searchGroupBonds = group.bonds.map((bond, index)=> {
          return <li className={styles.bondsSearch_item + ' ' + styles.__body}
                     key={ 'search_result_item_key_' + index } >
            <span className={styles.bondsSearch_cell + ' ' + styles.__check}>
              {/*<input className={styles.bondsSearch_checkbox} checked type="checkbox"/>*/}
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>
              <span className={styles.bondsSearch_link}>
                <span className={styles.bondsSearch_main}>{bond.info.standardName}</span>
              </span>
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__yield + ' ' + styles.__turn}>
              {NumberFormatter(bond.daily.yield, { placeholder: 'NA' })}
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__duration + ' ' + styles.__turn}>
              {NumberFormatter(bond.daily.duration, { placeholder: 'NA' })}
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__rating + ' ' + styles.__turn}
            style={{color: getColor(bond.info.ratingGroup)}}>
              {bond.info.ratingGroup}
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__currency + ' ' + styles.__turn}>
              {bond.info.ccy}
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__info + ' ' + styles.__hidden}>
              <a className={styles.bondsSearch_info} href={'/bond/' + bond.isin} target="_blank">
                <Icon glyph={GLYPHS.INFO}
              width="14" height="14" />
              </a>
            </span>
          </li>;
        });

        return <li className={styles.bondsSearch_group}
                   onMouseDown={this.onDropdownMouseDown.bind(this)}
                   key={ 'search_result_group_key_' + index }>
          <div className={styles.bondsSearch_item + ' ' + styles.__head }>
            <span className={styles.bondsSearch_cell + ' ' + styles.__check}>
              {/*<input className={styles.bondsSearch_checkbox} checked type="checkbox"/>*/}
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>
              <span className={styles.bondsSearch_link}>
                <span className={styles.bondsSearch_main}>{group.issuer}</span>
              </span>
            </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__info + ' ' + styles.__hidden}>
              <a className={styles.bondsSearch_info} href={'/issuer/' + group.issuerId} target="_blank">
                <Icon glyph={GLYPHS.INFO}
                      width="14" height="14" />
              </a>
            </span>
          </div>
          <ul>
            { searchGroupBonds }
          </ul>
        </li>;
      });

      searchDropdown =
        <div onMouseDown={this.onDropdownMouseDown.bind(this)}>
          <div className={styles.bondsSearch_status + ' ' + styles.__total}>
            { currentBonds.length > 0 &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__check}>
                {/*<input className={styles.bondsSearch_checkbox} checked type="checkbox"/>*/}
              </span>
            }
            { currentBonds.length > 0 &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>
                  <span>{currentBonds.length} actual bonds found</span>
              </span>
            }
            { currentBonds.length == 0 &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>No actual bonds found.</span>
            }
            <span className={styles.bondsSearch_cell + ' ' + styles.__yield}>Yield</span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__duration}>Duration</span>
          </div>

          <div className={styles.bondsSearch_content}>
            <ul className={styles.bondsSearch_list}>
              { searchGroupsTemplate }
            </ul>
          </div>
        </div>;
    }

    return (
      <div className={styles.bondsSearch}>
        <input className={styles.bondsSearch_input}
               placeholder="Name, Issuer, ISIN or Rating"
               onFocus={this.onInputFocus.bind(this)}
               onBlur={this.onInputBlur.bind(this)}
               onChange={this.onInputChange.bind(this)}
               value={this.state.query} />
        { this.state.query.length == 0 &&
        <Icon className={styles.bondsSearch_icon}
              glyph={GLYPHS.SEARCH}
              width="10" height="10" />
        }
        { this.state.query.length != 0 &&
        <Icon className={styles.bondsSearch_icon + ' ' + styles.__close}
              onClick={this.onSearchClear.bind(this)}
              glyph={GLYPHS.CLOSE}
              width="8" height="8" />
        }
        <div className={styles.bondsSearch_dropdown + (this.state.dropdownActive ? ' ' + styles.__active : '')}>
          { searchDropdown }
        </div>
      </div>
    );
  }
}

Search.defaultProps = {
  placeholderBonds: []
};

export default Search;
