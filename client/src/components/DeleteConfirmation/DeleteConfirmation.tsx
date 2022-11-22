import { useContext } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useTranslation } from "react-i18next";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import ThemeContext from "../../context/context";
import "../../styles/DeleteConfirmation/DeleteConfirmation.scss";

interface IDeleteConfirmationProps {
  deleteCarHandler: () => void;
  toggleDeleteConfirmation: () => void;
  deleteError: string;
}

const DeleteConfirmation = ({
  deleteCarHandler,
  toggleDeleteConfirmation,
  deleteError,
}: IDeleteConfirmationProps) => {
  const theme = useContext(ThemeContext);
  const isLoading = useAppSelector((state) => state.cars.loading);
  const { t } = useTranslation();
  return (
    <Backdrop>
      <Modal>
        <div
          className={
            theme === "light"
              ? "delete-confirmation"
              : "delete-confirmation dark"
          }
        >
          <p className="delete-confirmation__title">
            {t("deleteConfirmation")}?
          </p>

          {deleteError && <div className="delete-error">{deleteError}</div>}

          {isLoading ? (
            <Loader />
          ) : (
            <div className="button-group">
              <Button
                type="button"
                text={t("btnDelete")}
                onClick={deleteCarHandler}
              />
              <Button
                type="button"
                text={t("booking.btnCancel")}
                onClick={toggleDeleteConfirmation}
              />
            </div>
          )}
        </div>
      </Modal>
    </Backdrop>
  );
};

export default DeleteConfirmation;
