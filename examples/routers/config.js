// @ts-nocheck
import Vue from 'vue'
// @ts-ignore
import NavConfig from './nav.config.yml'

const LOAD_MAP = {
  zh: name => {
    return () => import(`../pages/zh/${name}.vue`)
    // return r => require.ensure([], () => r(require(`examples/pages/zh/${name}.vue`)), 'zh')
  },
  en: name => {
    return () => import(`../pages/en/${name}.vue`)
    // return r => require.ensure([], () => r(require(`examples/pages/en/${name}.vue`)), 'en')
  },
}

const load = function(lang, path) {
  return LOAD_MAP[lang](path)
}

const LOAD_DOCS_MAP = {
  zh: path => {
    // return () => import(`../docs/zh/${path}.md`)
    return r => require.ensure([], () => r(require(`../docs/zh/${path}.md`)), 'zh')
  },
  en: path => {
    // return () => import(`../docs/en/${path}.md`)
    return r => require.ensure([], () => r(require(`../docs/en/${path}.md`)), 'en')
  },
}

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path)
}

const regeisterRoute = navConfig => {
  const routes = []
  const parentRoutes = {}
  const pageNavs = NavConfig['zh']

  for (const pageName in pageNavs) {
    pageNavs[pageName].forEach(nav => {
      const parentName = nav.name
      parentRoutes[`${parentName}`] = parentRoutes[`${parentName}`] || addParentRoute(parentName)

      if (nav.groups) {
        nav.groups.forEach(group => {
          group['items'].forEach(item => {
            addRoute(parentName, item)
          })
        })
      } else if (nav.items) {
        nav['items'].forEach(item => {
          addRoute(parentName, item)
        })
      }
    })
  }

  function addParentRoute(parentName) {
    return {
      name: `${parentName}`,
      path: `/${parentName.toLowerCase()}`,
      component: load('zh', parentName.toLowerCase()),
      children: [],
    }
  }

  function addRoute(parentName, item) {
    const itemName = item.name
    if (item.type && item.type === 'vue') {
      const fileName = item.file || itemName
      parentRoutes[`${parentName}`].children.push({
        path: `${itemName.toLowerCase()}`,
        name: `${itemName}`,
        // component: () => import(`../pages/zh/${fileName.toLowerCase()}.vue`),
        component: r => require.ensure([], () => r(require(`../pages/zh/${fileName.toLowerCase()}.vue`)), 'zh-CN'),
      })
    } else {
      const fileName = item.file || itemName
      parentRoutes[`${parentName}`].children.push({
        path: `${itemName.toLowerCase()}`,
        name: `${itemName}`,
        component: loadDocs('zh', fileName.toLowerCase()),
        // component: () => import(/* webpackInclude: /\.md$/ */ `../docs/zh/${fileName.toLowerCase()}.md`),
      })
    }
  }

  for (const key in parentRoutes) {
    if (parentRoutes.hasOwnProperty(key)) {
      routes.push(parentRoutes[key])
    }
  }

  return routes
}

let routes = regeisterRoute(NavConfig)

debugger
routes.forEach(page => {
  if (page.path === '/guide') {
    page.children.push({
      path: '',
      name: 'Guide',
      redirect: { name: page.children[0].name },
    })
  } else if (page.path === '/component') {
    page.children.push({
      path: '',
      name: 'Component',
      redirect: { name: page.children[0].name },
    })
  } else if (page.path === '/resource') {
    page.children.push({
      path: '',
      name: 'Resource',
      redirect: { name: page.children[0].name },
    })
  }
})

// let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'en-US'
// let defaultPath = '/en-US'
// if (userLanguage.indexOf('zh-') !== -1) {
//   defaultPath = '/zh-CN'
// } else if (userLanguage.indexOf('es') !== -1) {
//   defaultPath = '/es'
// } else if (userLanguage.indexOf('fr') !== -1) {
//   defaultPath = '/fr-FR'
// }

const defaultPath = '/guide'

routes = routes.concat([
  {
    path: '/',
    redirect: defaultPath,
  },
  {
    path: '*',
    redirect: defaultPath,
  },
])
console.log(routes)

export default routes
