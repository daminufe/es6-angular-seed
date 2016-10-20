'use strict';

import { app } from '../../app';

class Controller {
    constructor () {

    }
}

const AppComponent = {
    templateUrl: 'components/app/app.html',
    controller: Controller
};

app.component('app', AppComponent);
