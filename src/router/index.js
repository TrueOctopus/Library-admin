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
  }

]

export const asyncRoutes = [

  {
    path: '/users',
    component: Layout,
    redirect: '/users/userlist',
    meta: { title: '用户管理', icon: 'user', roles: ['admin'] },
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/user/readerList.vue'),
        meta: { title: '读者列表', icon: 'user' }
      },

      {
        path: 'teacherlist',
        name: 'teacherlist',
        component: () => import('@/views/table/index'),
        meta: { title: '教职工读者证列表', icon: 'user' }
      }
    ]
  },

  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/resourcelist',
    meta: { title: '资源管理', icon: 'tab', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'resourcelist',
        name: 'resourcelist',
        component: () => import('@/views/resource/resource'),
        meta: { title: '电子资源', icon: 'tab' }
      },

      {
        path: 'characteristic',
        name: 'characteristic',
        component: () => import('@/views/resource/characteristic'),
        meta: { title: '特色资源管理', icon: 'tab' }
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
        path: 'create',
        component: () => import('@/views/news/create'),
        name: 'CreateArticle',
        meta: { title: '新建文章', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/news/edit'),
        name: 'EditArticle',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/announcement/newslist' },
        hidden: true
      },
      {
        path: 'newslist',
        name: 'newslist',
        component: () => import('@/views/news/list'),
        meta: { title: '新闻管理', icon: 'table' }
      },

      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/table/index'),
        meta: { title: '读者服务', icon: 'table' },
        children: [
          {
            path: 'opentime',
            name: 'opentime',
            component: () => import('@/views/table/index'),
            meta: { title: '开馆时间', icon: 'table' }
          },

          {
            path: 'distribution',
            name: 'distribution',
            component: () => import('@/views/table/index'),
            meta: { title: '馆藏分布', icon: 'table' }
          },

          {
            path: 'borrowService',
            name: 'borrowService',
            component: () => import('@/views/table/index'),
            meta: { title: '借阅服务', icon: 'table' }
          },

          {
            path: 'reserve',
            name: 'reserve',
            component: () => import('@/views/table/index'),
            meta: { title: '预约服务', icon: 'table' }
          },

          {
            path: 'donation',
            name: 'donation',
            component: () => import('@/views/table/index'),
            meta: { title: '捐献', icon: 'table' }
          }
        ]
      }
    ]
  },

  {
    path: '/lectures',
    component: Layout,
    redirect: '/lectures/lecturesList',
    meta: { title: '活动讲座', icon: 'el-icon-s-help', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'create',
        component: () => import('@/views/lectures/create'),
        name: 'CreateLectures',
        meta: { title: '新建活动/讲座', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/lectures/edit'),
        name: 'EditLectures',
        meta: { title: '编辑活动/讲座', noCache: true, activeMenu: '/lectures/list' },
        hidden: true
      },
      {
        path: 'lecturesList',
        name: 'lecturesList',
        component: () => import('@/views/lectures/list'),
        meta: { title: '活动/讲座列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/publicity',
    component: Layout,
    redirect: '/publicity/publicityList',
    meta: { title: '阅读推广', icon: 'el-icon-s-help', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'create',
        component: () => import('@/views/publicity/create'),
        name: 'CreatePublicity',
        meta: { title: '新建文章', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/publicity/edit'),
        name: 'EditPublicity',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/publicity/list' },
        hidden: true
      },
      {
        path: 'publicityList',
        name: 'publicityList',
        component: () => import('@/views/publicity/list'),
        meta: { title: '推广书籍', icon: 'table' }
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
        path: 'bottom',
        name: 'bottom',
        component: () => import('@/views/table/index'),
        meta: { title: '底部栏', icon: 'table' }
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
