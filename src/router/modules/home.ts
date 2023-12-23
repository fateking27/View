const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/new",
  meta: {
    icon: "homeFilled",
    title: "首页",
    rank: 0
  },
  children: [
    {
      path: "/new",
      name: "New",
      component: () => import("@/views/new/index.vue"),
      meta: {
        title: "首页",
        showLink: false
      }
    },
    {
      path: "/introduce",
      name: "Introduce",
      component: () => import("@/views/introduce/index.vue"),
      meta: {
        title: "门户及项目介绍",
        showLink: false
      }
    },
    {
      path: "/results",
      name: "Results",
      component: () => import("@/views/results/index.vue"),
      meta: {
        title: "成果展示",
        showLink: false
      }
    },
    {
      path: "/display",
      name: "Display",
      component: () => import("@/views/results/display/index.vue"),
      meta: {
        title: "成果展示",
        showLink: false
      }
    },
    {
      path: "/information/:id",
      name: "Information",
      component: () => import("@/views/new/information/index.vue"),
      meta: {
        title: "新闻信息",
        showLink: false
      }
    },
    {
      path: "/service",
      name: "Service",
      component: () => import("@/views/service/index.vue"),
      meta: {
        title: "对外服务",
        showLink: false
      }
    },
    {
      path: "/dynamic",
      name: "Dynamic",
      component: () => import("@/views/new/dynamic/index.vue"),
      meta: {
        title: "工作动态",
        showLink: false
      }
    },
    {
      path: "/progress",
      name: "Progress",
      component: () => import("@/views/new/progress/index.vue"),
      meta: {
        title: "进展成效",
        showLink: false
      }
    },
    {
      path: "/detail",
      name: "Detail",
      component: () => import("@/views/introduce/detail/index.vue"),
      meta: {
        title: "项目介绍",
        showLink: false
      }
    },
    {
      path: "/meaning",
      name: "Meaning",
      component: () => import("@/views/introduce/meaning/index.vue"),
      meta: {
        title: "建设意义",
        showLink: false
      }
    },
    {
      path: "/expectation",
      name: "Expectation",
      component: () => import("@/views/introduce/expectation/index.vue"),
      meta: {
        title: "预期成果",
        showLink: false
      }
    },
    {
      path: "/fix",
      name: "Fix",
      component: () => import("@/views/results/fix/index.vue"),
      meta: {
        title: "预期成果",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
