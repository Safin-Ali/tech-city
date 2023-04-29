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
import {useState} from 'react';
import EmptyData from "../Components/Error/EmptyData";

type handleOptionFuncType = React.MouseEvent<HTMLLIElement> | boolean;

function ProductsList() {

    const { filterOption } = useContext(ExtraDataContext);

    const [navValue,setNavVal] = useState<string | null>(null);

    const {activity,brand,device,discount,handleFilterValue} = useFilterOptions();

    const handleNavSearchBar = (e:React.ChangeEvent<HTMLInputElement>):void => setNavVal(e.target.value as string);

    const handleOption = (type:string, e: handleOptionFuncType, ): void => {
        if (typeof e !== 'boolean') {
            const li = e.target as HTMLLIElement;
            const value = li.getAttribute('data-value') || '';
            console.log(type);

            handleFilterValue(type,value)

        } else {
            console.log(type,e);
            handleFilterValue(type,e)
        }
    };

    const { data: prodData, isFetching: prodDataLoading } = useProductsDataQuery({
        activity,
        brand,
        device,
        discount,
        search: navValue
    });

    return (
        <main>
            <Navbar handleSearchFeild={handleNavSearchBar}  bgColor={ `bg-white-300` } />

            <div className={ `flex overflow-hidden h-[calc(100vh-70px)]` }>

                {/* left side bar */ }
                <LeftSideBar className={ `left-side-bar` }>
                    <LeftSide brands={ prodData?.relatedBrands } />
                </LeftSideBar>

                <div className={ `md:ml-[20%] w-full overflow-y-auto h-full` }>

                    {/* filter bar */ }
                    <div className={ `filter-nav` }>
                        <Option optionList={ filterOption?.activity } activeValue={activity} callBackFunc={ handleOption } children={ `Activity` } />

                        <Option optionList={ filterOption?.device } activeValue={device} callBackFunc={ handleOption } children={ `Device` } />

                        <Option optionList={ filterOption?.device } callBackFunc={ handleOption } singleOption={ true } children={ `Discount` } />
                    </div>

                    {/* product card section */ }
                    <div className={ `product-list-container` }>
                        {
                            prodDataLoading
                                ?
                                [...Array(3).keys()].map(idx => <ProductCardSkeleton key={idx}/>)
                                :
                                prodData?.products.length
                                ?
                                prodData.products.map(item => <ProductCard key={ item._id } data={ item } />)
                                :
                                <div className={`col-span-1 md:col-span-3`}><EmptyData/></div>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};
export default ProductsList;