import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../Initializers/firebaseConfig";
import "./login.css";

export default function Login() {
  const signIn = (() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider);
  });

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Uniconect</h3>
          <span className="loginDesc">
            Conecta con Estudiantes y sus Proyectos.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <button className="loginButton"
            onClick={() => signIn()}>Log In With Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}
