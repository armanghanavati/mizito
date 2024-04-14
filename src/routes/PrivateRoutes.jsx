import React from 'react';
import Bords from '../pages/boards/Bords';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import CreateModal from '../pages/create/CreateModal';

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/boards" element={<Bords />} />
        <Route path="/create" element={<CreateModal />} />
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
