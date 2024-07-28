import reactLogo from "../assets/Logo - site.png";
import 'bootstrap/dist/css/bootstrap.min.css';

export default NotAuth = () => {
  return (
    <div className="app-content d-flex justify-content-center align-items-center">
      <div className="rounded-container p-4" style={{ textAlign: 'center' }}>
        <h1>Uhhuh, You Cant Do That Honey!</h1>
        <p style={{ fontSize: '1.5rem', marginTop: '20px', color: '#FFFFFF' }}>
          Seems like you've wandered off into uncharted territory. Let's get you back on track.
        </p>
        <a href="/signed-in" className="custom-button btn btn-dark btn-lg" style={{ marginTop: '30px' }}>
          Go Back Home
        </a>
      </div>
    </div>
  );
};

;
