import React from 'react';
import Bords from '../pages/boards/Bords';
import Create from '../pages/create/Create';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/boards" element={<Bords />} />
        <Route path="/create" element={<Create />} />

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