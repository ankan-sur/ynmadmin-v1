import { useEffect } from 'react';
import GoogleIcon from "../assets/google.svg";
import { useActionForm, useUser } from "@gadgetinc/react";
import { api } from "../api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignInForm() {
  const navigate = useNavigate();
  const user = useUser(api);
  const {
    register,
    submit,
    formState: { errors, isSubmitting },
  } = useActionForm(api.user.signIn);
  const { search } = useLocation();

  useEffect(() => {
    if (user && user.account) {
      if (user.account === 'staff') {
        navigate('/staff-signed-in');
      }
      // Add more conditions here if needed for other account types
    }
  }, [user, navigate]);

  return (
    <div className="app-content d-flex justify-content-center align-items-center">
      <form className="custom-form rounded-container p-4 " onSubmit={submit}>
        <h1 className="form-title mb-4 text-center">Sign in</h1>
        <div className="mb-3 w-100">
          <a className="btn btn-dark border w-100 d-flex align-items-center justify-content-center mb-3" href={`/auth/google/start${search}`}>
            <img src={GoogleIcon} alt="Google" width={22} height={22} className="me-2" /> Continue with Google
          </a>
          <input className="custom-input form-control mb-2" placeholder="Email" {...register("email")} />
          <input className="custom-input form-control mb-2" placeholder="Password" type="password" {...register("password")} />
          {errors?.root?.message && <p className="format-message error text-danger">{errors.root.message}</p>}
          <button disabled={isSubmitting} type="submit" className="btn btn-dark btn-lg btn-primary w-100">
            Sign in
          </button>
          <p className="small-text"><br />
            Forgot your password?<br/> <Link to="/forgot-password" className=" btn btn-dark border " >Reset password</Link>
          </p> 
          <p className="small-text"> Don’t have an account? <br/> <Link to="/sign-up" className=" btn btn-dark border " > Register </Link>
          </p> <br />

        </div>
      </form>
    </div>
  );
}
