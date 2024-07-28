import { SignedInOrRedirect, SignedOut, SignedOutOrRedirect, Provider, useSignOut, SignedIn, useUser } from "@gadgetinc/react";
import { Suspense, useEffect } from "react";
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate, Link, useLocation } from "react-router-dom";
import reactLogo from "./assets/Logo - site.png";
import "./App.css";
import { api } from "./api";

import Index from "./routes/index"; // 
import SignedInPage from "./routes/signed-in"; // Dashboard Page
import SignInPage from "./routes/sign-in"; // Sign In Page
import SignUpPage from "./routes/sign-up"; // Sign Up Page
import StaffSignedIn from "./routes/staff-signed-in"; // Staff Dashboard Page
import ResetPasswordPage from "./routes/reset-password"; // Reset Password Page
import VerifyEmailPage from "./routes/verify-email"; // Verify Email Page
import ErrorBoundary from './routes/error-boundary'; // Error Boundary Page
import ChangePassword from "./routes/change-password"; // Change Password Page
import ForgotPassword from "./routes/forgot-password"; // Forgot Password Page
import UserSettings from "./routes/change-key" // User Settings Page
import ProductForm from "./routes/product-form"; // Product Form
import ProductList from "./routes/submitted-products"; // Product List

import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login'; // Importing the login icon for sign in
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout'; 
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Icon for staff
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const App = () => {
  useEffect(() => {
    document.title = `Home - ${process.env.GADGET_PUBLIC_APP_SLUG} - Gadget`;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <SignedOutOrRedirect>
              <Index />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="signed-in"
          element={
            <SignedInOrRedirect>
              <SignedInPage />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="change-password"
          element={
            <SignedInOrRedirect>
              <ChangePassword />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="forgot-password"
          element={
            <SignedOutOrRedirect>
              <ForgotPassword />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-in"
          element={
            <SignedOutOrRedirect>
              <SignInPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-up"
          element={
            <SignedOutOrRedirect>
              <SignUpPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="reset-password"
          element={
            <ResetPasswordPage />
          }
        />
        <Route
          path="verify-email"
          element={
            <VerifyEmailPage />
          }
        />
        <Route
          path="staff-signed-in"
          element={
            <SignedInOrRedirect>
              <StaffSignedIn />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="change-key"
          element={
            <SignedInOrRedirect>
              <UserSettings />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="product-form"
          element={
            <SignedInOrRedirect>
              <ProductForm />
            </SignedInOrRedirect>
          }
        />

      <Route
        path="submitted-products"
        element={
          <SignedInOrRedirect>
            <ProductList />
          </SignedInOrRedirect>
        }
      />
    </Route>
    )
  );

  return (
      <Suspense fallback={<></>}>
        <RouterProvider router={router} />
      </Suspense>
  );
};

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Provider api={api} navigate={navigate} auth={window.gadgetConfig.authentication}>
      <Header />
      <div className="app">
        <div className="app-content">
          <div className="main">
            <Outlet />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export function Header() {
  const navigate = useNavigate();
  const user = useUser();
  const signOut = useSignOut();
  const { pathname } = useLocation();
  const handleNavigate = (path) => {
    navigate(path);
  };

    return (
    <div className="header">
      <a href="/" target="_self" rel="noreferrer" style={{ textDecoration: "none" }}>
        <img src={reactLogo} className="app-logo my-4" alt="Logo" style={{ height: '4rem' }} />
      </a>
      <div className="header-content">
        <SignedOut>
          <button className="s-button icon2" onClick={() => handleNavigate('/sign-in')}>
            1<LoginIcon />
          </button>
          <button className="s-button icon2" onClick={() => handleNavigate('/sign-up')}>
            <AddCircleOutlineIcon />
          </button>
        </SignedOut>
        <SignedIn>
          {user && user.account === 'staff' && (
            <>
            <button className="s-button icon2" onClick={() => handleNavigate(pathname === '/staff-signed-in' ? '/signed-in' : '/staff-signed-in')}>
              {pathname === '/staff-signed-in' ? <HomeIcon /> : <AdminPanelSettingsIcon />}
            </button>

            <button className="s-button icon2" onClick={() => handleNavigate(pathname === '/submitted-products' ? '/signed-in' :'/submitted-products')}>
              {pathname === '/submitted-products' ? <HomeIcon /> : <AssignmentIcon />}
            </button>

            </>
          )}
          <button className="s-button icon2" onClick={() => handleNavigate(pathname === '/product-form' ? '/signed-in' : '/product-form')}>
            {pathname === '/product-form' ? <HomeIcon /> : <PlaylistAddIcon />}
          </button>
          <button className="s-button icon2" onClick={() => handleNavigate('/change-key')}>
            <SettingsIcon />
          </button>
          <button className="s-button icon2" onClick={signOut}>
            <LogoutIcon />
          </button>
        </SignedIn>
      </div>
    </div>
  );
};

export default App;