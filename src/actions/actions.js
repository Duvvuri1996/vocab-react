import ActionConstants from '../constants/actionconstant';
import * as api from '../api/api';

const getAll = () => {
    api.getAllWords().then((apiResponse) => {
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
    api.getWord(wordId).then((apiResponse) => {
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
    api.createWord(wordId).then((apiResponse) => {
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
            payload : word
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