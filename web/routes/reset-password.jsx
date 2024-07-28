import { useActionForm, useAuth } from "@gadgetinc/react";
import { api } from "../api";
import { useLocation, Link } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const {
    submit,
    register,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useActionForm(api.user.resetPassword, {
    defaultValues: { code: params.get("code") },
  });
  const { configuration } = useAuth();

  return isSubmitSuccessful ? (
    <div className="app-content d-flex justify-content-center align-items-center">
      <div className="custom-form rounded-container p-4">
        <p className="format-message success">
          Password reset successfully. <Link to={configuration.signInPath}>Sign in now</Link>
        </p>
      </div>
    </div>
  ) : (
    <div className="app-content d-flex justify-content-center align-items-center vh-100">
      <form className="custom-form rounded-container p-4" onSubmit={submit}>
        <h1 className="form-title">Reset password</h1>
        <input className="custom-input" placeholder="New password" type="password" {...register("password")} />
        {errors?.user?.password?.message && <p className="format-message error">{errors?.user?.password?.message}</p>}
        <input
          className="custom-input"
          placeholder="Confirm password"
          type="password"
          {...register("confirmPassword", {
            validate: (value) => value === watch("password") || "The passwords do not match",
          })}
        />
        {errors?.confirmPassword?.message && <p className="format-message error">{errors.confirmPassword.message}</p>}
        {errors?.root?.message && <p className="format-message error">{errors.root.message}</p>}
        <button disabled={isSubmitting} type="submit" className="btn btn-dark btn-lg btn-primary w-100">
          Reset password
        </button>
      </form>
    </div>
  );
}
