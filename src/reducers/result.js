import ActionConstants from '../constants/actionconstant';
import { getVocabWord, createVocabWord } from '../api/api';



export default (state =  null, action) => {
    var newState = {...state}
    if(action.type === 'ADD_WORD'){
        console.log(action.value)
        // createVocabWord(action.value).then((apiResponse) => {
        //     if(apiResponse.data.status === 200){
        //         console.log(apiResponse)
        //         newState.values = 'Successful'
        //     } else if(apiResponse.data.status === 404){
        //         newState.values = 'Word Exists'
        //     } else if(apiResponse.data.status === 500){
        //         newState.values = 'Please try agan later'
        //     }
        // })
    }
    console.log(newState)
    return newState
}