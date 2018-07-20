import axios from 'axios';
import constants from '../constants';

const getIssues = (query) =>
{
  return new Promise ((resolve, reject) =>
  {
    axios(`${constants.comicVineConfig.databaseURL}%22${query}%22`)
      .then((res) =>
      {
        const comics = [];
        comics.push(res.data.results);
        resolve(comics);
      })
      .catch((err) =>
      {
        reject(err);
      });
  });
};

export default {getIssues};
