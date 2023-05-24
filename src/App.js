import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
// css file
import "./App.scss";

// components
import LandingPage from "./pages/LandingPage/LandingPage";
import Dashboard from "./pages/Dashboard";
import DetailsPage from "./pages/DetailsPage";
import OnBoardingScreen from "./pages/OnBoardingScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PhoneVerification from "./pages/PhoneVerification";
import CreateNewPassword from "./pages/CreateNewPassword";
import ForgotPassword from "./pages/ForgotPassword";
import TokenVerification from "./pages/TokenVerification";
import SignupSuccess from "./pages/SignupSuccess";

const App = () => {
  const [email, setEmail] = React.useState(""); // we are using this to pass email from questionnaire to signup

  return (
    <BrowserRouter>
      <Routes>
        {/* put public routs here */}
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="/onboarding"
          element={<OnBoardingScreen email={email} setEmail={setEmail} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/register/check" element={<TokenVerification />} />
        <Route path="/user/password/change/" element={<TokenVerification />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />

        <Route element={<PrivateRoutes />}>
          {/* put private routs here */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application" element={<DetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
