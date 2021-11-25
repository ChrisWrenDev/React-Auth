import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();
  const submitFormHandler = (event) => {
    event.prevntDefault();
    const enteredNewPassword = passwordInputRef.current.value;
    // add validation

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDARS1bh8UhB_hamcVKPM7fw8nHjXzzRQ0`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => {
      // assumption: always succeeds!
      history.replace("/");
    });
  };
  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
