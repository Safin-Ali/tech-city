import { Link, useLocation } from 'react-router-dom';
import SearchBar, { SearchBarPropsType } from './Search-Bar';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

interface PropsType extends SearchBarPropsType {
    bgColor?: string,
}

function Navbar({ bgColor,handleSearchFeild }: PropsType) {
    const [navExpand, setNavExpand] = useState<boolean>(false);
    const location = useLocation();
    return (
        <header className={ `px-[5%] ${bgColor && bgColor} sticky top-0 z-[100] shadow w-full` }>
            <nav className={ `h-[70px] flex-v-center gap-5 justify-between` }>

                {/* brand text */ }
                <div className={ `flex-full-center gap-3` }>
                    <div>
                        <Link className={ `font-mincho whitespace-nowrap text-lg md:text-3xl font-bold` } to={ `/` }><span>Tech</span> <span className={ `text-blue-900` }>City</span></Link>
                    </div>

                    {/* search bar */ }

                    {
                        location.pathname.includes('products')
                        &&
                        <div>
                            <SearchBar handleSearchFeild={handleSearchFeild}/>
                        </div>
                    }
                </div>

                {/* expand bar */ }

                <div className={ `flex-full-center` }>
                    <div onClick={ () => setNavExpand(!navExpand) } className={ `${navExpand && 'text-blue-800'} md:hidden` }>
                        <FaBars size={ 25 } />
                    </div>

                    <div className={ `res-nav ${navExpand && 'nav-expand'}` }>
                        <ul className={ `navbar-items-container` }>

                            <li className={ `navbar-items` }>
                                <Link className={ `navbar-link ${location.pathname.includes('products') && 'navbar-link-active'}` } to={ `/products/all/all` }>
                                    products
                                </Link>
                            </li>

                            <li className={ `navbar-items` }>
                                <Link className={ `navbar-link ${location.pathname.includes('cart') && 'navbar-link-active'}` } to={ `/products/cart` }>
                                    Cart
                                </Link>
                            </li>

                            <li className={ `navbar-items` }>
                                <Link className={ `navbar-link ${location.pathname.includes('development') && 'navbar-link-active'}` } to={ `/development` }>Development
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={ `navbar-blur -z-10` }></div>
        </header>
    );
};

Navbar.defaultProps = {}
export default Navbar;