/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import 'quasar/dist/quasar.ie.polyfills.js'



import '@quasar/extras/material-icons/material-icons.css'



import '@quasar/extras/animate/slideInLeft.css'

import '@quasar/extras/animate/slideInRight.css'

import '@quasar/extras/animate/slideOutLeft.css'

import '@quasar/extras/animate/slideInUp.css'

import '@quasar/extras/animate/slideOutDown.css'


// We load Quasar stylesheet file
import 'quasar/dist/quasar.styl'




import 'src/css/app.styl'


import Vue from 'vue'
import createApp from './app.js'




import qboot_Booti18n from 'boot/i18n'

import qboot_Bootaxios from 'boot/axios'

import qboot_Bootplugins from 'boot/plugins'

import qboot_Bootecharts from 'boot/echarts'

import qboot_Bootwebview from 'boot/webview'

import qboot_Bootmindmap from 'boot/mindmap'

import qboot_Bootgallery from 'boot/gallery'

import qboot_Bootamap from 'boot/amap'










const { app, store, router } = createApp()



async function start () {
  
  let routeUnchanged = true
  const redirect = url => {
    routeUnchanged = false
    window.location.href = url
  }

  const urlPath = window.location.href.replace(window.location.origin, '')
  const bootFiles = [qboot_Booti18n,qboot_Bootaxios,qboot_Bootplugins,qboot_Bootecharts,qboot_Bootwebview,qboot_Bootmindmap,qboot_Bootgallery,qboot_Bootamap]

  for (let i = 0; routeUnchanged === true && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue,
        ssrContext: null,
        redirect,
        urlPath
      })
    }
    catch (err) {
      if (err && err.url) {
        window.location.href = err.url
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (routeUnchanged === false) {
    return
  }
  

  

    

    

      new Vue(app)

    

  

}

start()
