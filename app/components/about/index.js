import { app } from '../../app';
import { AboutController } from './about.controller';

const AboutComponent = {
    templateUrl: 'components/about/about.html',
    controller: AboutController
};

app.component('aboutUs', AboutComponent);
