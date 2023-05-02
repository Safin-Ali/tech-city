import { BsBookmark, BsBookmarkCheckFill, BsStarFill, BsImage } from 'react-icons/bs';
import newArr from '../../Services/Utils/create-new-arr';

const ProductCardSkeleton = () => {

    return (
        <div className={`product-card`}>

            {/* Product thumb */}
            <div className={`p-2`}>
                <div className={`flex-full-center skeleton-tone rounded-lg h-36`}>
                    <BsImage size={`2rem`} color="#888d95"></BsImage>
                </div>
            </div>

            {/* content */}
            <div className={`product-card-content`}>
                <div>
                    <h5 className={`w-3/4 h-6 skeleton-tone rounded-md`}></h5>
                </div>

                <div className={`flex-v-center my-1 gap-x-1 mb-4`}>
                    <div className={`flex-v-center`}>
                        {newArr(3).map(elm => <BsStarFill color={'#FCC73B'} key={elm} className={`mx-0.5`}></BsStarFill>)}
                    </div>

                    <span className={`mt-1 animate-pulse font-semibold border px-2 text-sm bg-gray-100 rounded-md w-8 h-5`}></span>
                </div>

                <div className={`flex-v-center flex-wrap gap-2 capitalize mb-3`}>
                    <p className={`text-pink-600 bg-pink-200 product-card-highlight w-[5rem] h-7`}></p>

                    <p className={`text-purple-600 bg-purple-200 product-card-highlight w-[5rem] h-7`}></p>
                    <p className={`text-green-600 bg-green-200 product-card-highlight w-[5rem] h-7`}></p>
                    <p className={`text-orange-600 bg-orange-200 product-card-highlight w-[5rem] h-7`}></p>
                </div>

                <div className="flex-v-center my-1 justify-between">
                    <span className="skeleton-tone w-[7rem] h-8 rounded-md"></span>
                    <div className={`flex-v-center gap-x-2`}>
                        <div>
                            <button className={`w-[5rem] bg-blue-300 mt-2 h-8 animate-pulse rounded-lg`} disabled></button>
                        </div>
                        <div className={`bg-gray-100 animate-pulse border py-1.5 px-3 rounded cursor-default`}><BsBookmark color={"#888d95"} className={`text-lg`}></BsBookmark></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;