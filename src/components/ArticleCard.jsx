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
          <h4>
            <Link to={`/topics/${article.topic}`}>Topic {article.topic}</Link>
          </h4>
          <h4>
            <Link to={`/articles/${article.article_id}/comments`}>
              Comments {article.comment_count}
            </Link>
          </h4>
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
