import React from "react";
import { Link } from "@reach/router";
import Vote from "./Vote";

const ArticleCard = ({ allArticles }) => {
  if (allArticles) {
    return allArticles.map(article => {
      return (
        <main key={article.article_id}>
          <hr />
          <h3>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </h3>
          <h6>-By {article.author}</h6>
          <h5>
            <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
          </h5>
          <h5>Comments {article.comment_count}</h5>
          <Vote
            id={article.article_id}
            currentVote={article.votes}
            path={"articles"}
          />
          <hr />
        </main>
      );
    });
  }
};

export default ArticleCard;
