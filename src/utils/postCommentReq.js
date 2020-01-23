import axios from "axios";

export const postComment = (article_id, body) => {
  console.log(article_id, "<<<<<<<<<id");
  console.log(body, "<<<<<<<<< Body");

  return axios
    .post(
      `https://nc-news2020.herokuapp.com/api/articles/${article_id}/comments`,
      {
        username: "cooljmessy",
        body
      }
    )
    .then(({ data: comment }) => {
      return comment;
    });
};

export default postComment;
