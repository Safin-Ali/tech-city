import { useNavigate } from "react-router-dom";
import { RelatedBrand } from "../Redux/end-point/products-data";

interface Props {
    brands: RelatedBrand[] | undefined
}

function LeftSide({brands}:Props) {

    const navigate = useNavigate()

    const handleNavigate = (brand:string , device: string):void => {
        navigate(`/products/${brand}/${device}`)
    }

    return (
        <>
            <div className={`mt-2 text-center bg-white-50 border rounded-md shadow-md py-3 mx-2`}>
                <h5 className={`font-bold uppercase font-DMsans`}>Related Brands</h5>
            </div>

            <ul className={`text-center uppercase`}>
                {
                    !brands
                    ?
                    [...Array(10).keys()].map(idx => <li key={idx+1} className={`side-nav-link hover:bg-inherit flex items-center h-10`}><span className={`w-3/5 mx-auto h-4 rounded-sm skeleton-tone block`}></span></li>)
                    :
                    brands.length
                    ?
                    brands.map(brand => <li className={`side-nav-link`}>{brand.brandName}</li>)
                    : <div>Empty</div>
                }
            </ul>
        </>
    );
};
export default LeftSide;