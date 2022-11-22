import { useTranslation } from "react-i18next";

import "../../../styles/NotFoundPage/NotFoundPage.scss";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">{t("notFound")}</h1>
      <div className="not-found-page__img"></div>
      
    </div>
  );
};

export default NotFoundPage;
