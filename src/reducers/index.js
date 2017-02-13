import { combineReducers } from 'redux'

import market from './market'
import user from './user'
import layers from './layers'

const rootReducer = combineReducers({
  user,
  market,
  layers,
})

export default rootReducer
