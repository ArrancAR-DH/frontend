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
    profile: '/profile',

    // API and SPA [URLs] --> Entornos locales ( Front y Back con localhost)
    url_base: `http://localhost:8080`,
    url_front:`http://localhost:5173`,

    // API and SPA [URLs] --> Entronos Web ( Front y Back deployados )
    // url_base:`http://34.234.216.198:8080`,
    // url_front: `http://34.234.216.198`,

    url_postCloudinary: `http://api.cloudinary.com/v1_1/dyypwqwgo/image/upload`,
    url_allVehicles: `${this.url_base}/vehicle/all`,
    url_allBrands: `${this.url_base}/brand/all`,
    url_allModels: `${this.url_base}/model/all`,
    url_allTypes: `${this.url_base}/type/all`,
    url_allFeatures: `${this.url_base}/feature/all`,
    url_rest_api: `${this.url_base}/auth`,
    url_AllUsers: `${this.url_base}/user/all`,
    url_postCar:  `${this.url_base}/vehicle`,
    url_deleteCar:  `${this.url_base}/vehicle/delete`,
    url_notificate: `${this.url_base}/notification/send`,
    url_userLike: `${this.url_base}/user/like`,
    url_userDislike: `${this.url_base}/user/dislike`,
    url_userUpdate: `${this.url_base}/user/update`,
} 
