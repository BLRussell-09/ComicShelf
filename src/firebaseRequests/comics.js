import axios from 'axios';
import constants from '../constants';

const saveComicsbyIssue = (comicIssue) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/comicIssue.json`, comicIssue)
      .then((res) => { resolve(res); })
      .catch((err) => { reject(err); });
  });
};

const getUserIssues = (uid) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/comicIssue.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const comicIssues = [];
        if (res.data !== null)
        {
          Object.keys(res.data).forEach(fbKey =>
          {
            res.data[fbKey].firebaseId = fbKey;
            comicIssues.push(res.data[fbKey]);
          });
        }
        resolve(comicIssues);
      })
      .catch((err) => { reject(err); });
  });
};

const updateUserIssue = (issueId, updatedIssue) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/comicIssue/${issueId}.json`, updatedIssue)
      .then((res) => { resolve(res); })
      .catch((err) => { reject(err); });
  });
};

const deleteUserIssue = (firebaseId) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/comicIssue/${firebaseId}.json`)
      .then((res) => { resolve(res); })
      .catch((err) => { reject(err); });
  });
};

export default {deleteUserIssue, getUserIssues, saveComicsbyIssue, updateUserIssue};
