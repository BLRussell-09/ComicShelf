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
            res.data.results.forEach(issue =>
            {
              myIssues.forEach(myIssue =>
              {
                while (issue.id === myIssue.id)
                {
                  if (issue.id === myIssue.id)
                  {
                    issue.isOwned = true;
                    console.error(issue);
                    comics.push(res.data.results);
                    break;
                  }
                }
              });
            });
            resolve(comics);
          });
      })
      .catch((err) =>
      {
        reject(err);
      });
  });
};

export default {getIssues};
