import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Wsp from '../Wsp'

const Layout = () => {
    return (
        <div>
            <Header />
            <Wsp/>
            <Outlet />
            <Footer />
        </div>
    )
}
export default Layout;