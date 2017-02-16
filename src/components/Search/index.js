import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRequest, searchResponse } from '../../actions';
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

  componentWillUnmount() {
    this.sendSearchRequest.cancel();
  }

  sendSearchRequest = _.debounce((query, date) => {
    this.props.searchRequest(this.props.layer.id, query, date);
  }, DEBOUNCE_DELAY);

  onSearchClear() {
    this.setState({ query: '' })
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
    this.setState({query: query});
    this.sendSearchRequest(query, defaultDate);
  }

  render() {
    let searchDropdown;

    if(this.state.query.length < MIN_QUERY_LENGTH) {
      searchDropdown = <div className={styles.bondsSearch_status}>
        Enter 3+ characters…
      </div>;
    }

    else if(this.state.results.length == 0) {
      searchDropdown = <div className={styles.bondsSearch_status}>
        No bonds found.
      </div>;
    }

    else {
      let searchGroups = this.state.results.map((group, index)=> {
        let searchGroupBonds = group.bonds.map((bond, index)=> {
          if(!bond.isActual) {
            return '';
          }
          return <li className={styles.bondsSearch_item + ' ' + styles.__body}
                     key={ 'search_result_item_key_' + index } >

            { bond.isActual &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__check}>
             {/*<input className={styles.bondsSearch_checkbox} checked type="checkbox"/>*/}
            </span>
            }

            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>
            <span className={styles.bondsSearch_link}>
              <span className={styles.bondsSearch_main}>{bond.name}</span>
            </span>
          </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__yield + ' ' + styles.__turn}>
            {NumberFormatter(bond.yield, { placeholder: 'NA' })}
          </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__duration + ' ' + styles.__turn}>
            {NumberFormatter(bond.duration, { placeholder: 'NA' })}
          </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__rating + ' ' + styles.__turn}
                  style={{color: getColor(bond.ratingGroup)}}>
            {bond.ratingGroup}
          </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__currency + ' ' + styles.__turn}>
            {bond.ccy}
          </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__info + ' ' + styles.__hidden}>
            <a className={styles.bondsSearch_info} href={'/bond/' + bond.isin} target="_blank">
              <Icon glyph={GLYPHS.INFO}
                    width="14" height="14" />
            </a>
          </span>
          </li>;
        });

        return <div className={styles.bondsSearch_group}
                    onMouseDown={this.onDropdownMouseDown.bind(this)}
                    key={ 'search_result_group_key_' + index }>
          <div className={styles.bondsSearch_item + ' ' + styles.__head }>
          <span className={styles.bondsSearch_cell + ' ' + styles.__check}>
           {/*<input className={styles.bondsSearch_checkbox} checked type="checkbox"/>*/}
           </span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>
            <span className={styles.bondsSearch_link}>
              <span className={styles.bondsSearch_main}>{group.issuerName}</span>
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
        </div>;
      });

      let actualBonds = 0;
      let nonActualBonds = 0;
      for(let group of this.state.results) {
        for(let bond of group.bonds) {
          if(bond.isActual) {
            actualBonds++;
          } else {
            nonActualBonds++;
          }
        }
      }

      searchDropdown =
        <div onMouseDown={this.onDropdownMouseDown.bind(this)}>
          <div className={styles.bondsSearch_status + ' ' + styles.__total}>
            { actualBonds &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__check}>
                {/*<input className={styles.bondsSearch_checkbox} checked type="checkbox"/>*/}
              </span>
            }
            { actualBonds > 0 &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>
                  <span>{actualBonds} actual bonds found</span>
              </span>
            }
            { actualBonds == 0 && nonActualBonds > 0 &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__name}>No actual bonds found.</span>
            }
            { nonActualBonds > 0 &&
            <span className={styles.bondsSearch_cell + ' ' + styles.__expired}>
                {/*<input className={styles.bondsSearch_checkbox} type="checkbox"/>*/}
              {/*<span>show {nonActualBonds} others</span>*/}
              </span>
            }
            <span className={styles.bondsSearch_cell + ' ' + styles.__yield}>Yield</span>
            <span className={styles.bondsSearch_cell + ' ' + styles.__duration}>Duration</span>
          </div>

          <div className={styles.bondsSearch_content}>
            <ul className={styles.bondsSearch_list}>
              { searchGroups }
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

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { searchRequest, searchResponse })(Search);
