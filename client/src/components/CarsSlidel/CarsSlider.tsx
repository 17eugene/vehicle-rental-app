import { ReactNode, useCallback, MouseEvent, useRef } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import Loader from "../Loader/Loader";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

import "../../styles/CarsSlider/CarsSlider.scss";

interface ICarsSliderProps {
  children: ReactNode | ReactNode[];
}

const CarsSlider = ({ children }: ICarsSliderProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isRefreshing = useAppSelector((state) => state.auth.refreshing);

  const handleRightClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (
      e.currentTarget.className.includes("arrow-right") &&
      carouselRef.current !== null
    ) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth - 10;
      return;
    }
  }, []);

  const handleLeftClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (
      e.currentTarget.className.includes("arrow-left") &&
      carouselRef.current !== null
    ) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth - 10;
      return;
    }
  }, []);

  return (
    <div className="slider">
      <div
        className={
          theme === "light"
            ? "slider__arrow arrow-left"
            : "slider__arrow arrow-left dark"
        }
        onClick={handleLeftClick}
      >
        <SlArrowLeft className="slider__icon" />
      </div>

      <div
        className={theme === "light" ? "slider__bar" : "slider__bar dark"}
        ref={carouselRef}
      >
        {isRefreshing ? <Loader /> : children}
      </div>

      <div
        className={
          theme === "light"
            ? "slider__arrow arrow-right"
            : "slider__arrow arrow-right dark"
        }
        onClick={handleRightClick}
      >
        <SlArrowRight className="slider__icon" />
      </div>
    </div>
  );
};

export default CarsSlider;
