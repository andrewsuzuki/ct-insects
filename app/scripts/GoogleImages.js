import axios from 'axios';

export default (query) => {
  return axios({
    method: 'get',
    // Note: this is VERY insecure (relying on random 3rd party, cors.io)
    url: 'http://cors.io/?u='+encodeURIComponent('http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + encodeURIComponent(query))
  }).catch(response => {
    console.log('count not retrieve google images', response);
  });
};
