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
        component: () => import('@/views/user/readerList'),
        meta: { title: '读者列表', icon: 'user' }
      },

      {
        path: 'stafflist',
        name: 'stafflist',
        component: () => import('@/views/staff/staffList'),
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
        meta: { title: '特色资源管理', icon: 'tab' },
        redirect: '/resource/characteristic/achievement',
        component: () => import('@/views/resource/characteristic/characteristic'),
        children: [
          {
            path: 'achievement',
            name: 'achievement',
            component: () => import('@/views/resource/characteristic/achievement'),
            meta: { title: '成果', icon: 'table', noCache: true }
          },

          {
            path: 'award',
            name: 'award',
            component: () => import('@/views/resource/characteristic/award'),
            meta: { title: '成果奖励', icon: 'table', noCache: true }
          },

          {
            path: 'book',
            name: 'book',
            component: () => import('@/views/resource/characteristic/book'),
            meta: { title: '书籍', icon: 'table', noCache: true }
          },

          {
            path: 'meeting',
            name: 'meeting',
            component: () => import('@/views/resource/characteristic/meeting'),
            meta: { title: '会议', icon: 'table', noCache: true }
          },

          {
            path: 'papers',
            name: 'papers',
            component: () => import('@/views/resource/characteristic/papers'),
            meta: { title: '期刊论文', icon: 'table', noCache: true }
          },

          {
            path: 'patent',
            name: 'patent',
            component: () => import('@/views/resource/characteristic/patent'),
            meta: { title: '专利', icon: 'table', noCache: true }
          },

          {
            path: 'projectReport',
            name: 'projectReport',
            component: () => import('@/views/resource/characteristic/projectReport'),
            meta: { title: '课题报告', icon: 'table', noCache: true }
          },

          {
            path: 'technology',
            name: 'technology',
            component: () => import('@/views/resource/characteristic/technology'),
            meta: { title: '科技成果', icon: 'table', noCache: true }
          }
        ]
      }
    ]
  },

  {
    path: '/announcement',
    component: Layout,
    redirect: '/announcement/newslist',
    meta: { title: '新闻公告管理', icon: 'documentation', roles: ['admin', 'editor'] },
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
      }

    ]
  },

  {
    path: '/lectures',
    component: Layout,
    redirect: '/lectures/lecturesList',
    meta: { title: '活动讲座', icon: 'el-icon-date', roles: ['admin', 'editor'] },
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
    meta: { title: '阅读推广', icon: 'el-icon-reading', roles: ['admin', 'editor'] },
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
    path: '/pages',
    component: Layout,
    redirect: '/pages/pageList',
    meta: { title: '页面管理', icon: 'el-icon-document', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'pageList',
        name: 'pageList',
        component: () => import('@/views/pages/list'),
        meta: { title: '页面一览', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'create',
        component: () => import('@/views/pages/create'),
        name: 'CreatePages',
        meta: { title: '新建文章', icon: 'edit', roles: ['admin'] }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/pages/edit'),
        name: 'EditPage',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/pages/pageList' },
        hidden: true
      },

      {
        path: 'introduction',
        name: 'introduction',
        component: () => import('@/views/pages/edit'),
        meta: { title: '本馆概况', icon: 'table' }
      },

      {
        path: 'resouce',
        name: 'resouce',
        component: () => import('@/views/pages/edit'),
        meta: { title: '资源', icon: 'table' },
        children: [
          {
            path: 'collection',
            name: 'collection',
            component: () => import('@/views/pages/edit'),
            meta: { title: '馆藏目录', icon: 'table', noCache: true }
          },

          {
            path: 'characteristicPage',
            name: 'characteristicPage',
            component: () => import('@/views/pages/edit'),
            meta: { title: '特色资源', icon: 'table', noCache: true }
          },

          {
            path: 'delivery',
            name: 'delivery',
            component: () => import('@/views/pages/edit'),
            meta: { title: '文献传递', icon: 'table', noCache: true }
          }
        ]
      },

      {
        path: 'cademicianIntroduction',
        name: 'AcademicianIntroduction',
        component: () => import('@/views/pages/edit'),
        meta: { title: '院士介绍', icon: 'table' }
      },

      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/pages/edit'),
        meta: { title: '读者服务', icon: 'table' },
        children: [
          {
            path: 'opentime',
            name: 'opentime',
            component: () => import('@/views/pages/edit'),
            meta: { title: '开馆时间', icon: 'table', noCache: true }
          },

          {
            path: 'distribution',
            name: 'distribution',
            component: () => import('@/views/pages/edit'),
            meta: { title: '馆藏分布', icon: 'table', noCache: true }
          },

          {
            path: 'borrowService',
            name: 'borrowService',
            component: () => import('@/views/pages/edit'),
            meta: { title: '借阅服务', icon: 'table', noCache: true },
            children: [
              {
                path: 'borrowRule',
                name: 'borrowRule',
                component: () => import('@/views/pages/edit'),
                meta: { title: '借阅规则', icon: 'table', noCache: true }
              },

              {
                path: 'borrowProcess',
                name: 'borrowProcess',
                component: () => import('@/views/pages/edit'),
                meta: { title: '借阅流程', icon: 'table', noCache: true }
              }
            ]
          },

          {
            path: 'reserve',
            name: 'reserve',
            component: () => import('@/views/pages/edit'),
            meta: { title: '预约服务', icon: 'table', noCache: true },
            children: [
              {
                path: 'seatOrder',
                name: 'seatOrder',
                component: () => import('@/views/pages/edit'),
                meta: { title: '座位预约', icon: 'table', noCache: true }
              },

              {
                path: 'labOrder',
                name: 'labOrder',
                component: () => import('@/views/pages/edit'),
                meta: { title: '研修室预约', icon: 'table', noCache: true }
              },

              {
                path: 'lectureOrder',
                name: 'lectureOrder',
                component: () => import('@/views/pages/edit'),
                meta: { title: '讲座预约', icon: 'table', noCache: true }
              }
            ]
          },

          {
            path: 'donation',
            name: 'donation',
            component: () => import('@/views/pages/edit'),
            meta: { title: '捐赠', icon: 'table', noCache: true }
          }
        ]
      },

      {
        path: 'reading',
        name: 'reading',
        component: () => import('@/views/pages/edit'),
        meta: { title: '阅读推广', icon: 'table' },
        children: [
          {
            path: 'recommendedReading',
            name: 'recommendedReading',
            component: () => import('@/views/pages/edit'),
            meta: { title: '图书推荐', icon: 'table', noCache: true }
          },

          {
            path: 'bookReport',
            name: 'bookReport',
            component: () => import('@/views/pages/edit'),
            meta: { title: '新书通报', icon: 'table', noCache: true }
          },

          {
            path: 'mainActivity',
            name: 'mainActivity',
            component: () => import('@/views/pages/edit'),
            meta: { title: '主题活动', icon: 'table', noCache: true },
            children: [
              {
                path: 'readingMonth',
                name: 'readingMonth',
                component: () => import('@/views/pages/edit'),
                meta: { title: '读书月', icon: 'table', noCache: true }
              }
            ]
          }
        ]
      },

      {
        path: 'studysupport',
        name: 'studysupport',
        component: () => import('@/views/pages/edit'),
        meta: { title: '学习支持', icon: 'table' },
        children: [
          {
            path: 'admissionEducation',
            name: 'admissionEducation',
            component: () => import('@/views/pages/edit'),
            meta: { title: '新生入馆教育', icon: 'table', noCache: true }
          },
          {
            path: 'readerTraining',
            name: 'readerTraining',
            component: () => import('@/views/pages/edit'),
            meta: { title: '读者培训', icon: 'table', noCache: true }
          },
          {
            path: 'VPNusage',
            name: 'VPNusage',
            component: () => import('@/views/pages/edit'),
            meta: { title: '校外访问', icon: 'table', noCache: true }
          }
        ]
      },

      {
        path: 'commentHub',
        name: 'commentHub',
        component: () => import('@/views/pages/edit'),
        meta: { title: '反馈中心', icon: 'table' },
        children: [
          {
            path: 'common',
            name: 'common',
            component: () => import('@/views/pages/edit'),
            meta: { title: '常见问题', icon: 'table', noCache: true }
          }
        ]
      }

      // {
      //   path: 'bottom',
      //   name: 'bottom',
      //   component: () => import('@/views/pages/edit'),
      //   meta: { title: '底部栏', icon: 'table', noCache: true }
      // }
    ]
  },

  {
    path: '/file',
    component: Layout,
    redirect: '/file/filelist',
    meta: { title: '文件/图片管理', icon: 'el-icon-folder', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/file/upload'),
        meta: { title: '文件/图片上传', icon: 'table' }
      },
      {
        path: 'filelist',
        name: 'filelist',
        component: () => import('@/views/file/fileList'),
        meta: { title: '文件列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/commentlist',
    meta: { title: '留言板管理', icon: 'el-icon-edit', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'commentlist',
        name: 'commentlist',
        component: () => import('@/views/comment/commentList'),
        meta: { title: '留言列表', icon: 'el-icon-edit' }
      }
    ]
  },

  {
    path: '/log',
    component: Layout,
    redirect: '/log/loglist',
    meta: { title: '日志管理', icon: 'table', roles: ['admin'] },
    children: [
      {
        path: 'loglist',
        name: 'loglist',
        component: () => import('@/views/log/logList'),
        meta: { title: '日志管理', icon: 'table' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.gitee.io/vue-element-admin-site/zh/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin'] }
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
