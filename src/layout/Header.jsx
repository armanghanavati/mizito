import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import BurgerMenu from '../assets/Icons/BurgerMenu';
import BurgerMenu2 from '../assets/Icons/BurgerMenu2';

const Header = ({ setIsOpen, isOpen }) => {
  useForm();
  const { main } = useSelector((state) => state);

  return (
    <header>
      <div className="d-flex justify-content-between bgDarkPrimary p-4">
        <span
          // aria-controls="example-collapse-text"
          // aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <BurgerMenu2 />
        </span>
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
