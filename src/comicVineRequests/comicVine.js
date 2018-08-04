import axios from 'axios';
import comics from '../firebaseRequests/comics';
import auth from '../firebaseRequests/auth';
import constants from '../constants';

const getIssues = (query) =>
{
  return new Promise ((resolve, reject) =>
  {
    axios(`${constants.marvelApiConfig.titleSearchURL}${query}&apikey=${constants.marvelApiConfig.apiKey}`)
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
              const gotComics = res.data.data.results;
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
              const gotComics = res.data.data.results;
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

const getCharacters = (characterUrl) =>
{
  return new Promise ((resolve, reject) =>
  {
    axios(`${characterUrl}?apikey=${constants.marvelApiConfig.apiKey}`)
      .then((characters) =>
      {
        resolve(characters.data.data.results);
      })
      .catch((err) => { reject(err); });
  });
};

const getCharactersbyName = (characterName) =>
{
  return new Promise ((resolve, reject) =>
  {
    axios(`${constants.marvelApiConfig.characterSearchURL}${characterName}&apikey=${constants.marvelApiConfig.apiKey}`)
      .then((characters) =>
      {
        resolve(characters.data.data.results);
      })
      .catch((err) => { reject(err); });
  });
};

const getIssuesbyCharacter = (characterURI) =>
{
  return new Promise ((resolve, reject) =>
  {
    axios(`${characterURI}?apikey=${constants.marvelApiConfig.apiKey}`)
      .then((issues) =>
      {
        resolve(issues.data.data.results);
      })
      .catch((err) => { reject(err); });
  });
};

export default {getIssues, getIssuesbyCharacter, getCharacters, getCharactersbyName};
