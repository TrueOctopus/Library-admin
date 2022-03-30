import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理面板', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '案例组件', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '表格', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '树状图', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '嵌套菜单',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '菜单1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '菜单1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: '菜单1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '菜单1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '菜单1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '菜单2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  }
]
export const asyncRoutes = [

  {
    path: '/users',
    component: Layout,
    redirect: '/users/userlist',
    meta: { title: '用户管理', icon: 'el-icon-s-help', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/table/index'),
        meta: { title: '读者列表', icon: 'table' }
      },

      {
        path: 'teacherlist',
        name: 'teacherlist',
        component: () => import('@/views/table/index'),
        meta: { title: '教职工读者证列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/resourcelist',
    meta: { title: '资源管理', icon: 'el-icon-s-help', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'resourcelist',
        name: 'resourcelist',
        component: () => import('@/views/table/index'),
        meta: { title: '电子资源', icon: 'table' }
      },

      {
        path: 'characteristic',
        name: 'characteristic',
        component: () => import('@/views/table/index'),
        meta: { title: '特色资源管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/announcement',
    component: Layout,
    redirect: '/announcement/newslist',
    meta: { title: '文章管理', icon: 'el-icon-s-help', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'newslist',
        name: 'newslist',
        component: () => import('@/views/table/index'),
        meta: { title: '新闻公告', icon: 'table' }
      },

      {
        path: 'lectures',
        name: 'lectures',
        component: () => import('@/views/table/index'),
        meta: { title: '活动讲座', icon: 'table' }
      },

      {
        path: 'lectures',
        name: 'lectures',
        component: () => import('@/views/table/index'),
        meta: { title: '阅读推广', icon: 'table' }
      },

      {
        path: 'lectures',
        name: 'lectures',
        component: () => import('@/views/table/index'),
        meta: { title: '读者服务', icon: 'table' },
        children: [
          {
            path: 'pictures',
            name: 'pictures',
            component: () => import('@/views/table/index'),
            meta: { title: '开馆时间', icon: 'table' }
          },

          {
            path: 'create',
            name: 'create',
            component: () => import('@/views/table/index'),
            meta: { title: '馆藏分布', icon: 'table' }
          },

          {
            path: 'create',
            name: 'create',
            component: () => import('@/views/table/index'),
            meta: { title: '借阅服务', icon: 'table' }
          },

          {
            path: 'create',
            name: 'create',
            component: () => import('@/views/table/index'),
            meta: { title: '预约服务', icon: 'table' }
          },

          {
            path: 'create',
            name: 'create',
            component: () => import('@/views/table/index'),
            meta: { title: '捐献', icon: 'table' }
          }
        ]
      },

      {
        path: 'create',
        component: () => import('@/views/article/create'),
        name: 'CreateArticle',
        meta: { title: '新建文章', icon: 'edit' }
      }
    ]
  },

  {
    path: '/page',
    component: Layout,
    redirect: '/page/pictures',
    meta: { title: '页面管理', icon: 'el-icon-s-help', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'pictures',
        name: 'pictures',
        component: () => import('@/views/table/index'),
        meta: { title: '图片管理', icon: 'table' }
      },

      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/table/index'),
        meta: { title: '底部栏', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
