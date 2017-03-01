import React, { Component } from 'react';
import { connect } from 'react-redux';
import BondHeader from '../../components/BondHeader/BondHeader';
import BondGeneral from '../../components/BondGeneral/BondGeneral';
import BondBidAskTable from '../../components/BondBidAskTable/BondBidAskTable';
import BondRepaymentTable from '../../components/BondRepaymentTable/BondRepaymentTable';
import BondPeersBox from '../../components/BondPeersBox/BondPeersBox';
import ScatterPlot from '../../components/ScatterPlot';
import { getBondData } from '../../actions';
import style from './style.sass';

const defaultDate = new Date('2017/02/17');

class Bond extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    this.props.getBondData([this.props.match.params.isin], defaultDate);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loaded: true});
  }

  render(){

    const parentBond = this.props.bond.parentBond;
    const date = defaultDate;
    if(this.state.loaded){
      return (
        <div className='skybondsWrap'>
          <div className={style.bondPage_content}>
            <div className={style.bondHeader}>
              <BondHeader
                bond={parentBond}
              />
            </div>
            <div className={style.bondGeneral}>
              <BondGeneral
                bond={parentBond}
              />
              <BondPeersBox
                bond={this.props.bond}
                date={date}
              />
              <BondBidAskTable
                bond={parentBond}
              />
              <BondRepaymentTable
                bond={parentBond}
                date={date}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}


const mapStateToProps = state => ({ bond: state.bond });
export default connect(mapStateToProps, { getBondData })(Bond);
