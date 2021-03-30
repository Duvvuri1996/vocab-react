import { axios } from 'axios';
import { ApiConstants } from '../constants/apiconstants';

const getAllWords = () => {
    return axios.get(ApiConstants.BASE_URL+ 'getAll')
}

const getWord = (wordId) => {
    return axios.post(ApiConstants.BASE_URL+ 'getVocab', {
        params : {
            wordId : wordId
        }
    })
}

const createWord = (wordId) => {
    return axios.post(ApiConstants.BASE_URL+ 'createVocab', {
        params : {
            wordId :wordId
        }
    })
}

export { getAllWords, getWord, createWord };