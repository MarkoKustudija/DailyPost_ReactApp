import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSinglePost } from "../lib/api";
import HighlightedPost from "../components/posts/HighlightedPost";
import Comments from "../components/comments/Comments";

const PostDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  console.log(match);

  const { postId } = params;

  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useHttp(getSinglePost, true);

  useEffect(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedPost.text) {
    return <p>No post found!</p>;
  }

  return (
    <Fragment>
      <HighlightedPost text={loadedPost.text} author={loadedPost.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default PostDetail;
