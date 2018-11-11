export default {
    debug: false,
    testing: false,
    apiUrl: 'http://localhost:8080/',
    endpoint: 'api',
    configureEndpoints: ['api'],
    loginUrl: 'api/login',
    authHeader: 'X-Auth-Token',
    authTokenType: '',
    googleMapsApiKey: '',
    routes: [
        {name: 'home', title: 'Home', nav: true, icon: 'home', auth: false},
        // {name: 'settings', title: 'My Settings', nav: true, icon: 'user', auth: true},
        {name: 'http://www.churchconnectapp.org/giving-back/', title: 'Giving', nav: true, icon: 'heart', auth: false},
        {name: 'contact', title: 'Contact', nav: true, icon: 'phone', auth: false},
        {name: 'login', title: 'Login', auth: false},
        {name: 'login/:token', title: 'Login', auth: false},
        {name: 'events/list', title: 'Events', auth: false},
        {name: 'events/show/:id', title: 'Event', auth: false},
        {name: 'post-groups/show/:id', title: 'Posts Group', auth: false},
        {name: 'posts/show/:id', title: 'Post', auth: false},
        {name: 'prayer-requests/form', title: 'Submit Prayer Request', auth: false},
        {name: 'prayer-requests/list', title: 'Prayer Requests', auth: false},
        {name: 'prayer-requests/show/:id', title: 'Prayer Requests', auth: false}
    ],
    tabs: [
        {label: 'Home', href: '#/home', icon: 'home'},
        {label: 'Giving', href: 'http://www.churchconnectapp.org/giving-back/', icon: 'heart'},
        {label: 'Calendar', href: '#/events/list', icon: 'calendar'},
        {label: 'Contact', href: '#/contact', icon: 'phone'}
    ]
};
