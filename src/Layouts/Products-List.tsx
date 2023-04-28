import LeftSideBar from "../Components/App-Bar/Left-Side-Bar";
import Navbar from "../Components/App-Bar/Navbar";
import Option from "../Components/Filter-Option/Option";
import { useContext } from 'react';
import { ExtraDataContext } from "../Context/Extra-Data";
import LeftSide from "./Left-Side-Bar";
import { useProductsDataQuery } from "../Redux/end-point/products-data";
import ProductCardSkeleton from "../Components/Card/ProductCardSkeleton";
import ProductCard from "../Components/Card/ProductCard";

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

    const { data: prodData, isLoading: prodDataLoading } = useProductsDataQuery();

    return (
        <main>
            <Navbar bgColor={ `bg-white-300` } />

            <div className={ `flex overflow-hidden h-[calc(100vh-70px)]` }>

                {/* left side bar */ }
                <LeftSideBar className={ `left-side-bar` }>
                    <LeftSide brands={ prodData?.relatedBrands } />
                </LeftSideBar>

                <div className={ `md:ml-[20%] w-full overflow-y-auto h-full` }>

                    {/* filter bar */ }
                    <div className={ `filter-nav` }>
                        <Option optionList={ filterOption?.activity } callBackFunc={ handleOption } children={ `Activity` } />

                        <Option optionList={ filterOption?.device } callBackFunc={ handleOption } children={ `Device` } />

                        <Option optionList={ filterOption?.device } callBackFunc={ handleOption } singleOption={ true } children={ `Discount` } />
                    </div>

                    {/* product card section */ }
                    <div className={ `product-list-container` }>
                        {
                            prodDataLoading
                                ?
                                [...Array(3).keys()].map(skl => <ProductCardSkeleton />)
                                :
                                prodData?.products.length
                                    ?
                                    prodData.products.map(item => <ProductCard key={ item._id } data={ item } />)
                                    : <div>Empty</div>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};
export default ProductsList;