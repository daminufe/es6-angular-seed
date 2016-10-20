import { app } from '../../app';
import { HomeController } from './home.controller';

const HomeComponent = {
    templateUrl: 'components/home/home.html',
    controller: HomeController
};

app.component('home', HomeComponent);
