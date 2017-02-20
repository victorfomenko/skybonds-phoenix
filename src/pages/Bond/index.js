import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Data from '../../data/providers/Data';
import Promise from 'rsvp';
import BondHeader from '../../components/BondHeader/BondHeader';
import BondGeneral from '../../components/BondGeneral/BondGeneral';
import BondBidAskTable from '../../components/BondBidAskTable/BondBidAskTable';
import BondRepaymentTable from '../../components/BondRepaymentTable/BondRepaymentTable';
import ScatterPlot from '../../components/ScatterPlot';
import style from './style.sass';

const defaultDate = new Date('2017/02/17');

class Bond extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isin: props.match.params.isin,
      date: defaultDate,
      info: null,
      daily: null,
      portfolioInfo: null,
      loaded: false
    };
  }

  componentWillMount() {
    this.initBond(this.state.isin);
  }

  initBond(isin = null) {
    if(isin != null) {
      Promise.all([
        Data.getBondsInfo([isin]),
        Data.getBondsDaily([isin], defaultDate)
      ]).then((response) => {
        this.setState({
          'loaded': true,
          'info': response[0][0].data,
          'daily': response[1][0].data
        });

      });
    }
  }

  render(){

    const bond = this.state;
    const date = this.state.date;
    if(this.state.loaded){
      return (
        <div className='skybondsWrap'>
          <div className={style.bondPage_content}>
            <BondHeader
              bond={bond}
            />
            <BondGeneral
              bond={bond}
            />
            <BondBidAskTable
              bond={bond}
            />
            <BondRepaymentTable
              bond={bond}
              date={date}
            />
          </div>
        </div>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}


const mapStateToProps = state => ({ market: state.reports.market });
export default connect(mapStateToProps)(Bond);
