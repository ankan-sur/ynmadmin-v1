import reactLogo from "../assets/Logo - site.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function HomePage() {
  return (
    <div className="rounded-container text-center ">
      <img src={reactLogo} className="app-logo my-4" alt="Logo" style={{ maxWidth: '550px' }} />

      <h1 className="mb-3">Hi!</h1>

      <p className="custom-paragraph mb-4 bruhText">
        Explore the analytics dashboard tailored for your needs. <br /> Sign in to get started!

      </p>
        <a href="/sign-in" className="btn btn-dark btn-lg">
        <LoginIcon /> Sign In
        </a>

      <p className="text-muted mt-4">
        Don't have an account? <br /> <br />
        <a href="/sign-up" className="btn btn-dark btn-lg" > <AddCircleOutlineIcon /> Register here</a>
      </p>
    </div>
  );
}
