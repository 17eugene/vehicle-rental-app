import { useContext } from "react";
import { useTranslation } from "react-i18next";
import CarsElement from "../CarsElement/CarsElement";
import CarsSlider from "../CarsSlidel/CarsSlider";

import { ICarResponse } from "../../model/car/car";

import ThemeContext from "../../context/context";

import "../../styles/CarsList/CarsList.scss";

interface ICarsListProps {
  cars: ICarResponse[] | undefined;
  onClick: (id: string) => void;
}

const CarsList = ({ cars, onClick }: ICarsListProps) => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <CarsSlider>
      {cars?.length ? (
        <ul className="cars-list">
          {cars &&
            cars?.length > 0 &&
            cars?.map((car) => (
              <li
                key={car._id}
                className="cars-list__item"
                onClick={() => onClick(car?._id)}
              >
                <CarsElement car={car} />
              </li>
            ))}
        </ul>
      ) : (
        <p
          className={
            theme === "light"
              ? "cars-list__not-found"
              : "cars-list__not-found dark"
          }
        >
          {t("notFoundCar")}
        </p>
      )}
    </CarsSlider>
  );
};

export default CarsList;
