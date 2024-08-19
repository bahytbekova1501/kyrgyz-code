import styles from "./Navbar.module.css";
import logo from "../../img/logo.svg";
import Image from "next/image";
import Link from "next/link";
import menu from "../../img/menu.svg";
import userImg from "../../img/user.svg";
import arrow from "../../img/user_arrow.svg";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
// import Admin from "@/app/(auth)/Admin";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { logoutAdmin } from "@/redux/slices/adminSlice";
import { RootState } from "@/redux/store";
import AdminLogin from "@/app/(auth)/AdminLogin";
import { logout } from "@/redux/authSlices/adminSlice";
const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div id="navbar" className={styles.nav_container}>
      <div className={styles.nav}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="Logo" />
        </Link>

        <div className={styles.nav_right_block}>
          <div className={styles.user_action}>
            {!isAdmin ? (
              <button className={styles.nav_auth_btn} onClick={openModal}>
                <div className={styles.nav_auth}>
                  <Image
                    className={styles.userImg}
                    src={userImg}
                    alt="User Icon"
                  />
                  <div className={styles.user_name}>
                    <p>
                      loni. <br /> markus
                    </p>
                    <Image
                      className={styles.arrow}
                      src={arrow}
                      alt="Arrow Icon"
                    />
                  </div>
                </div>
              </button>
            ) : (
              <>
                <div className={styles.nav_auth}>
                  <Image
                    className={styles.userImg}
                    src={userImg}
                    alt="User Icon"
                  />
                  <div className={styles.user_name}>
                    loni. <br /> markus
                    <Image
                      className={styles.arrow}
                      src={arrow}
                      alt="Arrow Icon"
                    />
                  </div>
                  <button onClick={handleLogout} className={styles.logout_btn}>
                    выйти
                  </button>
                </div>
              </>
            )}
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AdminLogin onClose={closeModal} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
