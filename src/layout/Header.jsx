import { Col, Form, Row } from 'react-bootstrap';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';

const Header = () => {
  useForm();

  return (
    <header className=" ">
      <Row className="justify-content-start bgDarkPrimary p-4">
        <Col md="4" className="d-flex justify-content-start align-items-center">
          <div className="me-4 d-flex">
            <i className="text-white bi bi-person font25" />
            <span className=" p-2 rounded-2 text-white">مهرداد امیری</span>
          </div>
          {/* <div className="me-4 text-white">
            <Input className="" />
          </div> */}
        </Col>
      </Row>
    </header>
  );
};

export default Header;
