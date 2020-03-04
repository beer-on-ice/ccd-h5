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


import Vue from 'vue'

import {Quasar,QLayout,QPageContainer,QPage,QTabs,QTab,QRouteTab,QTabPanels,QTabPanel,QIcon,QToggle,QCheckbox,QSlideTransition,QDialog,QInfiniteScroll,QBtn,QDate,QTime,QCard,QCardSection,QCardActions,QSpinnerDots,QInput,Ripple,ClosePopup,Notify,LocalStorage,Loading} from 'quasar'


Vue.use(Quasar, { config: {"notify":{"position":"top","timeout":500},"loading":{"spinner":"QSpinnerDots","spinnerColor":"primary","spinnerSize":"50"}},components: {QLayout,QPageContainer,QPage,QTabs,QTab,QRouteTab,QTabPanels,QTabPanel,QIcon,QToggle,QCheckbox,QSlideTransition,QDialog,QInfiniteScroll,QBtn,QDate,QTime,QCard,QCardSection,QCardActions,QSpinnerDots,QInput},directives: {Ripple,ClosePopup},plugins: {Notify,LocalStorage,Loading} })
