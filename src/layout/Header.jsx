import { useSelector } from 'react-redux';
import BurgerMenu2 from '../assets/Icons/BurgerMenu2';

const Header = ({ setIsOpen, isOpen }) => {
  const { main } = useSelector((state) => state);

  return (
    <header className="d-flex shadow  fixed_Header">
      <div className="d-flex vw-100 justify-content-between  bgDarkPrimary p-4">
        <BurgerMenu2 setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className="me-4 ">
          <span className="p-2 rounded-2 text-white"> {main?.userRole?.fullName} </span>
          <i className="text-white bi bi-person font25" />
        </div>
      </div>
    </header>
  );
};

export default Header;