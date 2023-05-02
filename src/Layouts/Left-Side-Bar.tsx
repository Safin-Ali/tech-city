import { useNavigate, useParams } from "react-router-dom";
import { RelatedBrand } from "../Redux/end-point/products-data";
import EmptyData from "../Components/Error/EmptyData";
import newArr from "../Services/Utils/create-new-arr";

interface Props {
    brands: RelatedBrand[] | undefined,
    handleNav: (type: string, value: string) => void,
    brandLoading: boolean
}

function LeftSide({
    brands,
    handleNav,
    brandLoading
}: Props) {

    const navigate = useNavigate();

    const { device, brand } = useParams();

    const handleNavigate = (brand: string): void => {
        navigate(`/products/${brand}/${device}`);
        handleNav(`brand`, brand);
    };

    return (
        <>
            <div className={ `mt-2 text-center bg-white-50 border rounded-md shadow-md py-3 mx-2` }>
                <h5 className={ `font-bold uppercase font-DMsans` }>Related Brands</h5>
            </div>

            <ul className={ `text-center uppercase` }>

                <li onClick={ () => handleNavigate(`all`) }
                    className={ `side-nav-link ${'all' === brand ? 'side-nav-link-active' : ''}` }
                >
                    All
                </li>
                {
                    brandLoading
                        ?
                        newArr(10).map(idx => <li
                            key={ idx + 1 }
                            className={ `side-nav-link hover:bg-inherit flex items-center h-10` }>
                            <span
                                className={ `w-3/5 mx-auto h-4 rounded-sm skeleton-tone block` }>
                            </span>
                        </li>)
                        :
                        !brands?.length
                            ?
                            <EmptyData />
                            :
                            brands?.map(elm => <li
                                onClick={ () => handleNavigate(elm.brandName) }
                                key={ elm._id }
                                className={ `side-nav-link ${elm.brandName === brand ? 'side-nav-link-active' : ''}` }
                            >
                                { elm.brandName }
                            </li>)
                }
            </ul>
        </>
    );
};
export default LeftSide;