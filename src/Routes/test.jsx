import axios from 'axios';

// Codifica las credenciales en Base64
const username = 'tu-usuario';
const password = 'tu-contraseña';
const token = Buffer.from(${username}:${password}, 'utf8').toString('base64');

// Configura los encabezados con Basic Auth
const config = {
    headers: {
        'Authorization': Basic ${token}
    }
};

// Realiza la solicitud POST
axios.post('http://tu-url-api/', {
    // Datos que deseas enviar en la solicitud
    data: {
        key1: 'valor1',
        key2: 'valor2'
    }
}, config)
.then(response => {
    console.log('Respuesta:', response.data);
})
.catch(error => {
    console.error('Error:', error);
});