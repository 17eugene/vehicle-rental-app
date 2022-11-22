import fbIcon from "../../images/social-icons/facebook-3-logo-png-transparent.png";
import instaIcon from "../../images/social-icons/Instagram_logo_2016.svg.webp";
import tgIcov from "../../images/social-icons/telegram-logo-png-transparent.png";

import "../../styles/SocialLinks/SocialLinks.scss";

interface ISocialLinksProps {
  width: string;
  height: string;
}

const SocialLinks = ({ width, height }: ISocialLinksProps) => {
  return (
    <div className="social-links">
      <ul className="social-links__list">
        <li className="social-links__item">
          <img alt="facebook" src={fbIcon} width={width} height={height} />
        </li>
        <li className="social-links__item">
          <img alt="instagram" src={instaIcon} width={width} height={height} />
        </li>
        <li className="social-links__item">
          <img alt="telegram" src={tgIcov} width={width} height={height} />
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
