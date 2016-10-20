'use strict';

import 'angular';
import 'angular-animate';
import 'angular-toastr';
import 'angulartics';
import 'angulartics-google-analytics';
import 'angular-ui-router';
import { RouterConfig } from './router.js';

//Bootstrap 4 requirements
window.Tether = require('tether');
window.$ = window.jQuery = require('jquery');
require('bootstrap');

const app = angular.module('app', [
    'ngAnimate',
    'toastr',
    'angulartics',
    'angulartics.google.analytics',
    'ui.router'
]);

app.config(RouterConfig);

export { app };
