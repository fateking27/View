import { http } from "@/utils/http";
import { Result } from "@/api/api";
/**查询新闻信息**/
export const listNew = (data?: object) => {
  return http.request<Result>("get", "/business/news_info/released", {
    params: data
  });
};

export const getNew = id => {
  return http.request<Result>("get", `/business/news_info/${id}`);
};

export const getBrowse = id => {
  return http.request<Result>("get", `/business/news_info/ditail/${id}`);
};

/**查询项目介绍**/
export const listIntroduce = (data?: object) => {
  return http.request<Result>("get", "business/project_intro/released", {
    params: data
  });
};

/**查询项目成果**/
export const listResults = (data?: object) => {
  return http.request<Result>("get", "/business/project_res/released", {
    params: data
  });
};
