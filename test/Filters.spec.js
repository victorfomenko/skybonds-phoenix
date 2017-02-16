import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Filters from '../src/components/layers/Filters';
const filters = {
      rating: {
        values: [
          { name: 'AAA', color: '#72ceff' },
          { name: 'AA+', color: '#ef7c00' },
          { name: 'AA', color: '#ef7c00' },
          { name: 'AA-', color: '#ef7c00' },
          { name: 'A+', color: '#a800cc' },
          { name: 'A', color: '#a800cc' },
          { name: 'A-', color: '#a800cc' },
          { name: 'BBB+', color: '#00963f' },
          { name: 'BBB', color: '#00963f' },
          { name: 'BBB-', color: '#00963f' },
          { name: 'BB+', color: '#47599d' },
          { name: 'BB', color: '#47599d' },
          { name: 'BB-', color: '#47599d' },
          { name: 'B+', color: '#ff6e7e' },
          { name: 'B', color: '#ff6e7e' },
          { name: 'B-', color: '#ff6e7e' },
          { name: 'CCC+', color: '#ffd400' },
          { name: 'CCC', color: '#ffd400' },
          { name: 'CCC-', color: '#ffd400' },
          { name: 'CC', color: '#af6725' },
          { name: 'C', color: '#b04127' },
          { name: 'D', color: '#808080' },
          { name: 'NR', color: '#cbcbcb' }
        ],
        sortStrategy: function (a, b) {
          let ratings = {
            'AAA': {color: '#72ceff', group: 'AAA', synonym: 'Aaa', order: 100},
            'AA+': {color: '#ef7c00', group: 'AA', synonym: 'Aa1', order: 96},
            'AA': {color: '#ef7c00', group: 'AA', synonym: 'Aa2', order: 95},
            'AA-': {color: '#ef7c00', group: 'AA', synonym: 'Aa3', order: 94},
            'A+': {color: '#a800cc', group: 'A', synonym: 'A1', order: 91},
            'A': {color: '#a800cc', group: 'A', synonym: 'A2', order: 90},
            'A-': {color: '#a800cc', group: 'A', synonym: 'A3', order: 89},
            'BBB+': {color: '#00963f', group: 'BBB', synonym: 'Baa1', order: 86},
            'BBB': {color: '#00963f', group: 'BBB', synonym: 'Baa2', order: 85},
            'BBB-': {color: '#00963f', group: 'BBB', synonym: 'Baa3', order: 84},
            'BB+': {color: '#47599d', group: 'BB', synonym: 'Ba1', order: 81},
            'BB': {color: '#47599d', group: 'BB', synonym: 'Ba2', order: 80},
            'BB-': {color: '#47599d', group: 'BB', synonym: 'Ba3', order: 79},
            'B+': {color: '#ff6e7e', group: 'B', synonym: 'B1', order: 76},
            'B': {color: '#ff6e7e', group: 'B', synonym: 'B2', order: 75},
            'B-': {color: '#ff6e7e', group: 'B', synonym: 'B3', order: 74},
            'CCC+': {color: '#ffd400', group: 'CCC', synonym: 'Caa1', order: 71},
            'CCC': {color: '#ffd400', group: 'CCC', synonym: 'Caa2', order: 70},
            'CCC-': {color: '#ffd400', group: 'CCC', synonym: 'Caa3', order: 69},
            'CC': {color: '#af6725', group: 'CC', synonym: 'Ca', order: 65},
            'C': {color: '#b04127', group: 'C', synonym: 'C', order: 60},
            'D': {color: '#808080', group: 'D', synonym: 'D', order: 57},
            'NR': {color: '#cbcbcb', group: 'NR', synonym: 'NR', order: 55}
          };

          let getOrder = (rating)=> {
            return ratings[rating].order
          };

          let result = getOrder(a.name);
          if (result == null) {result = 0};
          let result1 = getOrder(b.name);
          if (result1 == null) {result1 = 0};
          return result1 - result;
        }
      },
    };

    function filterChangeHandle(data) {
        console.log(data)
    }

/*
describe('<Filters/>', function () {
  it('should have .uiFilters class', function () {
    const wrapper = shallow(<Filters filters={filters} filteredDataHandler={filterChangeHandle} />);
    expect(wrapper.hasClass('uiFilters')).to.equal(true);
  });
});
*/
