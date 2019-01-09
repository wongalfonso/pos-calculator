import { combineReducers } from 'redux';
import PosReducer from './AppReducer';

const rootReducer = combineReducers({
  posCalc: PosReducer
});

export default rootReducer;
