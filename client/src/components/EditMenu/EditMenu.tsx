import { useAppSelector } from "../../redux/hooks/hooks";
import { useTranslation } from "react-i18next";
import CloseIcon from "../CloseIcon/CloseIcon";

import "../../styles/EditMenu/EditMenu.scss";

interface IEditMenuProps {
  onClick: () => void;
  toggleUpdateForm: () => void;
  toggleDeleteConfirmation: () => void;
}

const EditMenu = ({
  onClick,
  toggleUpdateForm,
  toggleDeleteConfirmation,
}: IEditMenuProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  return (
    <div className={theme === "light" ? "edit-menu" : "edit-menu dark"}>
      <CloseIcon onClick={onClick} />
      <p className="edit-menu__text" onClick={toggleDeleteConfirmation}>
        {t("deleteCar")}
      </p>
      <p className="edit-menu__text" onClick={toggleUpdateForm}>
        {t("updateCar")}
      </p>
    </div>
  );
};

export default EditMenu;
