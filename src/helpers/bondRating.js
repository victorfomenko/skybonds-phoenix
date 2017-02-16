import { countBy } from 'lodash'

const DEFAULT_COLOR = '#999999';

const RATINGS = {
  'AAA':  { color: '#72ceff', group: 'AAA', synonym: 'Aaa',  order: 100 },
  'AA+':  { color: '#ef7c00', group: 'AA',  synonym: 'Aa1',  order: 96 },
  'AA':   { color: '#ef7c00', group: 'AA',  synonym: 'Aa2',  order: 95 },
  'AA-':  { color: '#ef7c00', group: 'AA',  synonym: 'Aa3',  order: 94 },
  'A+':   { color: '#a800cc', group: 'A',   synonym: 'A1',   order: 91 },
  'A':    { color: '#a800cc', group: 'A',   synonym: 'A2',   order: 90 },
  'A-':   { color: '#a800cc', group: 'A',   synonym: 'A3',   order: 89 },
  'BBB+': { color: '#00963f', group: 'BBB', synonym: 'Baa1', order: 86 },
  'BBB':  { color: '#00963f', group: 'BBB', synonym: 'Baa2', order: 85 },
  'BBB-': { color: '#00963f', group: 'BBB', synonym: 'Baa3', order: 84 },
  'BB+':  { color: '#47599d', group: 'BB',  synonym: 'Ba1',  order: 81 },
  'BB':   { color: '#47599d', group: 'BB',  synonym: 'Ba2',  order: 80 },
  'BB-':  { color: '#47599d', group: 'BB',  synonym: 'Ba3',  order: 79 },
  'B+':   { color: '#ff6e7e', group: 'B',   synonym: 'B1',   order: 76 },
  'B':    { color: '#ff6e7e', group: 'B',   synonym: 'B2',   order: 75 },
  'B-':   { color: '#ff6e7e', group: 'B',   synonym: 'B3',   order: 74 },
  'CCC+': { color: '#ffd400', group: 'CCC', synonym: 'Caa1', order: 71 },
  'CCC':  { color: '#ffd400', group: 'CCC', synonym: 'Caa2', order: 70 },
  'CCC-': { color: '#ffd400', group: 'CCC', synonym: 'Caa3', order: 69 },
  'CC':   { color: '#af6725', group: 'CC',  synonym: 'Ca',   order: 65 },
  'C':    { color: '#b04127', group: 'C',   synonym: 'C',    order: 60 },
  'D':    { color: '#808080', group: 'D',   synonym: 'D',    order: 57 },
  'NR':   { color: '#cbcbcb', group: 'NR',  synonym: 'NR',   order: 55 }
};

const CLOSE_RATINGS = {
  'AAA':  ['AAA', 'AA+'],
  'AA+':  ['AAA', 'AA+', 'AA'],
  'AA':   ['AA+', 'AA', 'AA-'],
  'AA-':  ['AA', 'AA-', 'A+'],
  'A+':   ['AA-', 'A+', 'A'],
  'A':    ['A+', 'A', 'A-'],
  'A-':   ['A', 'A-', 'BBB+'],
  'BBB+': ['A-', 'BBB+', 'BBB'],
  'BBB':  ['BBB+', 'BBB', 'BBB-'],
  'BBB-': ['BBB', 'BBB-', 'BB+'],
  'BB+':  ['BBB-', 'BB+', 'BB'],
  'BB':   ['BB+', 'BB', 'BB-'],
  'BB-':  ['BB', 'BB-', 'B+'],
  'B+':   ['BB-', 'B+', 'B'],
  'B':    ['B+', 'B', 'B-'],
  'B-':   ['B', 'B-', 'CCC+'],
  'CCC+': ['B-', 'CCC+', 'CCC'],
  'CCC':  ['CCC+', 'CCC', 'CCC-'],
  'CCC-': ['CCC', 'CCC-', 'CC'],
  'CC':   ['CCC-', 'CC', 'C'],
  'C':    ['CC', 'C', 'D'],
  'D':    ['C', 'D'],
  'NR':   ['NR']
};

export const getColor = (rating) => {
  return rating != null ? RATINGS[rating].color : DEFAULT_COLOR;
};

export const getSynonym = (rating) => {
  return rating != null ? RATINGS[rating].synonym : null;
};

export const getGroup = (rating) => {
  return rating != null ? RATINGS[rating].group : null;
};

export const getGroupsCount = () => {
  return countBy(RATINGS, 'group');
};

export const getSameGroupRatings = (rating) => {
  let result = [];
  if(rating != null) {
    const group = getGroup(rating);
    for([key, value] of RATINGS) {
      if(value.group == group) {
        result.push(key);
      }
    }
  }
  return result;
};

export const getCloseRatings = (rating) => {
  return rating != null ? CLOSE_RATINGS[rating] : [];
};

export const getOrder = (rating) => {
  return rating != null ? RATINGS[rating].order : null;
};

export const sortByOrder = (ratings = []) => {
  return ratings.sort((up, down) => {
    return getOrder(down) - getOrder(up);
  });
};
