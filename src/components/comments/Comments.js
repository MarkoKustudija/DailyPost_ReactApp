import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = (props) => {

  const [isAddingComments, setIsAddingComments] = useState(false);
  const params = useParams();

  const { postId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(postId);
  }, [postId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComments(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered"> No comments are added yet ...</p>;
  }

  return (
    <section className={classes.comments}>
      <h2> User Comments</h2>
      {!isAddingComments && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComments && (
        <NewCommentForm 
        postId={postId}
        onAddedComment={addCommentHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
