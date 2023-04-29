import React, { memo } from 'react';
import { BsBookmark, BsBookmarkCheckFill, BsStarFill } from 'react-icons/bs';
import { GrList, } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { ProdDataShape } from '../../Redux/end-point/products-data';
import DiscountBadge from '../Badge/DiscountBadge';
import PrimaryButton from '../Button/Primary-Button';
import useCartController from '../../Services/Utils/cart-products-controller';
// import { reactLocaleStorage } from '../../utils/products-cart';

interface Props {
    data: ProdDataShape
}

const ProductCard = ({ data }: Props) => {

    // destrucred product data
    const { _id, activity, brand, core, device, deviceImage, others, price } = data;

    // navigate hooks for change current url path
    const navigate = useNavigate();

    // // navigate product single page
    // const navigateProduct = (brand, device, id) => navigate(`/product/${brand}/${device}/${id}`, { state: data });

    // handle product cart
    const { handleCart, status } = useCartController(_id);

    console.log(status, handleCart);


    return (
        <div className={ `product-card` }>

            {/* Product thumb */ }
            <div className={ `relative` }>
                <div className={ `product-card-thumb` }>
                    <div className={ `w-2/3 mx-auto p-3` }>
                        <img src={ deviceImage } alt="Product" />
                    </div>
                </div>
                { !!price.discount && <DiscountBadge>{ price.discount }</DiscountBadge> }
            </div>

            {/* content */ }
            <div className={ `product-card-content` }>
                <div>
                    <h5 className={ `text-xl font-semibold capitalize tracking-tight` }>{ brand } { others.model }</h5>
                </div>

                <div className={ `flex-v-center gap-x-1 mb-4` }>
                    <div className={ `flex-v-center` }>
                        { [...Array(3).keys()].map(elm => <BsStarFill color={ '#FCC73B' } key={ elm } className={ `mx-0.5` }></BsStarFill>) }
                    </div>

                    <span className={ `mt-1 font-semibold border px-2 text-sm bg-gray-100 rounded-md` }>4.4</span>
                </div>

                <div className={ `flex-v-center flex-wrap gap-2 capitalize mb-3` }>
                    <p className={ `text-pink-600 bg-pink-200 product-card-highlight` }>{ core[0] }</p>

                    <p className={ `text-purple-600 bg-purple-200 product-card-highlight` }>{ core[1] }</p>
                    <p className={ `${activity === 'available' ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'} product-card-highlight uppercase` }>{ activity }</p>
                    <p className={ `text-orange-600 bg-orange-200 product-card-highlight` }>{ core[2] }</p>
                </div>

                <div className="flex-v-center my-1 justify-between">
                    <span className="text-3xl font-bold text-indigo-950">${ price.total }</span>
                    <div className={ `flex-v-center gap-x-2` }>
                        <div>
                            <PrimaryButton padding={ `px-3 py-1.5` }>
                                Buy Now
                            </PrimaryButton>
                        </div>
                        <div

                            onClick={ () => {
                                !status
                                    ?
                                    handleCart('add', _id)
                                    :
                                    handleCart('rmv', _id)
                            } }

                            className={ `bg-gray-100 border py-1.5 px-3 rounded cursor-pointer` }>

                            {
                                !status
                                    ?
                                    <BsBookmark className={ `text-xl` } />
                                    :
                                    <BsBookmarkCheckFill className={ `text-blue-800 text-xl` } />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default memo(ProductCard);