import { http } from "@/utils/http";
import { Result } from "@/api/api";

/**查询已发布的地图服务**/
export const mapServiceList = (data?: object) => {
  return http.request<Result>("get", "/business/external/released", {
    params: data
  });
};
