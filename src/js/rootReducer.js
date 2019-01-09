import { combineReducers } from 'redux';
import PosReducer from './components/HomePage/Projects/PosCalc/PosCalcReducer';

const rootReducer = combineReducers({
  posCalc: PosReducer
});

export default rootReducer;
