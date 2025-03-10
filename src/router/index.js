import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const routes = [
  // 欢迎页面
  {
    path: "/",
    name: "welcome",
    component: () => import("@/views/Welcome.vue"),
  },

  // 用户导航条
  {
    path: "/user/head",
    name: "head",
    component: () => import("@/views/UserHead.vue"),
  },

  // 标注员获取任务
  {
    path: "/user/get/task/:id/:role",
    name: "get_task",
    meta: { requiresAuth: true },
    component: () => import("@/views/user_work/Annotator_get_task.vue"),
  },

  // 标注员获取任务详情
  {
    path: "/annotator/get/task/info/:taskId",
    name: "annotator_get_task_info",
    meta: { requiresAuth: true },
    component: () => import("@/views/task/TaskInfo.vue"),
  },

  // 标注员和管理员查看地图
  {
    path: "/user/map",
    name: "user_map",
    meta: { requiresAuth: true },
    component: () => import("@/views/Map.vue"),
  },
  {
    path: "/admin/map",
    name: "admin_map",
    meta: { requiresAuth: true },
    component: () => import("@/views/Map.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/Map.vue"),
  },

  // 标注员和审核员工作界面
  {
    path: "/work/annotator/:taskId",
    name: "annotator_work",
    meta: { requiresAuth: true },
    component: () => import("@/views/Annotator_work.vue"),
  },
  {
    path: "/work/checker/:taskId",
    name: "checker_work",
    meta: { requiresAuth: true },
    component: () => import("@/views/Checker_work.vue"),
  },

  // 用户任务列表
  {
    path: "/user/task/list/:id/:role",
    name: "task_list",
    meta: { requiresAuth: true },
    component: () => import("@/views/task/UserTask.vue"),
  },

  // 管理员工作界面
  {
    path: "/admin/work",
    name: "admin_work",
    meta: { requiresAuth: true },
    component: () => import("@/views/Admin_work.vue"),
  },

  // 管理员导航
  {
    path: "/admin/head",
    name: "admin_head",
    meta: { requiresAuth: true },
    component: () => import("@/views/AdminHead.vue"),
  },

  // 管理员任务列表
  {
    path: "/admin/task_list",
    name: "admin_task_list",
    meta: { requiresAuth: true },
    component: () => import("@/views/user_work/Admin_tasklist.vue"),
  },

  // 管理员任务详情
  {
    path: "/admin/task/info/:taskId",
    name: "task_info",
    meta: { requiresAuth: true },
    component: () => import("@/views/task/TaskInfo.vue"),
  },

  // 用户信息中心
  {
    path: "/user/info/:id/:role",
    name: "user_info",
    meta: { requiresAuth: true },
    component: () => import("@/views/user_model/UserInformation.vue"),
  },

  // 登录模块
  {
    path: "/log",
    name: "log",
    props: true,
    redirect: "/log/choose",
    children: [
      {
        path: "choose",
        name: "LogChoice",
        component: () => import("@/views/LogChoice.vue"),
      },
      {
        path: "user",
        name: "UserLog",
        component: () => import("@/views/user_model/UserLog.vue"),
      },
      {
        path: "admin",
        name: "AdminLog",
        component: () => import("@/views/user_model/AdminLog.vue"),
      },
    ],
  },

  // 注册模块
  {
    path: "/register",
    name: "register",
    props: true,
    redirect: "/register/choose",
    children: [
      {
        path: "choose",
        name: "RegisterChoice",
        component: () => import("@/views/RegisterChoice.vue"),
      },
      {
        path: "user",
        name: "UserRegister",
        component: () => import("@/views/user_model/UserRegister.vue"),
      },
      {
        path: "admin",
        name: "AdminRegister",
        component: () => import("@/views/user_model/AdminRegister.vue"),
      },
    ],
  },

  // 用户组织管理
  {
    path: "/user/organization",
    name: "UserOrganization",
    meta: { requiresAuth: true },
    component: () => import("@/views/user_model/UserOrganization.vue"),
  },
  {
    path: "/user/organization/apply",
    name: "JoinOrgnizationModal",
    meta: { requiresAuth: true },
    component: () => import("@/views/user_model/JoinOrganizationModal.vue"),
  },

  // 用户任务中心
  {
    path: "/user/task/list",
    name: "UserTask",
    meta: { requiresAuth: true },
    component: () => import("@/views/task/UserTask.vue"),
  },

  // 用户信箱
  {
    path: "/user/mailbox",
    name: "UserMailbox",
    meta: { requiresAuth: true },
    component: () => import("@/views/user_model/UserMailbox.vue"),
  },

  // 邮箱验证
  {
    path: "/邮箱验证",
    name: "UserMailboxCheck",
    meta: { requiresAuth: true },
    component: () => import("@/views/user_model/UserMailboxCheck.vue"),
  },

  // 管理员中心
  {
    path: "/admin",
    name: "admin",
    props: true,
    redirect: "/admin/info",
    meta: { requiresAuth: true },
    children: [
      {
        path: "info",
        name: "admin_info",
        component: () => import("@/views/user_model/AdminInformation.vue"),
        props: true,
      },
      {
        path: "organization",
        name: "admin_organization",
        component: () => import("@/views/user_model/AdminOrganization.vue"),
      },
      {
        path: "member",
        name: "admin_member",
        component: () => import("@/views/user_model/AdminMember.vue"),
      },
      {
        path: "mailbox",
        name: "admin_mailbox",
        component: () => import("@/views/user_model/AdminMailbox.vue"),
      },
      {
        path: "register",
        name: "organization_register",
        component: () => import("@/views/user_model/OrganizationRegister.vue"),
      },
    ],
  },

  // 积分中心
  {
    path: "/user/point/center",
    name: "PointCenter",
    props: true,
    meta: { requiresAuth: true },
    component: () => import("@/views/points/PointsCenter.vue"),
  },
  {
    path: "/admin/point/center",
    name: "AdminPoint",
    props: true,
    meta: { requiresAuth: true },
    component: () => import("@/views/points/AdminPointsCenter.vue"),
  },

  // 404 路由重定向
  {
    path: "/:pathMatch(.*)*",
    redirect: "/log/choose",
    name: "notMatch",
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth) {
    if (!userStore.getToken && to.path !== "/log/choose") {
      return { path: "/log/choose" };
    }
  }
});

export default router;
