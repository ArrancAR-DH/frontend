import "react-toastify/dist/ReactToastify.css";
function convertirPrecioIntAPesosStr(precio) {
    return precio?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// defualt export
export default {
    convertirPrecioIntAPesosStr
}

