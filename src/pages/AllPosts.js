import { useEffect } from "react";
import PostList from "../components/posts/PostList";
import useHttp from "../hooks/use-http";
import { getAllPosts } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPostsFound from "../components/posts/NoPostsFound";

// const DUMMY_POSTS = [
//   { id: "q1", author: "Marko", text: "Learning React is fun!" },
//   { id: "q2", author: "Ana", text: "Learning React is great!" },
//   { id: "q3", author: "Mina", text: "Learning Angular is better!" },
// ];

const AllPosts = () => {
  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getAllPosts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedPosts || loadedPosts.length === 0)) {
    return <NoPostsFound />;
  }

  return (
    <PostList posts={loadedPosts} /> // DUMMY_POSTS
  );
};

export default AllPosts;
