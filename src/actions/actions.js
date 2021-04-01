import ActionConstants from '../constants/actionconstant';
import { getAllWords, getVocabWord, createVocabWord } from '../api/api';

const getAll = () => {
    getAllWords().then((apiResponse) => {
        console.log(apiResponse.data.data[0].definition)
        return (dispatch) => {
            if(apiResponse.status === 200){
                dispatch({
                    type : ActionConstants.RESULT,
                    payload : apiResponse.data
                })
            } else if(apiResponse.status === 500){
                dispatch({
                    type : ActionConstants.RESULT,
                    payload : apiResponse.data
                })
            } else if(apiResponse.status === 404){
                dispatch({
                    type : ActionConstants.RESULT,
                    payload : apiResponse.data
                })
            }
        }
    })
}

const getWord = (wordId) => {
    getVocabWord(wordId).then((apiResponse) => {
        console.log(apiResponse.data)
        return(dispatch) => {
            if(apiResponse.status === 200){
                dispatch({
                    type : ActionConstants.RESULT,
                    payload : apiResponse.data
                })
            } else if(apiResponse.status === 500){
                dispatch({
                    type : ActionConstants.RESULT,
                    payload : apiResponse.data
                })
            } else if(apiResponse.status === 404){
                dispatch({
                    type : ActionConstants.RESULT,
                    payload : apiResponse.data
                })
            }
        }
    })
}

const createWord = (wordId) => {
    createVocabWord(wordId).then((apiResponse) => {
        console.log(apiResponse)
        return(dispatch) => {
            if(apiResponse.status === 200){
                dispatch({
                    type : ActionConstants.CREATE,
                    payload : apiResponse.data
                })
            } else if(apiResponse.status === 500){
                dispatch({
                    type : ActionConstants.CREATE,
                    payload : apiResponse.data
                })
            } else if(apiResponse.status === 404){
                dispatch({
                    type : ActionConstants.CREATE,
                    payload : apiResponse.data
                })
            }
        }
    })
}

const updateSearch = (wordId) => {
    return (dispatch) => {
        dispatch({
            type : ActionConstants.SEARCH,
            payload : wordId
        })
    }
}

const resultLoading = () => {
    return (dispatch) => {
        dispatch({
            type : ActionConstants.RESULT,
            payload : false
        })
    }
}

export { getAll, getWord, createWord, updateSearch, resultLoading }