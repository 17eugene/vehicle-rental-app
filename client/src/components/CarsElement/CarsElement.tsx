import { useMemo } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useTranslation } from "react-i18next";
import { ICar } from "../../model/car/car";

import "../../styles/CarsElement/CarsElement.scss";

interface ICarsElementProps {
  car?: ICar;
  carId?: string;
  dateStart?: string;
  dateEnd?: string;
  totalPrice?: number;
}

const CarsElement = ({
  car,
  carId,
  dateStart,
  dateEnd,
  totalPrice,
}: ICarsElementProps) => {
  const carsCollection = useAppSelector((state) => state.cars.carsCollection);

  const { t } = useTranslation();

  const bookedCar = useMemo(() => {
    return carsCollection.find((car) => car._id === carId);
  }, [carId, carsCollection]);

  return (
    <div className="cars-list__element">
      <div className="cars-list__image-wrapper">
        <img
          className="car-image"
          src={!bookedCar ? car?.imageURL : bookedCar.imageURL}
          alt="carImage"
        />
      </div>

      {bookedCar && (
        <>
          <div className="cars-list__order-info">
            <p className="car-list__car-name">
              {bookedCar?.brand} {bookedCar?.model}, {bookedCar.year}
            </p>
            <p className="car-list__car-info">
              {bookedCar?.engineDisplacement} / {t(bookedCar?.transmission)} /{" "}
              {t(bookedCar?.fuel)}
            </p>

            <p className="cars-list__dates">
              <span>
                {t("booking.from")}: {dateStart}
              </span>{" "}
              <span>
                {t("booking.to")}: {dateEnd}
              </span>
              <span>
                {t("booking.totalPrice")}: {totalPrice}$
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CarsElement;
