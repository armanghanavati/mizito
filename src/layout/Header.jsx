import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Header = () => {
  useForm();
  const { main } = useSelector((state) => state);

  return (
    <header className=" ">
      <div className="d-flex justify-content-end bgDarkPrimary p-4">
        <div className="me-4 ">
          <span className=" p-2 rounded-2 text-white"> {main?.userRole?.fullName} </span>
          <i className="text-white bi bi-person font25" />
        </div>
        {/* <div className="me-4 text-white">
            <Input className="" />
          </div> */}
      </div>
    </header>
  );
};

export default Header;