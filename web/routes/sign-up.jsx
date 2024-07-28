import React, { useState, useEffect } from 'react';
import { InvalidRecordError } from "@gadget-client/ynmadmin";
import GoogleIcon from "../assets/google.svg";
import { useActionForm } from "@gadgetinc/react";
import { api } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp() {
  const [formValid, setFormValid] = useState();
  const { register,setValue, submit, formState: { errors, isSubmitSuccessful, isSubmitting } } = useActionForm(api.user.signUp);
  const { search } = useLocation();
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState([]);
  const [password, setPassword] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
  // Regex for password validation: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character (any non-alphanumeric character)
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/.test(password);
};

const onTeamChange = (selectedTeam) => {
  let updatedTeam;
  if (team.includes(selectedTeam)) {
    updatedTeam = team.filter((t) => t !== selectedTeam);
  } else {
    updatedTeam = [...team, selectedTeam];
  }
  setTeam(updatedTeam);
  // Update the form state for the 'team' field
  setValue('team', updatedTeam);
};

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

useEffect(() => {
  setValue('team', team, { shouldValidate: true });
  setFormValid(validateEmail(email) && validatePassword(password));
  
  if (isSubmitSuccessful) {
    setFeedbackMessage('Please check your inbox to confirm your email!');
  } else if (errors?.email?.message === 'is not unique') {
    setErrorMessage('This email is already in use. Please use a different email or sign in.');
  }
  
  // Additional error handling can be added here if needed
}, [email, password, isSubmitSuccessful, navigate, errors,team, setValue]);

  
  return (
    <div className="app-content d-flex justify-content-center align-items-center">

      <form className="custom-form rounded-container p-4" noValidate onSubmit={(e) => {e.preventDefault();
                        submit();}}>

        <h1 className="form-title mb-4 text-center">Create account</h1>

        <div className="mb-3 w-100">

          <a className="btn btn-dark border w-100 d-flex align-items-center justify-content-center mb-3" href={`/auth/google/start${search}`}>
            <img src={GoogleIcon} alt="Google" width={22} height={22} className="me-2" /> Continue with Google
          </a>  
          <input className={`form-control mb-2 ${validateEmail(email) ? 'is-valid' : 'is-invalid'}`} placeholder="Email" {...register("email", { required: true })} onChange={onEmailChange} />
          <div className="invalid-feedback p-2 m-2">Please enter a valid email.</div>

          <input className={`form-control mb-2 ${validatePassword(password) ? 'is-valid' : 'is-invalid'}`} placeholder="Password" type="password" {...register("password", { required: true })} onChange={onPasswordChange} />
          <div className="invalid-feedback p-2 m-2">Password must be at least 8 characters long, include a capital letter, a number, and a special character.</div>

          <button disabled={isSubmitting || !formValid} type="submit" className="btn btn-dark btn-lg btn-primary w-100">
            Sign up
          </button>

          {errorMessage && <div className="alert alert-danger mt-3" role="alert">{errorMessage}</div>}

          {feedbackMessage && <div className="alert alert-success mt-3" role="alert"><strong>Success!</strong> {feedbackMessage}</div>}
          
        </div>
      </form>
    </div>
  );
}
