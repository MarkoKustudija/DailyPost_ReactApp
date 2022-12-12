import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // history.replace('/');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}> The Post of the Day </div>
      <nav className={classes.nav}>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/posts" activeClassName={classes.active}>
                Posts
              </NavLink>
            </li>
          )}
          {/* {!isLoggedIn && (
            <li>
              <NavLink to="/comments" activeClassName={classes.active}>
                Comments
              </NavLink>
            </li>
          )} */}
          
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink to="/new-post" activeClassName={classes.active}>
                New Post
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink to="/posts" activeClassName={classes.active}>
                Back to Posts
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className={classes.button} onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
