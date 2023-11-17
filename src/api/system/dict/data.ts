import { http } from "@/utils/http";
import { Result } from "@/api/api";

/** 根据字典类型查询字典数据信息 */
export const getDicts = dictType => {
  return http.request<Result>("get", `/system/dict/data/type/${dictType}`);
};
