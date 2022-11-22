import { useState, useEffect, useCallback, ChangeEvent, useMemo } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import carsOperations from "../../../redux/cars/cars-operations";
import { selectCar } from "../../../redux/cars/cars-slice";

import { useTranslation } from "react-i18next";

import Backdrop from "../../Backdrop/Backdrop";
import Button from "../../Button/Button";
import CarsList from "../../CarsList/CarsList";
import Container from "../../Container/Container";
import AddForm from "../../AddForm/AddForm";
import SelectedCarSection from "../../SelectedCarSection/SelectedCarSection";
import FilterSection from "../../FilterSection/FilterSection";

import { MdAdd } from "react-icons/md";

import "../../../styles/MainPage/MainPage.scss";

const MainPage = () => {
  const [backdrop, setBackdrop] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});

  const cars = useAppSelector((state) => state.cars.carsCollection);
  const userRole = useAppSelector((state) => state.auth.user.role);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  //fetch all cars
  useEffect(() => {
    dispatch(carsOperations.getAllCars());
  }, [dispatch]);

  //clear params while reload
  useEffect(() => {
    if (!checkedOptions.length) {
      setSearchParams({});
    }
  }, [checkedOptions.length, setSearchParams]);

  //select a car to show on the main screen
  const selectCarHandler = useCallback(
    (id: string) => {
      const selectedCar = cars.find((car) => car._id === id);
      if (selectedCar) {
        dispatch(selectCar(selectedCar));
      }
    },
    [cars, dispatch]
  );

  const toggleBackdrop = useCallback(() => {
    setBackdrop(!backdrop);
  }, [backdrop]);

  const filterCars = useMemo(() => {
    ///////////////if not selected any filter parameter render whole list/////////////
    if (!checkedOptions.length) return cars;

    //////////////retrieve car all classes and car body types//////////////////
    const avaliableCarClasses = cars.map((el) => el.vehicleClass);
    const avaliableCarBodyTypes = cars.map((el) => el.bodyType);
    const avaliableTransmissionTypes = cars.map((el) => el.transmission);

    ////////////////make array of unique class names and body types/////////////////////
    const uniqueCarClasses = avaliableCarClasses.filter((item, index) => {
      return avaliableCarClasses.indexOf(item.toLowerCase()) === index;
    });
    const uniqueCarBodyTypes = avaliableCarBodyTypes.filter((item, index) => {
      return avaliableCarBodyTypes.indexOf(item.toLowerCase()) === index;
    });
    const uniqueTransmissionTypes = avaliableTransmissionTypes.filter(
      (item, index) => {
        return (
          avaliableTransmissionTypes.indexOf(item.toLocaleLowerCase()) === index
        );
      }
    );

    ////////////////////make filtered collections//////////////////////
    const filteredByClass = cars.filter((car) =>
      checkedOptions.includes(car.vehicleClass)
    );

    const filteredByBody = cars.filter((car) =>
      checkedOptions.includes(car.bodyType)
    );

    const filteredByTransmission = cars.filter((car) =>
      checkedOptions.includes(car.transmission)
    );

    const filteredByClassAndBody = filteredByClass.filter((car) =>
      checkedOptions.includes(car.bodyType)
    );

    const filteredByClassAndTransmission = filteredByClass.filter((car) =>
      checkedOptions.includes(car.transmission)
    );

    const filteredByBodyAndTransmission = filteredByBody.filter((car) =>
      checkedOptions.includes(car.transmission)
    );

    const filtereByClassAndBodyAndTransmission = filteredByClassAndBody.filter(
      (car) => checkedOptions.includes(car.transmission)
    );

    if (checkedOptions.length === 1) {
      for (let i = 0; i <= checkedOptions.length; i++) {
        const filterOption = checkedOptions[i];
        let carClass;
        let carBody;
        let carTransmission;

        for (let c = 0; c <= uniqueCarClasses.length; c++) {
          carClass = uniqueCarClasses[c];

          if (filterOption === carClass) {
            return filteredByClass;
          }
        }

        for (let b = 0; b <= uniqueCarBodyTypes.length; b++) {
          carBody = uniqueCarBodyTypes[b];
          if (filterOption === carBody) {
            return filteredByBody;
          }
        }

        for (let t = 0; t < uniqueTransmissionTypes.length; t++) {
          carTransmission = uniqueTransmissionTypes[t];

          if (filterOption === carTransmission) {
            return filteredByTransmission;
          }
        }
      }
    } else if (
      !filteredByClassAndBody.length &&
      !filteredByBody.length &&
      !filteredByTransmission.length
    ) {
      return filteredByClass;
    } else if (
      !filteredByClassAndBody.length &&
      !filteredByClass.length &&
      !filteredByTransmission.length
    ) {
      return filteredByBody;
    } else if (
      !filteredByClassAndBody.length &&
      !filteredByClass.length &&
      !filteredByBody.length
    ) {
      return filteredByTransmission;
    } else if (!filteredByTransmission.length) {
      return filteredByClassAndBody;
    } else if (
      !filteredByBody.length &&
      !filteredByBodyAndTransmission.length
    ) {
      return filteredByClassAndTransmission;
    } else if (
      !filteredByClass.length &&
      !filteredByClassAndTransmission.length
    ) {
      return filteredByBodyAndTransmission;
    } else {
      return filtereByClassAndBodyAndTransmission;
    }
  }, [checkedOptions, cars]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let checkedFilterOptions = [...checkedOptions];
      const params: any = {};

      if (e.target.checked) {
        checkedFilterOptions = [...checkedOptions, e.target.name];
        checkedFilterOptions.map((item) => (params[item] = true));
      } else {
        checkedFilterOptions.splice(checkedOptions.indexOf(e.target.name), 1);
        checkedFilterOptions.map((item) => (params[item] = true));
      }
      setCheckedOptions(checkedFilterOptions);
      setSearchParams(params);
    },
    [checkedOptions, setSearchParams, setCheckedOptions]
  );

  return (
    <>
      <main className="main">
        <Container>
          {userRole === "ADMIN" && (
            <Button
              type="button"
              text={t("add")}
              variant="add"
              onClick={toggleBackdrop}
            >
              <MdAdd size={16} />
            </Button>
          )}
          <>
            <CarsList cars={filterCars} onClick={selectCarHandler} />
            <section className="section">
              <FilterSection
                onChange={handleChange}
                searchParams={searchParams}
                checkedOptions={checkedOptions}
              />
              <SelectedCarSection />
            </section>
          </>
        </Container>
        <Outlet />
      </main>
      {backdrop && (
        <Backdrop>
          <AddForm toggleBackdrop={toggleBackdrop} />
        </Backdrop>
      )}
    </>
  );
};

export default MainPage;
