import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./PostForm.module.css";

const PostForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  const submitFormHandler = (event) => {
    console.log("submitFormHandler() called");

    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddPost({ author: enteredAuthor, text: enteredText });
  };

  const formFocusHandler = () => {
    console.log("Focus!");
    setIsEntering(true);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  let message =
    "Are you shure you want to leave the form? All your data will be lost!!!";

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location) => message} />
      <Card>
        <form
          className={classes.form}
          onFocus={formFocusHandler}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <input
              type="text"
              id="author"
              ref={authorInputRef}
              placeholder="Author"
            />
          </div>
          <div className={classes.control}>
            <textarea
              id="text"
              rows="5"
              ref={textInputRef}
              placeholder="Text"
            />
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Post
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default PostForm;
