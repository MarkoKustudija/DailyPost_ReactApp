import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PostForm from "../components/posts/PostForm";
import useHttp from "../hooks/use-http";
import { addPost } from "../lib/api";

const NewPost = () => {

  const {sendRequest, status} = useHttp(addPost);

  const history = useHistory();

  useEffect(()=> {
    if(status === 'completed'){
      history.push('/posts')
    }
  }, [status, history]);


  const addPostHandler = (postData) => {
    sendRequest(postData);
  }
  
  return <PostForm  isLoading={status === "pending"} onAddPost = {addPostHandler}/>;
  // return <PostForm  onAddPost = {addPostHandler}/>;
};

export default NewPost;
