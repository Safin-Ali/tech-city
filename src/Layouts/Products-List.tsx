import LeftSideBar from "../Components/App-Bar/Left-Side-Bar";
import Navbar from "../Components/App-Bar/Navbar";
import Option from "../Components/Filter-Option/Option";
import { useContext } from 'react';
import { ExtraDataContext } from "../Context/Extra-Data";
import LeftSide from "./Left-Side-Bar";
import { useProductsDataQuery } from "../Redux/end-point/products-data";
import ProductCardSkeleton from "../Components/Card/ProductCardSkeleton";
import ProductCard from "../Components/Card/ProductCard";
import useFilterOptions from "../Services/Utils/filter-options-controller";
import { useState } from 'react';
import EmptyData from "../Components/Error/EmptyData";
import newArr from "../Services/Utils/create-new-arr";
import { useNavigate, useParams } from "react-router-dom";
import useComponentRemount from "../Services/Utils/component-remounter";

type handleOptionFuncType = React.MouseEvent<HTMLLIElement> | boolean;

function ProductsList() {

    const { filterOptionData, filterOptionDataLoading } = useContext(ExtraDataContext);

    const [navValue, setNavVal] = useState<string | null>(null);

    const { activity, brands, device, discount, handleFilterValue } = useFilterOptions();

    const params = useParams();

    const handleNavSearchBar = (e: React.ChangeEvent<HTMLInputElement>): void => setNavVal(e.target.value);

    const handleOption = (type: string, e: handleOptionFuncType): void => {
        if (typeof e !== 'boolean') {
            const li = e.target as HTMLLIElement;
            const value = li.getAttribute('data-value') || '';
            handleFilterValue(type, value);

        } else {
            handleFilterValue(type, e)
        }
    };

    const { data: prodData, isFetching: prodDataLoading } = useProductsDataQuery({
        activity,
        brands,
        device,
        discount,
        search: navValue
    });

    const navigate = useNavigate();

    const navigateDevice = (device: string) => navigate(`/products/${params?.brand}/${device}`);
    const navigateBrand = (brand: string) => navigate(`/products/${brand}/${params?.device}/`);

    const remount = useComponentRemount();

    return (
        <main>
            <Navbar handleSearchFeild={ handleNavSearchBar } bgColor={ `bg-white-300` } />

            <div className={ `flex overflow-hidden h-[calc(100vh-70px)]` }>

                {/* left side bar */ }
                <LeftSideBar className={ `left-side-bar` }>
                    <LeftSide handleNav={ handleFilterValue } brandLoading={ prodDataLoading } brands={ prodData?.relatedBrands } />
                </LeftSideBar>

                <div className={ `md:ml-[20%] w-full overflow-y-auto h-full` }>

                    {/* filter bar */ }
                    <div className={ `filter-nav` }>
                        {
                            filterOptionDataLoading
                                ?
                                <>
                                    { newArr(8).map(idx => <div key={ idx } className={ `w-24 rounded-full h-8 bg-gray-200 animate-pulse` }></div>) }
                                </>
                                :
                                <>
                                    <Option
                                        optionList={ filterOptionData?.activity }
                                        activeValue={ activity }
                                        callBackFunc={ handleOption }
                                        children={ `Activity` }
                                    />

                                    <div className={`block md:hidden`}>
                                        <Option
                                            optionList={ [{ label: 'All', value: 'all' }, ...(prodData?.relatedBrands || []).map(elm => ({ label: elm.brandName, value: elm.brandName }))] }
                                            activeValue={ brands }
                                            callBackFunc={ handleOption }
                                            children={ `Brands` }
                                            navigate={ true }
                                            navigateFunc={ navigateBrand }
                                        />
                                    </div>

                                    <Option navigateFunc={ navigateDevice }
                                        optionList={ filterOptionData?.device }
                                        activeValue={ device }
                                        navigate={ true }
                                        callBackFunc={ handleOption }
                                        children={ `Device` }
                                    />

                                    <Option
                                        optionList={ filterOptionData?.device }
                                        activeValue={discount}
                                        callBackFunc={ handleOption }
                                        singleOption={ true }
                                        children={ `Discount` }
                                    />
                                </>
                        }
                    </div>

                    {/* product card section */ }
                    <div className={ `product-list-container` }>
                        {
                            prodDataLoading
                                ?
                                newArr(3).map(idx => <ProductCardSkeleton key={ idx } />)
                                :
                                prodData?.products.length
                                    ?
                                    prodData.products.map(item => <ProductCard callBack={ () => remount() } key={ item._id } data={ item } />)
                                    :
                                    <div className={ `col-span-1 md:col-span-3` }><EmptyData /></div>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};
export default ProductsList;