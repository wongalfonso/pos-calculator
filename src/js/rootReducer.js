import { combineReducers } from 'redux';
import PosReducer from './App/AppReducer';

const rootReducer = combineReducers({
  posCalc: PosReducer
});

export default rootReducer;
