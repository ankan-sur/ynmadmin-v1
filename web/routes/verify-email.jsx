import { api } from "../api";
import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAction, useAuth } from "@gadgetinc/react";

export default function VerifyEmail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const [{ error: verifyEmailError, data }, verifyEmail] = useAction(api.user.verifyEmail);
  const verificationAttempted = useRef(false);
  const { configuration } = useAuth();

  useEffect(() => {
    if (!verificationAttempted.current) {
      code && verifyEmail({ code });
      verificationAttempted.current = true;
    }
  }, [code, verifyEmail]);

  return (
    <div className="app-content d-flex justify-content-center align-items-center">
      <div className="custom-form rounded-container p-4">
        {verifyEmailError ? (
          <p className="format-message error">{verifyEmailError.message}</p>
        ) : data ? (
          <p className="format-message success">
              Email has been verified successfully. <br /> <br /><Link className ="p btn btn-dark" to={configuration.signInPath}>Sign in now</Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
