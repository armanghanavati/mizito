import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GeneralLayout from './layout/GeneralLayout';
import './services/axios';
import PrivateLayout from './layout/PrivateLayout';
import PrivateRoutes from './routes/PrivateRoutes';
import Login from './pages/login/Login';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';

function App() {
  const { main } = useSelector((state) => state);

  return (
    <div>
      <Loading isLoading={main?.showLoading?.value ? true : false} />
      <Router>
        <Routes>
          <Route
            path="/users/*"
            element={
              <PrivateLayout>
                <PrivateRoutes />
              </PrivateLayout>
            }
          />
          {/* <Route path="/*" element={<GeneralLayout />} /> */}
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;