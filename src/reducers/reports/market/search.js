import { actionTypes as types } from '../../../constants'


const initialState = {
  query: 'asd'
};

const search = (state = initialState, action) => {
  switch (action.type) {

    case types.SEARCH_BOND:
      return state;

    default:
      return state
  }
};

export default search
