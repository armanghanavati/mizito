import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import BurgerMenu from '../assets/Icons/BurgerMenu';
import BurgerMenu2 from '../assets/Icons/BurgerMenu2';

const Header = ({ setIsOpen, isOpen }) => {
  const { main } = useSelector((state) => state);

  return (
    <header className="position-fixed">
      <div className="d-flex justify-content-between vw-100 fixed_Header bgDarkPrimary p-4">
        <BurgerMenu2 setIsOpen={setIsOpen} isOpen={isOpen} />
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
