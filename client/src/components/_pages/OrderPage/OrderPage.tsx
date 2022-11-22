import {
  useState,
  useCallback,
  ChangeEvent,
  useMemo,
  FormEvent,
  useContext,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hooks";
import orderOperations from "../../../redux/orders/orders-operations";

import { useTranslation } from "react-i18next";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Modal from "../../Modal/Modal";
import Form from "../../Form/Form";
import Backdrop from "../../Backdrop/Backdrop";
import FormInput from "../../FormInput/FormInput";
import Button from "../../Button/Button";
import FormError from "../../FormError/FormError";
import { IOrder } from "../../../model/order/order";

import ThemeContext from "../../../context/context";

import { formatCurrency } from "../../../utils/formatCurrency";

import "../../../styles/OrderPage/OrderPage.scss";

const phoneRE = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

const OrderPage = () => {
  const theme = useContext(ThemeContext);
  const userEmail = useAppSelector((state) => state.auth.user.email);
  const selectedCar = useAppSelector((state) => state.cars.selectedCar);
  const pricePerDay = Number(
    useAppSelector((state) => state.cars.selectedCar?.price)
  );

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState<string>(userEmail || "");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const confirmOrderSwal = withReactContent(Swal);

  const InputChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputName = e.target.name;
      switch (inputName) {
        case "email":
          setEmail(e.target.value);
          break;

        case "phone":
          if (!e.target.value.trim() || !e.target.value.match(phoneRE)) {
            setPhone(e.target.value.trim());
            setPhoneError("Valid phone number is required!");
          } else {
            setPhone(e.target.value.trim());
            setPhoneError("");
          }
          break;

        case "comment":
          setComment(e.target.value.trim());
          break;

        case "dateStart":
          setDateStart(e.target.value);
          break;

        case "dateEnd":
          setDateEnd(e.target.value);
          break;

        default:
          break;
      }
    },
    []
  );

  const calculateDaysNumber = useMemo(() => {
    let rentDaysNumber: number = 0;
    let parsedFrom = Date.parse(dateStart);
    let parsedTo = Date.parse(dateEnd);

    if (!parsedFrom || !parsedTo || parsedTo < parsedFrom)
      return rentDaysNumber;

    return (rentDaysNumber = (parsedTo - parsedFrom) / 1000 / 60 / 60 / 24);
  }, [dateStart, dateEnd]);

  const calculateTotalPrice = useMemo(() => {
    let totalPrice: number = pricePerDay * calculateDaysNumber;
    if (calculateDaysNumber > 0 && calculateDaysNumber <= 3) {
      return totalPrice;
    }
    if (calculateDaysNumber > 3 && calculateDaysNumber <= 9) {
      return (totalPrice -= totalPrice * 0.1);
    }
    if (calculateDaysNumber > 9 && calculateDaysNumber <= 25) {
      return (totalPrice -= totalPrice * 0.15);
    }
    if (calculateDaysNumber >= 26) {
      return (totalPrice -= totalPrice * 0.2);
    }

    return totalPrice;
  }, [calculateDaysNumber, pricePerDay]);

  const submitOrderForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const orderInfo: IOrder = {
        email: userEmail || "",
        phone,
        comment,
        dateStart,
        dateEnd,
        orderedCar: {
          car: selectedCar?._id || "",
          totalDays: calculateDaysNumber,
          totalPrice: calculateTotalPrice,
        },
      };

      dispatch(orderOperations.addOrder(orderInfo)).then((response) => {
        if (response.payload?.message) {
          confirmOrderSwal.fire({
            title: "An error occurred while placing an order!",
            backdrop: false,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          confirmOrderSwal.fire({
            title: "Order palced!",
            backdrop: false,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          if (!state || !state.from) {
            navigate("/");
          } else {
            navigate(`/${state?.from}`);
          }
        }
      });
    },
    [
      userEmail,
      phone,
      comment,
      dateStart,
      dateEnd,
      dispatch,
      confirmOrderSwal,
      navigate,
      selectedCar?._id,
      calculateDaysNumber,
      calculateTotalPrice,
      state,
    ]
  );

  return (
    <Backdrop>
      <Modal>
        <div className={theme === "light" ? "order-page" : "order-page dark"}>
          <h3 className="order-page__title">{t("booking.title")}</h3>
          <div className="order-page__selected-car">
            <p className="order-page__selected-car-info">
              {selectedCar?.brand} {selectedCar?.model}{" "}
              {selectedCar?.engineDisplacement}, {selectedCar?.year},{" "}
              {t(selectedCar?.transmission || "")}
            </p>
          </div>
          <Form onSubmit={submitOrderForm}>
            <label className="form__label">
              <FormInput
                name="email"
                type="email"
                placeholder={t("booking.emailPlaceholder")}
                value={userEmail || email}
                onChange={InputChangeHandler}
                readonly={userEmail ? true : false}
              />
            </label>

            <label className="form__label">
              <FormInput
                name="phone"
                type="text"
                placeholder="+380"
                value={phone}
                onChange={InputChangeHandler}
                maxLength={13}
              />
              {phoneError && <FormError errorText={phoneError} />}
            </label>

            <div className="order-page__date-picker">
              <label className="form__label">
                <span className="label-sign">{t("booking.from")}</span>
                <FormInput
                  name="dateStart"
                  type="date"
                  value={dateStart}
                  onChange={InputChangeHandler}
                  disabled={!phone.length || phoneError ? true : false}
                />
              </label>

              <label className="form__label">
                <span className="label-sign">{t("booking.to")}</span>
                <FormInput
                  name="dateEnd"
                  type="date"
                  value={dateEnd}
                  onChange={InputChangeHandler}
                  disabled={!phone.length || phoneError ? true : false}
                />
              </label>
            </div>

            {!dateStart || !dateEnd ? null : (
              <div className="order-page__result">
                <span>
                  {t("booking.totalDays")}: {calculateDaysNumber}
                </span>
                <span>
                  {t("booking.totalPrice")}:{" "}
                  {formatCurrency(calculateTotalPrice)}
                </span>
              </div>
            )}

            <p className="comment-title">{t("booking.commentTitle")}:</p>

            <textarea
              className="form__textarea"
              autoComplete="off"
              placeholder={t("booking.commentPlaceholder")}
              name="comment"
              value={comment}
              onChange={InputChangeHandler}
            ></textarea>

            <div className="button-group">
              <Button
                type="submit"
                text={t("booking.btnSubmit")}
                disabled={
                  !dateStart ||
                  !dateEnd ||
                  dateStart > dateEnd ||
                  !phone.length ||
                  phoneError ||
                  dateStart > dateEnd
                    ? true
                    : false
                }
              />
              <Link to={!state || !state.from ? "/" : `/${state?.from}`}>
                <Button type="button" text={t("booking.btnCancel")} />
              </Link>
            </div>
          </Form>
        </div>
      </Modal>
    </Backdrop>
  );
};

export default OrderPage;
