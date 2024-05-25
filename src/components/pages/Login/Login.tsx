import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import styles from './Login.module.css'
import { Input } from "../../form/Input";
import { SubmitButton } from '../../form/SubmitButton';

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
            <Input
              type="text"
              text="E-mail"
              name="name"
              placeholder="Digite seu email"
              handleOnChange={handleEmailInput}
              value={email}
              customClass=""
              readOnly={false}
              erros=""
            />
          </div>
          <div className="form-group mt-3">
            <Input
              type="password"
              text="Password"
              name="name"
              placeholder="Digite sua senha"
              handleOnChange={handlePasswordInput}
              value={password}
              customClass=""
              readOnly={false}
              erros=""
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <SubmitButton text="Submit" handleOnChange={handleLogin} customClass="" customClassButton="" enable={false}/>
          </div>
          <p className="forgot-password text-right mt-2">
            Esqueceu sua <a href="#"> Senha?</a>
          </p>
        </div>
      </div>
    </div>
  );
};
