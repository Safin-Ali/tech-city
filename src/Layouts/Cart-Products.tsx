import { useCartProductsQuery } from '../Redux/end-point/cart-products';
import parseRealType from '../Services/Utils/parse-real-type';
import newArr from '../Services/Utils/create-new-arr';
import ProductCardSkeleton from '../Components/Card/ProductCardSkeleton';
import ProductCard from '../Components/Card/ProductCard';
import Navbar from '../Components/App-Bar/Navbar';
import EmptyData from '../Components/Error/EmptyData';

function CartProducts() {

  const cartIdArr = localStorage.getItem('cart-products')!

  const { isLoading: cartProductIsLoading, data: cartProductsData, isFetching: cartProductsFetch, refetch} = useCartProductsQuery(cartIdArr);

  return (
    <main>
      <Navbar/>
      <section className={ `grid items-center top-0 grid-cols-1 cursor-n-resize sm:grid-cols-2 lg:grid-cols-3 gap-5 hide-scrollbar p-[5%]` }>

        {
          cartProductIsLoading || cartProductsFetch
            ?
            newArr(3).map(skelton => <ProductCardSkeleton key={ skelton } />)
            :
            !cartProductsData?.length
            ?
            <div className={`col-span-1 sm:col-span-2 lg:col-span-3`}><EmptyData/></div>
            :
            cartProductsData.map(product => <ProductCard callBack={()=>refetch()}  key={ product._id } data={ product } />)
        }

      </section>
    </main>
  );
};
export default CartProducts;