import { http } from "@/utils/http";
import { Result } from "@/api/api";
/**查询新闻信息**/
export const listNew = (data?: object) => {
  return http.request<Result>("get", "/business/news_info/released", {
    params: data
  });
};

/**查询新闻信息详情统计浏览量**/
export const getBrowse = id => {
  return http.request<Result>("get", `/business/news_info/ditail/${id}`);
};

/**查询项目介绍**/
export const listIntroduce = (data?: object) => {
  return http.request<Result>("get", "business/project_intro/released", {
    params: data
  });
};

/**查询项目介绍详情统计浏览量**/
export const detailIntroduce = id => {
  return http.request<Result>("get", `/business/project_intro/ditail/${id}`);
};

/**查询项目成果**/
export const listResults = (data?: object) => {
  return http.request<Result>("get", "/business/project_res/released", {
    params: data
  });
};

export const modulesResults = () => {
  return http.request<Result>("get", "/business/project_res/tree_achievement");
};

/**查询修复进度详情统计浏览量**/
export const detailResult = id => {
  return http.request<Result>("get", `/business/project_res/ditail/${id}`);
};

/**查询当前成果**/
export const listCurrent = (data?: object) => {
  return http.request<Result>(
    "get",
    "/business/project_res/released/achievement",
    {
      params: data
    }
  );
};

/**查询阶段展示**/
export const listPage = (data?: object) => {
  return http.request<Result>(
    "get",
    "/business/project_res/released/stage_display",
    {
      params: data
    }
  );
};

/**查询修复进度**/
export const listProgress = (data?: object) => {
  return http.request<Result>(
    "get",
    "/business/project_res/released/repair_progress",
    {
      params: data
    }
  );
};
/**网站搜索**/
export const onSearch = (data?: object) => {
  return http.request<Result>("get", "/business/overall_situation", {
    params: data
  });
};
