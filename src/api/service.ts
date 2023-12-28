import { http } from "@/utils/http";
import { Result } from "@/api/api";

/**查询地图服务列表**/
export const mapServiceList = (data?: object) => {
  return http.request<Result>("get", "/business/external/list", {
    params: data
  });
};
