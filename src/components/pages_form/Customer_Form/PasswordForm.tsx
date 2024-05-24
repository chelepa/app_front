import { PasswordRequest } from "../../../types/Customer";
import { Input } from "../../form/Input";

export const PasswordForm = ({updatePassword, actionPassword, actionCheckPassword, readOnly}:{updatePassword: PasswordRequest, actionPassword: any, actionCheckPassword: any, readOnly:boolean}) => {
  return (
    <>
      <div className="col-6">
        <Input
          type="text"
          text="Password"
          name="password"
          placeholder="Digite a Senha"
          handleOnChange={actionPassword}
          value={updatePassword.password}
          customClass=""
          readOnly={readOnly}
          erros={null}
        />
      </div>
      <div className="col-6">
        <Input
          type="text"
          text="Confirm Password"
          name="password_conf"
          placeholder="Confime a Senha"
          handleOnChange={actionCheckPassword}
          value={updatePassword.checkPassword}
          customClass=""
          readOnly={readOnly}
          erros={null}
        />
      </div>
    </>
  );
};
