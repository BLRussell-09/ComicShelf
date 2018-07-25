import axios from 'axios';
import comics from '../firebaseRequests/comics';
import auth from '../firebaseRequests/auth';
import constants from '../constants';

const getIssues = (query) =>
{
  return new Promise ((resolve, reject) =>
  {
    axios(`${constants.comicVineConfig.databaseURL}%22${query}%22`)
      .then((res) =>
      {
        comics
          .getUserIssues(auth.getUid())
          .then((myIssues) =>
          {
            const comics = [];
            if (myIssues.length !== 0)
            {
              const comicIds = [];
              const gotComics = res.data.results;
              myIssues.map((issue) =>
              {
                return comicIds.push(issue.id);
              });
              gotComics.forEach(comicIssue =>
              {
                if (!comicIds.includes(comicIssue.id))
                {
                  comicIssue.isOwned = false;
                  comics.push(comicIssue);
                }
                else
                {
                  comicIssue.isOwned = true;
                  comics.push(comicIssue);
                }
              });
              resolve(comics);
            }
            else
            {
              const gotComics = res.data.results;
              gotComics.forEach(comicIssue =>
              {
                comicIssue.isOwned = false;
                comics.push(comicIssue);
              });
              resolve(comics);
            };
          });
      })
      .catch((err) =>
      {
        reject(err);
      });
  });
};

export default {getIssues};
