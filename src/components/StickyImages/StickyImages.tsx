// components/StickyImages.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./StickyImages.module.css";
import iPad from "../../img/iPad - Home Screen - Light.png";
import Image from "next/image";

// import { Scrollbars } from "react-scrollbars-custom";
const StickyImages: React.FC = () => {
  //   const containerRef = useRef<HTMLDivElement>(null);

  //   const handleWheel = (event: WheelEvent) => {
  //     if (containerRef.current) {
  //       containerRef.current.scrollLeft += event.deltaY;
  //       event.preventDefault(); // Предотвращает стандартное вертикальное прокручивание
  //     }
  //   };

  //   useEffect(() => {
  //     const container = containerRef.current;
  //     if (container) {
  //       container.addEventListener("wheel", handleWheel);
  //     }
  //     return () => {
  //       if (container) {
  //         container.removeEventListener("wheel", handleWheel);
  //       }
  //     };
  //   }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHorizontalScroll, setIsHorizontalScroll] = useState(true);

  const updateScrollState = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Устанавливаем состояние прокрутки на горизонтальное, если не достигнут край контейнера
      setIsHorizontalScroll(
        scrollLeft > 0 && scrollLeft < scrollWidth - clientWidth
      );
    }
  };

  const handleWheel = (event: WheelEvent) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const delta = event.deltaY;

      if (isHorizontalScroll) {
        if (delta > 0) {
          // Прокрутка вправо
          if (scrollLeft + delta >= scrollWidth - clientWidth) {
            container.scrollLeft = scrollWidth - clientWidth; // Достигнут конец
            setIsHorizontalScroll(false); // Переключаемся на вертикальную прокрутку
          } else {
            container.scrollLeft += delta;
            event.preventDefault(); // Блокируем вертикальное прокручивание
          }
        } else {
          // Прокрутка влево
          if (scrollLeft + delta <= 0) {
            container.scrollLeft = 0; // Достигнуто начало
            setIsHorizontalScroll(false); // Переключаемся на вертикальную прокрутку
          } else {
            container.scrollLeft += delta;
            event.preventDefault(); // Блокируем вертикальное прокручивание
          }
        }
      }
    }
  };

  useEffect(() => {
    const handlePageScroll = (event: WheelEvent) => {
      if (!isHorizontalScroll) {
        // Разрешаем вертикальную прокрутку, если горизонтальная блокирована
        return;
      }
      event.preventDefault(); // Блокируем вертикальную прокрутку, пока активна горизонтальная
    };

    window.addEventListener("wheel", handlePageScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handlePageScroll);
    };
  }, [isHorizontalScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      // Обновляем состояние прокрутки при изменении размеров контейнера
      const resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(container);
      return () => {
        container.removeEventListener("wheel", handleWheel);
        resizeObserver.disconnect();
      };
    }
  }, []);

  //   const containerRef = useRef<HTMLDivElement>(null);
  //   const [isHorizontalScroll, setIsHorizontalScroll] = useState(true);
  //   const [scrollLocked, setScrollLocked] = useState(false);

  //   const handleWheel = (event: WheelEvent) => {
  //     if (containerRef.current) {
  //       const container = containerRef.current;
  //       const { scrollLeft, scrollWidth, clientWidth } = container;
  //       const delta = event.deltaY;

  //       if (isHorizontalScroll) {
  //         if (delta > 0) {
  //           // Прокрутка вниз
  //           if (scrollLeft + delta >= scrollWidth - clientWidth) {
  //             container.scrollLeft = scrollWidth - clientWidth; // Достигнут конец
  //             setIsHorizontalScroll(false); // Переключаемся на вертикальную прокрутку
  //             setScrollLocked(false); // Разблокируем вертикальную прокрутку
  //           } else {
  //             container.scrollLeft += delta;
  //             event.preventDefault(); // Предотвращает вертикальное прокручивание
  //             setScrollLocked(true);
  //           }
  //         } else {
  //           // Прокрутка вверх
  //           if (scrollLeft + delta <= 0) {
  //             container.scrollLeft = 0; // Достигнуто начало
  //             setIsHorizontalScroll(false); // Переключаемся на вертикальную прокрутку
  //             setScrollLocked(false); // Разблокируем вертикальную прокрутку
  //           } else {
  //             container.scrollLeft += delta;
  //             event.preventDefault(); // Предотвращает вертикальное прокручивание
  //             setScrollLocked(true);
  //           }
  //         }
  //       } else {
  //         // Вертикальная прокрутка
  //         if (!scrollLocked) {
  //           if (delta > 0) {
  //             // Прокрутка вниз
  //             container.scrollTop += delta;
  //           } else {
  //             // Прокрутка вверх
  //             container.scrollTop += delta;
  //           }
  //           event.preventDefault(); // Предотвращает горизонтальное прокручивание
  //         }
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     const handlePageScroll = (event: WheelEvent) => {
  //       if (scrollLocked) {
  //         event.preventDefault(); // Блокируем вертикальную прокрутку, пока горизонтальная активна
  //       }
  //     };

  //     window.addEventListener("wheel", handlePageScroll, { passive: false });
  //     return () => {
  //       window.removeEventListener("wheel", handlePageScroll);
  //     };
  //   }, [scrollLocked]);

  //   useEffect(() => {
  //     const container = containerRef.current;
  //     if (container) {
  //       container.addEventListener("wheel", handleWheel, { passive: false });
  //     }
  //     return () => {
  //       if (container) {
  //         container.removeEventListener("wheel", handleWheel);
  //       }
  //     };
  //   }, []);

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.scrollContent}>
        <Image className={styles.iPad} src={iPad} alt="iPad" />
        <Image className={styles.iPad} src={iPad} alt="iPad" />
        <Image className={styles.iPad} src={iPad} alt="iPad" />
        <Image className={styles.iPad} src={iPad} alt="iPad" />
        <Image className={styles.iPad} src={iPad} alt="iPad" />
        <Image className={styles.iPad} src={iPad} alt="iPad" />
      </div>
    </div>
  );
};

export default StickyImages;
