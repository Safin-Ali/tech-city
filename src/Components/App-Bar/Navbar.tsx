import { Link } from 'react-router-dom';
import SearchBar from './Search-Bar';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

function Navbar({bgColor}:{bgColor?:string}) {
    const [navExpand,setNavExpand] = useState<boolean>(false);
    return (
        <header className={ `px-[5%] ${bgColor && bgColor} sticky top-0 z-[100] shadow w-full` }>
            <nav className={ `h-[70px] flex-v-center gap-5 justify-between` }>

                {/* brand text */ }
                <div className={ `flex-full-center gap-3` }>
                    <div>
                        <Link className={ `font-mincho whitespace-nowrap text-lg md:text-3xl font-bold` } to={ `/` }><span>Tech</span> <span className={ `text-blue-900` }>City</span></Link>
                    </div>

                    <div>
                        <SearchBar />
                    </div>
                </div>

                {/* expand bar */ }

                <div className={`flex-full-center`}>
                    <div onClick={()=>setNavExpand(!navExpand)} className={`${navExpand && 'text-blue-800'} md:hidden`}>
                        <FaBars size={ 25 } />
                    </div>

                    <div className={ `res-nav ${navExpand && 'nav-expand'}` }>
                        <ul className={ `navbar-items-container` }>
                            <li className={`navbar-items`}><Link className={ `navbar-link` } to={ `/products/all/all` }>products</Link></li>
                            <li className={`navbar-items`}><Link className={ `navbar-link` } to={ `/products/all/all` }>Cart</Link></li>
                            <li className={`navbar-items`}><Link className={ `navbar-link` } to={ `/products/all/all` }>Development</Link></li>
                            <li className={`navbar-items`}><Link className={ `navbar-link` } to={ `/products/all/all` }>products</Link></li>
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