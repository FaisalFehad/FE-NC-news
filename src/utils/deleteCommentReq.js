import axios from "axios";

export const deleteCommentReq = url => {
  return axios
    .delete(`https://nc-news2020.herokuapp.com/api/${url}`)
    .then(({ data }) => {
      // returns an empty object on success and nothing when failed
      return data;
    });
};

export default deleteCommentReq;
