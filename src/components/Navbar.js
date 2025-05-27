import { FaBell, FaUserAlt } from 'react-icons/fa';
import styles from '../styles/Navbar.module.css';
import {destroyCookie} from "nookies";
import { BsGrid3X3GapFill } from "react-icons/bs";

const Navbar = ({showSidebar}) => {
    
  return (
      <div className={`${styles.navbar} ${showSidebar ? styles.expanded : ''}`}>
          <ul className={styles.navbarList}>
              <li className={styles.navbarItem}>
                  <FaBell size={15} /* onClick={handleNavigate} */ />
              </li>
              <li className={styles.navbarItem}>
                  <BsGrid3X3GapFill/>
              </li>
              <li className={styles.navbarItem1} /* onClick={handleProfileClick} */>
                  <FaUserAlt size={25} onClick={() => {destroyCookie(undefined,"token1");destroyCookie(undefined,"token2")}}/>
              </li>
          </ul>
          {/* {showModal && <ProfileModal onClose={handleCloseModal} />} */}
      </div>
   );
};

export default Navbar;