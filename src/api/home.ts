import { http } from "@/utils/http";
import { Result } from "@/api/api";

/** 获取渔场地块信息 */
export const getFisheryLandParcelInfo = () => {
  return http.request<Result>(
    "get",
    `/fisheryForecast/getFisheryLandParcelInfo`
  );
};

/** 获取渔场预报信息 */
export const getFisheryForecastById = (data: object) => {
  return http.request<Result>(
    "get",
    `/fisheryForecast/getFisheryForecastById`,
    {
      params: data
    }
  );
};

/** 获取海区地块信息 */
export const getSeaAreaLandParcelInfo = () => {
  return http.request<Result>(
    "get",
    `/seaAreaSstForecast/getSeaAreaLandParcelInfo`
  );
};

/** 获取海区地块预测信息 */
export const getSeaAreaSstForecastById = (data: object) => {
  return http.request<Result>(
    "get",
    `/seaAreaSstForecast/getSeaAreaSstForecastById`,
    {
      params: data
    }
  );
};

/** 获取近岸地块信息 */
export const getInshoreLandParcelInfo = () => {
  return http.request<Result>(
    "get",
    `/inshoreSstForecast/getInshoreLandParcelInfo`
  );
};

/** 获取近岸地块预测信息 */
export const getInshoreSstForecastById = (data: object) => {
  return http.request<Result>(
    "get",
    `/inshoreSstForecast/getInshoreSstForecastById`,
    {
      params: data
    }
  );
};

const bearingBodyData = {
  pageSize: -1,
  pageNum: 1
};

/** 分页查询旅游景区 */
export const getTouristAttraction = () => {
  return http.request<Result>("post", `/touristAttraction/page`, {
    data: bearingBodyData
  });
};

/** 分页查询星级饭店 */
export const getStarHotel = () => {
  return http.request<Result>("post", `/starHotel/page`, {
    data: bearingBodyData
  });
};

/** 分页查询学校 */
export const getSchool = () => {
  return http.request<Result>("post", `/school/page`, {
    data: bearingBodyData
  });
};

/** 分页查询救助服务机构 */
export const getSalvageServiceAgency = () => {
  return http.request<Result>("post", `/salvageServiceAgency/page`, {
    data: bearingBodyData
  });
};

/** 分页查询宗教活动场所 */
export const getReligionPlace = () => {
  return http.request<Result>("post", `/religionPlace/page`, {
    data: bearingBodyData
  });
};

/** 分页查询公共文化场所 */
export const getPublicCulturalPlace = () => {
  return http.request<Result>("post", `/publicCulturalPlace/page`, {
    data: bearingBodyData
  });
};

/** 查分页询大型超市、百货店和亿元以上商品交易市场 */
export const getLargeComTradingPlace = () => {
  return http.request<Result>("post", `/largeComTradingPlace/page`, {
    data: bearingBodyData
  });
};

/** 分页查询医疗卫生机构 */
export const getHospital = () => {
  return http.request<Result>("post", `/hospital/page`, {
    data: bearingBodyData
  });
};

/** 分页查询体育场馆 */
export const getGymnasium = () => {
  return http.request<Result>("post", `/gymnasium/page`, {
    data: bearingBodyData
  });
};

/** 分页查询承灾体 */
export const getBearingBody = index => {
  return http.request<Result>("post", `/${index}/page`, {
    data: {
      pageSize: -1,
      pageNum: 1
    }
  });
};

/** 查询指定(或全部)年份的台风 */
export const getTyphoonInfo = (data: object) => {
  return http.request<Result>("post", `/typhoonInfo/page`, {
    data
  });
};

/** 根据台风信息id查询详情 */
export const getTyphoonInfoDetail = (data: object) => {
  return http.request<Result>("get", `/typhoonInfo/detail`, {
    params: data
  });
};

/** 获取风场地块信息 */
export const getWindPointYears = () => {
  return http.request<Result>("get", `/windPoint/getYears`);
};

/** 获取风场地块信息 */
export const getWindAreaLandParcelInfo = () => {
  return http.request<Result>("get", `/windPoint/getWindAreaLandParcelInfo`);
};

/** 获取风场地块方块信息 */
export const getWindAreaLandParcelSquare = () => {
  return http.request<Result>("get", `/windPoint/getWindAreaLandParcelSquare`);
};

/** 查询指定年份的风场信息 */
export const getWindPointByYear = (data: object) => {
  return http.request<Result>("get", `/windPoint/getByYear`, {
    params: data
  });
};

/** 查询NOAA数据 */
export const getWindNoaa = (data?: object) => {
  return http.request<Result>("post", `/noaa/getData`, {
    data
  });
};
