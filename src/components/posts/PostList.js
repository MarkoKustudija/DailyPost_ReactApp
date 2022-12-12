import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PostItem from "./PostItem";
import classes from './PostList.module.css';


// helper function
const sortPosts = (posts, ascending) => {
    return posts.sort((postA, postB) => {
      if (ascending) {
        return postA.id > postB.id ? 1 : -1;
      } else {
        return postA.id < postB.id ? 1 : -1;
      }
    });
  };

const PostList = (props) => {

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const isSortingDESC = queryParams.get("sort") === "desc";

  const sortedPosts = sortPosts(props.posts, isSortingDESC);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingDESC ? "asc" : "desc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}> 
        <button onClick={changeSortingHandler}>
          Sort {!isSortingDESC ? "Ascending" : "Descending"}{" "}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedPosts.map((postItem) => {
          return (
            <PostItem
              key={postItem.id}
              id={postItem.id}
              author={postItem.author}
              text={postItem.text}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};
export default PostList;
