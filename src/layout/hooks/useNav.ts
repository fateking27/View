import { getConfig } from "@/config";
import { routeMetaType } from "../types";
import { useGlobal } from "@pureadmin/utils";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";

export function useNav() {
  const route = useRoute();
  const routers = useRouter().options.routes;
  /** 平台`layout`中所有`el-tooltip`的`effect`配置，默认`light` */
  const tooltipEffect = getConfig()?.TooltipEffect ?? "light";

  /** 用户名 */
  const username = computed(() => {
    return useUserStoreHook()?.username;
  });

  const avatarsStyle = computed(() => {
    return username.value ? { marginRight: "10px" } : "";
  });

  const { $storage, $config } = useGlobal<GlobalPropertiesApi>();
  const layout = computed(() => {
    return $storage?.layout?.layout;
  });

  const title = computed(() => {
    return $config.Title;
  });

  /** 动态title */
  function changeTitle(meta: routeMetaType) {
    const Title = getConfig().Title;
    if (Title) document.title = `${meta.title} | ${Title}`;
    else document.title = meta.title;
  }

  /** 退出登录 */
  function logout() {
    useUserStoreHook().logOut();
  }

  return {
    route,
    title,
    layout,
    logout,
    routers,
    $storage,
    changeTitle,
    username,
    // userAvatar,
    avatarsStyle,
    tooltipEffect
  };
}
