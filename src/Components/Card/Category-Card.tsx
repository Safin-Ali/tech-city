import { useNavigate } from "react-router-dom";
import AutoType from "../../Library/auto-type/AutoType";

type Props = {
    category: string,
    icon: string,
    description: string
};

function CategoryCard({ category, icon, description }: Props) {

    const navigate = useNavigate();

    const handleNvaigate = (category: string): void => {
        const categoryStr = category.toLowerCase();
        navigate(`/products/all/${categoryStr}`)
    };

    return (
        <div onClick={ () => handleNvaigate(category) } className={ `services-card cursor-pointer hover:border hover:border-blue-900 drop-shadow duration-300` }>
            {/* Service Icon */ }
            <div className={ `p-2 rounded-md bg-gray-200` }>
                <div className={ `w-[70%] mx-auto` }>
                    <img src={ icon } alt="Service_Icon" />
                </div>
            </div>
            <div className={ `px-3` }>
                <h4 className={ `text-xl font-bold font-baloo2 my-1 text-center text-blue-800` }>{ category }</h4>
                <p>
                    <AutoType textArr={ [description] } typeSpeed={ 0.03 } onceType={ true } className={ `font-semibold font-baloo2 text-zinc-500` } />
                </p>
            </div>
        </div>
    );
};
export default CategoryCard;