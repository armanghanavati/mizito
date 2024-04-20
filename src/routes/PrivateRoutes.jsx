import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import ShowProjects from '../pages/project/ShowProjects';
import Create from '../pages/create/index';
import AllBoard from '../pages/boards/AllBoard';
import Board from '../pages/boards/Board';

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/projects" element={<ShowProjects />} />
        <Route path="/boards" element={<AllBoard />} />
        <Route path="/board:id" element={<Board />} />
        <Route path="/create" element={<Create />} />
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
