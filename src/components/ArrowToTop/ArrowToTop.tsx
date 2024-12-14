import { useState, useEffect } from "react";
import { Link } from "react-scroll";

import arrowIcon from "@/assets/arrow-top.png";

import "./index.scss";

export const ArrowToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heightForDisplayArrow = 400;

  const toggleVisibility = () => {
    if (window.scrollY > heightForDisplayArrow) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <Link to="page-wrapper__title" smooth duration={1000} className="to-top">
        <img src={arrowIcon} alt="arrow" />
      </Link>
    )
  );
};
