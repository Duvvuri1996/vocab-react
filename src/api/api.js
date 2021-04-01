import axios from 'axios';
//import BASE_URL from '../constants/apiconstants';
const url = 'http://localhost:8080/api/v1/';
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
const getAllWords = () => {
    return axios.get(`${url}getAll`, config)
}

const getVocabWord = (wordId) => {
    return axios.get(`${url}getVocab/${wordId}`, config)
}

const createVocabWord = (wordId) => {
    return axios.post(`${url}createVocab/${wordId}`, config)
}

export { getAllWords, getVocabWord, createVocabWord };