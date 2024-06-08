export const routes = {
    home: '/',
    about: '/about',
    legal: '/legal',
    detail:'/cars/:id',
    gallery: '/cars/:id/images',
    search: '/search/:search?',
    admin: '/administracion',
    listVehicles: '/administracion/listvehicles',
    categories: '/administracion/categories',
    listUsers: '/administracion/listusers',
    login: '/login', 
    register: '/register',
    favs: '/favs', 
    url_allVehicles: `http://localhost:8080/vehicle/all`,
    url_allBrands: `http://localhost:8080/brand/all`,
    url_allModels: `http://localhost:8080/model/all`,
    url_allTypes: `http://localhost:8080/type/all`,
    url_rest_api: `http://localhost:8080/auth`,
    url_AllUsers: `http://localhost:8080/user/all`,
    url_postCar:  `http://localhost:8080/vehicle`,
    url_notificate: `http://localhost:8080/notification/send`

} 
