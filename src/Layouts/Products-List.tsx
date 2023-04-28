import LeftSideBar from "../Components/App-Bar/Left-Side-Bar";
import Navbar from "../Components/App-Bar/Navbar";
import Option from "../Components/Filter-Option/Option";
import { useContext } from 'react';
import { ExtraDataContext } from "../Context/Extra-Data";

type handleOptionFuncType = React.MouseEvent<HTMLLIElement> | boolean

function ProductsList() {

    const { filterOption } = useContext(ExtraDataContext);

    const handleOption = (e: handleOptionFuncType): void => {
        if (typeof e !== 'boolean') {
            const li = e.target as HTMLLIElement;
            const value = li.getAttribute('data-value');
            console.log(value);
        } else {
            console.log(e);
        }
    };

    return (
        <section>
            <Navbar></Navbar>
            <div className={ `flex` }>
                <LeftSideBar className={ `left-side-bar` }>
                    <div>
                        Left Side
                    </div>
                </LeftSideBar>

                <div className={ `md:ml-[20%] w-full` }>
                    <div className={ `filter-nav` }>
                        <Option optionList={ filterOption?.activity } callBackFunc={ handleOption } children={ `Activity` } />

                        <Option optionList={ filterOption?.device } callBackFunc={ handleOption } children={ `Device` } />

                        <Option optionList={ filterOption?.device } callBackFunc={ handleOption } singleOption={ true } children={ `Device` } />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ProductsList;