"use client";
import Link from "next/link";
import styles from "./HomePage.module.css";
import ProductList from "./products/ProductsList";
import { metaData } from "./metadata";
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

export default function Home() {
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
          <div>
            <Link href="#portfolio">
              <button className={styles.navigate_btn}>Портфолио</button>
            </Link>
            <Link href="#we">
              <button className={styles.navigate_btn}>Кто мы вообще</button>
            </Link>{" "}
            <Link href="#products">
              <button className={styles.navigate_btn}>Наши продукты</button>
            </Link>
          </div>
          <h1 className={styles.main_text}>
            Преобразуем ваш <br />
            бизнес в цифровую реальность
          </h1>
          <div style={{ margin: "5vw 0" }}>
            <Button label="Начать проект" onClick={handleClick} />
          </div>

          <ProductList />
        </div>
      </section>
      <section>
        <div className={styles.portfolio_block}>
          <div className={styles.container}>
            <div id="we" className={styles.portfolio_text}>
              <h2 className={styles.main_text}>
                Мы создаем <br />
                продукты для <br />
                качественного
                <br />
                <span>
                  взаимодействия <br />
                  между людьми, <br />
                  бизнесом и<br /> государством.
                </span>
              </h2>
              <div className={styles.star_logo}>
                <Image src={star} alt="" layout="responsive" />
              </div>{" "}
            </div>{" "}
          </div>
          <div id="portfolio">
            <div className={styles.container}>
              <div id="portfolio" className={styles.portfolio_card}>
                <div className={styles.portfolio_left}>
                  <h3 className={styles.second_text} style={{ color: "white" }}>
                    Portfolio
                  </h3>
                  <Button label="Apply" onClick={handleClick} />
                </div>
                <div className={styles.portfolio_right}>
                  <List />
                </div>
              </div>
            </div>{" "}
          </div>
          <div>
            <Image
              className={styles.backImage}
              src={backImage}
              alt=""
              layout="responsive"
            />
          </div>
        </div>
      </section>
      <section id="products">
        <div className={styles.container}>
          <div className={styles.platform}>
            <div className={styles.platform_top}>
              <div className={styles.platform_left}>
                <h3 className={styles.second_text}>
                  Запустили <br /> образовательную <br />
                  платформу bilim.ed,
                  <br /> которой пользуются <br />
                  половина <br />
                  университетов <br />
                  Бишкека
                </h3>
                <Button label="Узнать подробнее" onClick={handleClick} />
              </div>
              <p className={styles.platform_right}>
                Современные системы <br /> образования не соответствуют <br />
                запросам ни общества, ни рынка <br />
                труда. Они не удовлетворяют <br />
                потребности в качественном <br />
                образовании и не способствуют <br />
                всестороннему развитию <br />
                учащихся.
              </p>
            </div>
            <div className={styles.platform_iPad}>
              <div className={styles.imagesWrapper}>
                <StickyImages />
                {/* <Image className={styles.iPad} src={iPad} alt="" />
                <Image className={styles.iPad} src={iPad} alt="" />
                <Image className={styles.iPad} src={iPad} alt="" />{" "}
                <Image className={styles.iPad} src={iPad} alt="" />{" "}
                <Image className={styles.iPad} src={iPad} alt="" /> */}
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
                  Интегрируемся <br /> в процессы, <br /> поговорим с хэдами,
                  <br />
                  соберём воркшоп <br />
                  с исследователем
                </p>
              </div>
              <div className={styles.integration_right}>
                <h3>
                  Укрепим команду <br />
                  или сами <br />
                  поработаем над <br />
                  продуктом: <br />
                  ищем точки роста, <br /> закрываем задачи <br /> или запускаем
                  MVP.{" "}
                </h3>
                <p>от 100 000 сом за спринт</p>
              </div>
            </div>
          </div>
          <Image className={styles.backImage2} src={backImage2} alt="" />
        </div>
      </section>
    </main>
  );
}
export const meta2 = metaData;
