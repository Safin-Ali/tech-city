import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from '../Pages/Home/Home';
import ProductsList from '../Layouts/Products-List';
import CartProducts from '../Layouts/Cart-Products';
function RoutesProv () {
    return (<BrowserRouter>
        <Routes>
            <Route path={`/`} element={<Home></Home>}/>
            <Route path={`/products/:brand/:device`} element={<ProductsList/>}/>
            <Route path={`/cart`} element={<CartProducts/>}/>
        </Routes>
    </BrowserRouter>
    )
};

RoutesProv.defaultProps = {}
export default RoutesProv;