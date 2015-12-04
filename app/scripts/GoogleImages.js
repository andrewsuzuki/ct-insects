import axios from 'axios';

export default (query) => {
  return axios({
    method: 'get',
    // Note: this is VERY insecure (relying on random 3rd party, cors.io)
    url: 'http://api.pixplorer.co.uk/image?amount=4&word='+encodeURIComponent(query + ' insect')
  }).catch(response => {
    console.log('count not retrieve google images', response);
  });
};
