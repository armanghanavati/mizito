import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from '../pages/404/PageNotFound';
import ChangeProfile from '../components/changeProfile/ChangeProfile';

const GeneralRoutes = () => {
  const [updateSignUp, setUpdateSignUp] = useState({});

  return (
    <>
      <Routes>
        <Route path="/logIn" element={<LogInForm />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/questions" element={<Questions />} />
        <Route
          path="/updateProfile"
          element={<ChangeProfile updateSignUp={updateSignUp} setUpdateSignUp={setUpdateSignUp} />}
        />
      </Routes>
    </>
  );
};

export default GeneralRoutes;
