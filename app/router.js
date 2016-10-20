'use strict';

function RouterConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
     $locationProvider.html5Mode(true);
     $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: `<home></home>`
        })

        .state('about', {
            url: '/about',
            template: `<about-us></about-us>`
        })
    ;
}

export { RouterConfig };
