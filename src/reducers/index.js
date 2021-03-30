import { combineReducers } from 'redux';
import resultReducer from './result';
import searchReducer from './search';
import createReducer from './create';

const reducers = combineReducers({
    result : resultReducer,
    search : searchReducer,
    create : createReducer
})

export default reducers