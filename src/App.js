import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AllPosts from "./pages/AllPosts";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";
import Layout from "./components/layout/Layout";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import AuthPage from "./pages/AuthPage";
// import Comments from "./components/comments/Comments";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/posts" />
        </Route>

          <Route path="/posts" exact>
            <AllPosts />
          </Route>

          {/* <Route path="/comments" exact>
            <Comments />
          </Route> */}

          {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
                
          <Route path="/posts/:postId">
            {authCtx.isLoggedIn && <PostDetail /> }
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
      

        <Route path="/new-post">
          {authCtx.isLoggedIn && <NewPost />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
