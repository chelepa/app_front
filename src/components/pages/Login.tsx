import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import styles from './Login.module.css'

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        navigate("/");
      } else {
        alert("Não deu certo.");
      }
    }
  };

  return (
    <div className={styles.AuthFormContainer}>
      <div className={styles.AuthForm}>
        <div className={styles.AuthFormContent}>
          <h3 className={styles.AuthFormTitle}>Sign In</h3>
          <div className="form-group mt-3">
            <label>E-mail</label>
            <input
               type="text"
               className="form-control"
               id="email"
               placeholder="email@gmail.com"
               value={email}
               onChange={handleEmailInput}
             />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={handlePasswordInput}
                />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleLogin}>Submit</button>
          </div>
          <p className="forgot-password text-right mt-2">Esqueceu sua <a href="#"> Senha?</a></p>
        </div>
      </div>
    </div>
  );
};
