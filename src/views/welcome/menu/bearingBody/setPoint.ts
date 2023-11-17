import school from "@/assets/images/bearingBody/school.png";
import gymnasium from "@/assets/images/bearingBody/gymnasium.png";
import hospital from "@/assets/images/bearingBody/hospital.png";
import largeComTradingPlace from "@/assets/images/bearingBody/largeComTradingPlace.png";
import publicCulturalPlace from "@/assets/images/bearingBody/publicCulturalPlace.png";
import religionPlace from "@/assets/images/bearingBody/religionPlace.png";
import salvageServiceAgency from "@/assets/images/bearingBody/salvageServiceAgency.png";
import starHotel from "@/assets/images/bearingBody/starHotel.png";
import touristAttraction from "@/assets/images/bearingBody/touristAttraction.png";
import { useLegendStoreHook } from "@/store/modules/legend";

const getIcon = index => {
  let icon;
  if (index === "school") {
    icon = school;
  } else if (index === "gymnasium") {
    icon = gymnasium;
  } else if (index === "hospital") {
    icon = hospital;
  } else if (index === "largeComTradingPlace") {
    icon = largeComTradingPlace;
  } else if (index === "publicCulturalPlace") {
    icon = publicCulturalPlace;
  } else if (index === "religionPlace") {
    icon = religionPlace;
  } else if (index === "salvageServiceAgency") {
    icon = salvageServiceAgency;
  } else if (index === "starHotel") {
    icon = starHotel;
  } else if (index === "touristAttraction") {
    icon = touristAttraction;
  }
  return icon;
};

// 图例
const legendArr = [
  {
    name: "学校",
    img: school
  },
  {
    name: "星级饭店",
    img: starHotel
  },
  {
    name: "医疗卫生机构",
    img: hospital
  },
  {
    name: "体育场馆",
    img: gymnasium
  },
  {
    name: "大型超市",
    img: largeComTradingPlace
  },
  {
    name: "旅游景区",
    img: touristAttraction
  },
  {
    name: "公共文化场所",
    img: publicCulturalPlace
  },
  {
    name: "宗教活动场所",
    img: religionPlace
  },
  {
    name: "救助服务机构",
    img: salvageServiceAgency
  }
];
// 绘制点位集合
export const setPoint = (resData, index, bearingBodyActiveArr, callBack) => {
  const entities = window.viewer.entities;
  useLegendStoreHook().setLegend(legendArr);
  resData.forEach(res => {
    entities.add({
      name: `bearingBody${res.name}`,
      position: Cesium.Cartesian3.fromDegrees(res.lon, res.lat),
      billboard: {
        image: getIcon(index),
        scale: 1,
        width: 30,
        height: 30
      },
      label: {
        text: res.name,
        font: "17px sans-serif",
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        fillColor: Cesium.Color.fromCssColorString("#FFB526"),
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 5,
        pixelOffset: new Cesium.Cartesian2(0, 30),
        show: false
      },
      properties: res
    });
    callBack();
  });

  if (bearingBodyActiveArr.length === 1) {
    window.viewer.flyTo(entities, {
      duration: 2, // 以秒为单位的飞行持续时间。
      offset: {
        heading: Cesium.Math.toRadians(0.0), // 以弧度为单位的航向角。
        pitch: Cesium.Math.toRadians(-90), // 以弧度为单位的俯仰角。
        range: 0 // 到中心的距离，以米为单位。
      }
    });
  }
};
