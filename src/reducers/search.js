import ActionConstants from '../constants/actionconstant';

export default (state =  null, action) => {
    switch(action.type){
        case ActionConstants.SEARCH : 
        return action.payload
        default : break;
    }
    return state
}