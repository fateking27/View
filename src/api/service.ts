import { http } from "@/utils/http";
import { Result } from "@/api/api";

/**查询已发布的地图服务**/
export const mapServiceList = (data?: object) => {
  return http.request<Result>("get", "/business/external/released", {
    params: data
  });
};

/**记录此次浏览记录**/
export const mapDitail = id => {
  return http.request<Result>("get", `/business/external/ditail/${id}`);
};
