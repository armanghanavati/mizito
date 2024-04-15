import React from 'react';
import Boards from '../pages/boards/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import CreateProjectModal from '../pages/create/CreateProjectModal';
import ShowProjects from '../pages/project/ShowProjects';

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/projects" element={<ShowProjects />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/create" element={<CreateProjectModal />} />
        <Route path="/home" element={<Home />} />
        {/* <Route
          path="/baseSubmitTaxReq"
          element={<BaseSubmitTaxReq keyState={key} reloadRoute={reloadRoute} pattern={pattern} />}
        />
        <Route path="/batchEntry" element={<BatchEntryPage />} /> */}
      </Routes>
    </>
  );
};

export default PrivateRoutes;
