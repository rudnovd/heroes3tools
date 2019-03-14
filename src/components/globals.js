import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faQuestionCircle, faSync } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Multiselect from 'vue-multiselect'

import 'vue-multiselect/dist/vue-multiselect.min.css'

Vue.component('multiselect', Multiselect)

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faQuestionCircle, faSync)
