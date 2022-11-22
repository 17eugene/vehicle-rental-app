import { useAppSelector } from "../../redux/hooks/hooks";
import Tilt from "react-parallax-tilt";

import "../../styles/CarViewArea/CarViewArea.scss";


const styledCarImage = (entity: string) => {
  return {
    backgroundImage: `url(${entity})`,
  };
};

const CarViewArea = () => {
  const selectedCar = useAppSelector(state => state.cars.selectedCar);

  return (
    <div className="view-area">
      <Tilt
        tiltEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.6}
        glarePosition="all"
        className="tilt"
        glareColor="#ffffcca1"
        glareBorderRadius="24px"
        transitionSpeed={2000}
      >
        <div
          className="car-image-view"
          style={
            selectedCar
              ? styledCarImage(selectedCar?.imageURL)
              : styledCarImage(
                  "https://www.car-mart.com/wp-content/themes/carmart/images/coming-soon.png"
                )
          }
        >
        </div>
      </Tilt>
    </div>
  );
};

export default CarViewArea;
