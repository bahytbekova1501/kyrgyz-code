// components/StickyImages.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./StickyImages.module.css";
import iPad from "../../img/iPad - Home Screen - Light.png";
import Image from "next/image";

const StickyImages: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHorizontalScroll, setIsHorizontalScroll] = useState(true);

  const updateScrollState = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

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
          if (scrollLeft + delta >= scrollWidth - clientWidth) {
            container.scrollLeft = scrollWidth - clientWidth;
            setIsHorizontalScroll(false);
          } else {
            container.scrollLeft += delta;
            event.preventDefault();
          }
        } else {
          if (scrollLeft + delta <= 0) {
            container.scrollLeft = 0;
            setIsHorizontalScroll(false);
          } else {
            container.scrollLeft += delta;
            event.preventDefault();
          }
        }
      }
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const touch = event.touches[0];
      const deltaX = touch.clientX - container.getBoundingClientRect().left;

      if (isHorizontalScroll) {
        container.scrollLeft -= deltaX;
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    const handlePageScroll = (event: WheelEvent) => {
      if (!isHorizontalScroll) {
        return;
      }
      event.preventDefault();
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
      container.addEventListener("touchmove", handleTouchMove);

      const resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchmove", handleTouchMove);
        resizeObserver.disconnect();
      };
    }
  }, []);

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
