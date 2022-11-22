import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import { getDefaultCar } from "../../redux/cars/cars-slice";
import carsOperations from "../../redux/cars/cars-operations";

import CarViewArea from "../CarViewArea/CarViewArea";
import CarFeaturesArea from "../CarFeaturesArea/CarFeaturesArea";
import UpdateForm from "../UpdateForm/UpdateForm";
import Backdrop from "../Backdrop/Backdrop";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import Loader from "../Loader/Loader";

import "../../styles/SelectedCarSection/SelectedCarSection.scss";

const SelectedCarSection = () => {
  const [isOpenedEdit, setIsOpenedEdit] = useState<boolean>(false);
  const [isOpenedUpdateForm, setIsOpenedUpdateForm] = useState<boolean>(false);
  const [isOpenedDeleteConfirmation, setIsOpenedDeleteConfirmation] =
    useState<boolean>(false);

  const [deleteError, setDeleteError] = useState<string>("");

  const cars = useAppSelector((state) => state.cars.carsCollection);
  const selectedCar = useAppSelector((state) => state.cars.selectedCar);
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector((state) => state.auth.refreshing);

  useEffect(() => {
    dispatch(getDefaultCar(selectedCar || cars[0]));
  }, [dispatch, cars, selectedCar]);

  const toggleEdit = useCallback(() => {
    setIsOpenedEdit(!isOpenedEdit);
  }, [isOpenedEdit]);

  const toggleDeleteConfirmation = useCallback(() => {
    setIsOpenedDeleteConfirmation(!isOpenedDeleteConfirmation);
    setDeleteError("");
  }, [isOpenedDeleteConfirmation]);

  const toggleUpdateForm = useCallback(() => {
    setIsOpenedUpdateForm(!isOpenedUpdateForm);
    setIsOpenedEdit(false);
  }, [isOpenedUpdateForm]);

  const deleteCarHandler = useCallback(() => {
    if (selectedCar) {
      dispatch(carsOperations.deleteCar({ _id: selectedCar._id })).then(
        (response) => {
          if (response.payload?.message) {
            setDeleteError("Error occured while delete!");
          } else {
            setDeleteError("");
            setIsOpenedDeleteConfirmation(false);
            setIsOpenedEdit(false);
          }
        }
      );
    }
  }, [dispatch, selectedCar]);

  return (
    <div className="selected-car-wrapper">
      {isRefreshing ? (
        <Loader />
      ) : (
        <>
          {selectedCar && (
            <>
              <CarViewArea />
              {isOpenedUpdateForm ? (
                <>
                  <Backdrop>
                    <div></div>
                  </Backdrop>
                  <UpdateForm toggleUpdateForm={toggleUpdateForm} />
                </>
              ) : (
                <CarFeaturesArea
                  toggleDeleteConfirmation={toggleDeleteConfirmation}
                  toggleEdit={toggleEdit}
                  isOpenedEdit={isOpenedEdit}
                  selectedCar={selectedCar}
                  toggleUpdateForm={toggleUpdateForm}
                />
              )}
            </>
          )}
        </>
      )}

      {isOpenedDeleteConfirmation && (
        <DeleteConfirmation
          toggleDeleteConfirmation={toggleDeleteConfirmation}
          deleteCarHandler={deleteCarHandler}
          deleteError={deleteError}
        />
      )}
    </div>
  );
};

export default SelectedCarSection;
