import axios from "axios";

export const updateArticleVoteReq = (id, inc_votes, path) => {
  return axios
    .patch(`https://nc-news2020.herokuapp.com/api/${path}/${id}`, {
      inc_votes
    })
    .then(({ data }) => {
      return data;
    });
};

export default updateArticleVoteReq;
