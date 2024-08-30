"use client";
import Link from "next/link";
import styles from "./HomePage.module.css";
import ProductList from "./products/(products)/ProductsList";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import star from "../img/star.svg";
import backImage from "../img/backImage.png";
import iPad from "../img/iPad - Home Screen - Light.png";
import backImage2 from "../img/bg2.png";
import photo1 from "../img/photo1.svg";
import photo2 from "../img/photo2.svg";
import photo3 from "../img/photo3.svg";
import { useEffect, useRef } from "react";
import StickyImages from "@/components/StickyImages/StickyImages";
import List from "@/components/List";
import PortfolioList from "./products/(portfolio)/PortfolioList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import PortfolioProductList from "./products/(portfolioProducts)/PortfolioProductsList";
export default function Home() {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const handleClick = () => {
    alert("Button clicked!");
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerHeight = container.clientHeight;
        const scrollY = window.scrollY;
        const viewHeight = window.innerHeight;

        // Проверка, достигнут ли конец контейнера
        if (scrollY + viewHeight > container.offsetTop + containerHeight) {
          // Достигнут конец контейнера
          container.style.position = "static"; // Устанавливаем позицию как static
        } else {
          // В пределах контейнера
          container.style.position = "sticky";
          container.style.top = "0"; // Устанавливаем top в 0
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <section id="section1" className={styles.main}>
        <div className={styles.container}>
          <div className={styles.navigate_container}>
            <Link href="#portfolio">
              <button className={styles.navigate_btn}>Работы</button>
            </Link>
            <Link href="#we">
              <button className={styles.navigate_btn}>Кто мы</button>
            </Link>{" "}
            <Link href="#products">
              <button className={styles.navigate_btn}>Продукты</button>
            </Link>
          </div>
          <h1 className={styles.main_text}>
            Преобразуем ваш бизнес в цифровую реальность
          </h1>
          <div style={{ margin: "5vw 0" }}>
            <a
              href="https://t.me/Markus_Loni"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button label="Начать проект" />
            </a>
          </div>

          <ProductList />
          {isAdmin && (
            <div style={{ margin: "20px 0 0 0" }}>
              <Link href="/products/addProduct">
                <Button label="добавить" color="black" />
              </Link>
            </div>
          )}
        </div>
      </section>
      <section>
        <div className={styles.portfolio}>
          <div className={styles.portfolio_block}>
            <div className={styles.container}>
              <div id="we" className={styles.portfolio_text}>
                <h2 className={styles.main_text_2}>
                  Мы разрабатываем
                  <br /> решения для
                  <br /> эффективного
                  <br />
                  <span>
                    взаимодействия <br />
                    между людьми, <br />
                    бизнесом и<br /> государством.
                  </span>
                  <div className={styles.star_logo}>
                    <Image src={star} alt="" fill />
                  </div>{" "}
                </h2>
              </div>{" "}
            </div>
            <div id="portfolio">
              <div className={styles.container}>
                <div id="portfolio" className={styles.portfolio_card}>
                  <div className={styles.portfolio_left}>
                    <h3
                      className={styles.second_text}
                      style={{ color: "white" }}
                    >
                      Portfolio
                    </h3>
                    {/* <Button label="Apply" onClick={handleClick} /> */}
                  </div>
                  <div className={styles.portfolio_right}>
                    {/* <PortfolioProductList /> */}
                    {/* <List /> */}
                    <PortfolioList />
                  </div>
                </div>
              </div>{" "}
            </div>

            <Image
              className={styles.backImage}
              src={backImage}
              alt=""
              // layout="responsive"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {isAdmin ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0 0 0",
              }}
            >
              <Link
                href="/products/addPortfolio"
                style={{
                  width: "94%",
                }}
              >
                <Button label="добавить" color="black" />
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
      <section id="products">
        <div className={styles.container}>
          <div className={styles.platform}>
            <div className={styles.platform_top}>
              <div className={styles.platform_left}>
                <h3 className={styles.second_text_2}>
                  В разработке большая образовательная платформа для всех
                  учреждений
                </h3>{" "}
                <a
                  href="https://t.me/Markus_Loni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    label="Скоро"
                    // onClick={handleClick}
                    color="#838383"
                  />
                </a>
              </div>
              <p className={styles.platform_right}>
                Современные системы образования не соответствуют запросам ни
                общества, ни рынка труда. Они не удовлетворяют потребности в
                качественном образовании и не способствуют всестороннему
                развитию учащихся.
              </p>
            </div>

            <div className={styles.platform_iPad}>
              <div className={styles.imagesWrapper}>
                <StickyImages />
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
      <section id="section4">
        <div className={styles.integration}>
          <div className={styles.container}>
            <div className={styles.integration_content}>
              <div className={styles.integration_left}>
                <div className={styles.team}>
                  <Image className={styles.team_photo} src={photo1} alt="" />
                  <Image className={styles.team_photo} src={photo2} alt="" />
                  <Image className={styles.team_photo} src={photo3} alt="" />
                </div>
                <p>
                  Интегрируемся в процессы, поговорим с хэдами, соберём воркшоп
                  с исследователем
                </p>
              </div>
              <div className={styles.integration_right}>
                <h3>
                  Укрепим команду <br />
                  или сами <br />
                  поработаем над продуктом: <br />
                  ищем точки роста, закрываем задачи или запускаем MVP.{" "}
                </h3>
                <p className={styles.price}>от 100 000 сом за спринт</p>
              </div>
            </div>
          </div>
          <Image
            className={styles.backImage2}
            src={backImage2}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    </main>
  );
}
