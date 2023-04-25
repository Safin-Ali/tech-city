import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from '../Pages/Home/Home';
function RoutesProv () {
    return (<BrowserRouter>
        <Routes>
            <Route path={`/`} element={<Home></Home>}/>
        </Routes>
    </BrowserRouter>
    )
};

RoutesProv.defaultProps = {}
export default RoutesProv;