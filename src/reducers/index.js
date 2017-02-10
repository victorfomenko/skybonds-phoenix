import { combineReducers } from 'redux'

import market from './market'
import user from './user'

const rootReducer = combineReducers({
  user,
  market,
})

export default rootReducer