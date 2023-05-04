import { useProductDataQuery } from '../Redux/end-point/product-by-id';
import { useParams } from 'react-router-dom';
import BaseLoader from '../Components/Loader/Base-Loader';
import ModalTemplate from '../Components/Modal/Modal-Template';
import StripeWrapper, { ProductStripeDataType } from '../Components/Stripe-Payment/Stripe-Wrapper';
import { useEffect, useState } from 'react';
import PrimaryButton from '../Components/Button/Primary-Button';

interface ModalDataType extends ProductStripeDataType {
    visible: boolean,
};
function SingleProduct() {

    const { device = '', brand = '', id = '' } = useParams();

    const [modalData, setModalData] = useState<ModalDataType>({
        brand: '',
        model: '',
        price: 0,
        device: '',
        visible: false
    });

    const {
        data: productData = {},
        isLoading: productDataLoading,
        isFetching: productDataFetch
    } = useProductDataQuery({
        brand,
        id,
        device
    });

    const handleCloseModal = () => {
        setModalData({
            ...modalData,
            brand: '',
            device: '',
            model: '',
            price: 0,
            visible: false
        })
    };

    if (productDataLoading || productDataFetch) return <BaseLoader bgBlur={ true } center={ true } />

    // doller symbol
    const dollerSymbol = (type: string) => {
        if (type === 'base') return '$';
        if (type === 'total') return '$';
        if (type === 'delivery') return '$';
    };

    // check nested object and array and return single valaues
    const checkNestedType = (val: any[] | any) => {
        if (Array.isArray(val)) {
            return <div className={ `bg-[#d3d3d3] p-2` }><h6 className={ `font-bold p-1` }>{
                val.map(elm => elm)
            }</h6></div>

        } else if (typeof val === 'object') {

            return Object.keys(val).map((elm, idx) => {
                return <div key={ idx } className={ `nested-field-container` }>
                    <h5 className={ `font-medium` }>{ elm }: { dollerSymbol(elm) }</h5>
                    { checkNestedType(val[elm]) }
                </div>
            });
        }
        return <div><h6 className={ `font-bold p-1` }>{ val }</h6></div>
    };

    return (
        <>
            <section className={ `border w-[90%] text-slate-800 md:w-[80%] lg:w-[60%] mx-auto` }>

                <div className={ `my-5` }>
                    <h4 className={ `capitalize underline text-center text-3xl font-semibold` }>{ productData.brand.concat(' ', productData.device) }</h4>
                </div>

                <div className={ `my-5` }>
                    <img src={ productData.deviceImage } className={ `mx-auto` } alt="Product_Icon" />
                </div>

                <div className={ `my-4 border w-1/2 mx-auto p-1` }>
                    <h5 className={ `font-semibold text-3xl text-center` }>{ productData.others.model }</h5>
                </div>
                {
                    Object.keys(productData).filter(property => property !== 'deviceImage' && property !== 'brand' && property !== 'device').map((elm, idx) => {
                        return (
                            <div key={ idx } className={ `field-container` }>
                                <div className={ `capitalize bg-[#f1f2f250] border-r border-b col-span-1 px-0.5 py-2` }>
                                    <h4 className={ `font-semibold ml-2` }>{ elm }</h4>
                                </div>
                                <div className={ `col-span-2` }>
                                    { checkNestedType(productData[elm]) }
                                </div>
                            </div>
                        )
                    })
                }
                <div className={ `text-center m-5` }>
                    <PrimaryButton
                        onClick={ () => {
                            setModalData({
                                ...modalData,
                                brand: productData.brand,
                                device: productData.device,
                                model: productData.others.model,
                                price: productData.price.total,
                                visible: true
                            })
                        } }
                        padding={`px-10 py-3`}
                        children={ `Buy Now` } />
                </div>
            </section>
            <>
                <ModalTemplate toggleBool={ modalData.visible } component={ <StripeWrapper closeFunc={ handleCloseModal } data={ modalData } /> } />
            </>
        </>
    );
};

export default SingleProduct;