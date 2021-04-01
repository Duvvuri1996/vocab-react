import ActionConstants from '../constants/actionconstant';
import { getVocabWord, createVocabWord } from '../api/api';



export default (state =  null, action) => {
    var newState = {...state}
    if(action.type === 'ADD_WORD'){
        console.log(action.value)
        createVocabWord(action.value).then((apiResponse) => {
            if(apiResponse.data.status === 200){
                console.log(apiResponse)
                newState.values = {msg : 'Successful', word : action.value, open : false, loading: false}
            } else if(apiResponse.data.status === 404){
                newState.values = {msg : 'Please try again later', word : action.value, open : false, loading: false}
            } else if(apiResponse.data.status === 500){
                newState.values = {msg : 'Word Already exists', word : action.value, open : false, loading: false}
            }
        })
    }
    console.log(newState)
    return newState
}