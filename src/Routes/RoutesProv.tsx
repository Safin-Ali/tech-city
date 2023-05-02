import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from '../Pages/Home/Home';
import ProductsList from '../Layouts/Products-List';
function RoutesProv () {
    return (<BrowserRouter>
        <Routes>
            <Route path={`/`} element={<Home></Home>}/>
            <Route path={`/products/:brand/:device`} element={<ProductsList/>}/>
        </Routes>
    </BrowserRouter>
    )
};

RoutesProv.defaultProps = {}
export default RoutesProv;