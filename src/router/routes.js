const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home/:administratorId",
    name: "home",
    component: () => import("pages/home/home.vue"),
    meta: { title: "", isRouterAlive: false }
  },
  {
    path: "/counselor/:id",
    name: "counselor",
    component: () => import("pages/counselor/counselor.vue")
  },
  {
    path: "/business-auth/:id",
    name: "business-auth",
    component: () => import("pages/business-auth/index")
  },
  {
    path: "/activity/:id",
    name: "activity",
    component: () => import("pages/activity/activity.vue")
  },
  {
    path: "/activityLoc/:id",
    name: "activityLoc",
    component: () => import("pages/activity/activityLoc.vue")
  },
  {
    path: "/brand-home/:id",
    name: "brand-home",
    component: () => import("pages/brand-home/brand-home.vue")
  },
  {
    path: "/brand-bd/:id",
    name: "brand-bd",
    component: () => import("pages/brand-bd/brand-bd.vue")
  },
  {
    path: "/brand-pay/:id",
    name: "brand-pay",
    component: () => import("pages/brand-pay/brand-pay.vue")
  },
  {
    path: "/mind-map/:id",
    name: "mind-map",
    component: () => import("pages/mind-map/mind-map.vue")
  },
  {
    path: "/stocks/:id",
    name: "stocks",
    component: () => import("pages/stocks/stocks.vue")
  },
  {
    path: "/report/:id",
    name: "report",
    component: () => import("pages/report")
  },
  {
    path: "/service",
    name: "service",
    component: () => import("pages/service")
  },
  {
    path: "/pravice",
    name: "pravice",
    component: () => import("pages/pravice")
  },
  {
    path: "/invite-auth/:companyUrl",
    name: "invite-auth",
    component: () => import("pages/invite-auth")
  },
  {
    path: "/growingio/:userid",
    name: "growingio",
    component: () => import("pages/growingio")
  },
  {
    path: "/delete-tip",
    name: "delete-tip",
    component: () => import("pages/delete-tip")
  },
  {
    path: "/company-main/:id",
    name: "company-main",
    component: () => import("pages/company-main")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
