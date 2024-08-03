import styles from "./Footer.module.css";
import logo from "../../img/logo_green.svg";
import arrow from "../../img/arrow_green.svg";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

const Footer: React.FC = () => {
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    event.preventDefault(); // Предотвращает стандартное поведение ссылки
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer_top}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="" />
        </Link>
        <div id="contact" className={styles.footer_right}>
          <div className={styles.right_block}>
            <Link href="/">home</Link>
            <Link href="/#we">about</Link>
            <Link href="/#portfolio">works</Link>
            <Link href="/#contact">contact us</Link>
          </div>
          <div className={styles.right_block}>
            <Link href="#">linkedin</Link>
            <Link href="#">instagram</Link>
            <Link href="#">telegram</Link>
            <Link href="#">twitter </Link>
          </div>
        </div>
      </div>

      <div className={styles.ticker}>
        <div className={styles.ticker_wrapper}>
          <div className={styles.ticker_item}>• KYRGYZ CODE</div>{" "}
          <div className={styles.ticker_item}>• KYRGYZ CODE </div>{" "}
          <div className={styles.ticker_item}>• KYRGYZ CODE </div>{" "}
          <div className={styles.ticker_item}>• KYRGYZ CODE </div>{" "}
          <div className={styles.ticker_item}>• KYRGYZ CODE </div>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <p className={styles.footer_c}>
          © 2024, Kyrgyz Code. All Rights Reserved.
        </p>

        <Link href="/#navbar" onClick={(e) => handleScroll(e, "navbar")}>
          <button className={styles.footer_up_btn}>
            up
            <Image src={arrow} alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
