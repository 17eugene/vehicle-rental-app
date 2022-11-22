import business from "./images/vehicle-class-img/business.png";
import economy from "./images/vehicle-class-img/economy.png";
import hatchback from "./images/vehicle-class-img/hatchback.png";
import sedan from "./images/vehicle-class-img/sedan.png";
import midRange from "./images/vehicle-class-img/mid-range.png";
import offRoad from "./images/vehicle-class-img/off-road.png";
import premium from "./images/vehicle-class-img/premium.png";

// import manual from "./images/vehicle-transmission-img/manual.png";
// import automatic from "./images/vehicle-transmission-img/automatic.png";

export const filterData = {
  classType: [
    {
      id: 1,
      value: "economy",
      icon: economy,
    },

    {
      id: 2,
      value: "mid-range",
      icon: midRange,
    },

    {
      id: 3,
      value: "business",
      icon: business,
    },

    {
      id: 4,
      value: "premium",
      icon: premium,
    },
  ],

  bodyType: [
    {
      id: 1,
      value: "sedan",
      icon: sedan,
    },

    {
      id: 2,
      value: "hatchback",
      icon: hatchback,
    },

    {
      id: 3,
      value: "suv",
      icon: offRoad,
    },
  ],

  transmissionType: [
    {
      id: 1,
      value: "automatic",
      icon: null,
    },

    {
      id: 2,
      value: "manual",
      icon: null,
    },
  ],

  fuelType: [
    {
      id: 1,
      value: "gasoline",
      icon: null,
    },

    {
      id: 2,
      value: "diesel",
      icon: null,
    },
  ],
};
