// import React, { useEffect, useRef, useState } from "react";
// import styles from "./StickyImages.module.css";
// import iPad from "../../../public/img/iPad - Home Screen - Light.png";
// import Image from "next/image";

// const StickyImages: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isHorizontalScroll, setIsHorizontalScroll] = useState(true);

//   const updateScrollState = () => {
//     if (containerRef.current) {
//       const container = containerRef.current;
//       const { scrollLeft, scrollWidth, clientWidth } = container;

//       setIsHorizontalScroll(
//         scrollLeft > 0 && scrollLeft < scrollWidth - clientWidth
//       );
//     }
//   };

//   const handleWheel = (event: WheelEvent) => {
//     if (containerRef.current) {
//       const container = containerRef.current;
//       const { scrollLeft, scrollWidth, clientWidth } = container;
//       const delta = event.deltaY;

//       if (isHorizontalScroll) {
//         if (delta > 0) {
//           if (scrollLeft + delta >= scrollWidth - clientWidth) {
//             container.scrollLeft = scrollWidth - clientWidth;
//             setIsHorizontalScroll(false);
//           } else {
//             container.scrollLeft += delta;
//             event.preventDefault();
//           }
//         } else {
//           if (scrollLeft + delta <= 0) {
//             container.scrollLeft = 0;
//             setIsHorizontalScroll(false);
//           } else {
//             container.scrollLeft += delta;
//             event.preventDefault();
//           }
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     const handlePageScroll = (event: WheelEvent) => {
//       if (!isHorizontalScroll) {
//         return;
//       }
//       event.preventDefault();
//     };

//     window.addEventListener("wheel", handlePageScroll, { passive: false });
//     return () => {
//       window.removeEventListener("wheel", handlePageScroll);
//     };
//   }, [isHorizontalScroll]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("wheel", handleWheel);

//       const resizeObserver = new ResizeObserver(updateScrollState);
//       resizeObserver.observe(container);
//       return () => {
//         container.removeEventListener("wheel", handleWheel);
//         resizeObserver.disconnect();
//       };
//     }
//   }, []);

//   return (
//     <div ref={containerRef} className={styles.scrollContainer}>
//       <div className={styles.scrollContent}>
//         <Image className={styles.iPad} src={iPad} alt="iPad" />
//         <Image className={styles.iPad} src={iPad} alt="iPad" />
//         <Image className={styles.iPad} src={iPad} alt="iPad" />
//         <Image className={styles.iPad} src={iPad} alt="iPad" />
//         <Image className={styles.iPad} src={iPad} alt="iPad" />
//         <Image className={styles.iPad} src={iPad} alt="iPad" />
//       </div>
//     </div>
//   );
// };

// export default StickyImages;

import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "./StickyImages.module.css"; // Подключите стили

const StickyImages: React.FC = () => {
  // Данные для карусели
  const items = [
    {
      id: 1,
      imageSrc: require("../../img/iPad - Home Screen - Light.png"),
      title: "Item 1",
    },
    {
      id: 2,
      imageSrc: require("../../img/iPad - Home Screen - Light.png"),
      title: "Item 2",
    },
    {
      id: 3,
      imageSrc: require("../../img/iPad - Home Screen - Light.png"),
      title: "Item 3",
    },
    {
      id: 4,
      imageSrc: require("../../img/iPad - Home Screen - Light.png"),
      title: "Item 4",
    },
    {
      id: 5,
      imageSrc: require("../../img/iPad - Home Screen - Light.png"),
      title: "Item 5",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    centerPadding: "100% 0 0",
    responsive: [
      {
        breakpoint: 9999,
        settings: {
          centerPadding: "20%",
        },
      },

      {
        breakpoint: 1500,
        settings: {
          centerPadding: "100% 0 0",
        },
      },
      {
        breakpoint: 700,
        settings: {
          centerPadding: "30% 0 0",
        },
      },
      {
        breakpoint: 400,
        settings: {
          centerPadding: "10% 0 0",
        },
      },
    ],
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={styles.carouselItem}>
            <Image
              className={styles.image}
              src={item.imageSrc}
              alt={item.title}
              layout="responsive"
              width={900}
              height={600}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StickyImages;
