import { useContext } from "react";
import { ExtraDataContext } from "../../../Context/Extra-Data";
import CategoryCard from "../../../Components/Card/Category-Card";
import SectionHeader from "../../../Components/Utilities/Section-Header";
import ServiceCardSkeleton from "../../../Components/Card/ServiceCardSkeleton";
import newArr from "../../../Services/Utils/create-new-arr";

function CategorySection() {

    const { productsCategory, productsCategoryLoading } = useContext(ExtraDataContext);
    return (
        <>
            <section className={ `category-section` }>

                <div className={`relative z-[3]`}>
                    <SectionHeader>Choose Device</SectionHeader>

                    <div className={ `service-section-box` }>
                        {

                            productsCategoryLoading
                                ?
                                newArr(4).map(i => <ServiceCardSkeleton key={ i } />)
                                :
                                productsCategory?.length
                                    ?
                                    productsCategory?.map(category => <CategoryCard
                                        key={ category._id }
                                        category={ category.category }
                                        description={ category.description }
                                        icon={ category.icon }
                                    />)

                                    : <div>not found</div>
                        }
                    </div>
                </div>

                <div className={ `circle-blob left-[-100px] bottom-[-100px]` }>
                </div>
                <div className={ `circle-blob right-[-100px] top-[-100px]` }>
                </div>
            </section>
        </>
    );
};
export default CategorySection;