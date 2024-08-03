import styles from "./Navbar.module.css";
import logo from "../../img/logo.svg";
import Image from "next/image";
import Link from "next/link";
import menu from "../../img/menu.svg";
import userImg from "../../img/user.svg";
import arrow from "../../img/user_arrow.svg";
const Navbar: React.FC = () => {
  return (
    <div id="navbar" className={styles.nav_container}>
      <div className={styles.nav}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="" />
        </Link>
        <div className={styles.nav_right_block}>
          {/* <div className={styles.nav_auth}>
            <Image className={styles.userImg} src={userImg} alt="" />
            <div className={styles.user_name}>
              <p>
                loni. <br /> markus
              </p>
              <Image className={styles.arrow} src={arrow} alt="" />
            </div>
          </div> */}
          <div className={styles.nav_menu}>
            <button className={styles.menu_btn}>
              {" "}
              <Image className={styles.menu_logo} src={menu} alt="" />
              Menu
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
