import { useContext } from "react";
import { ExtraDataContext } from "../../../Context/Extra-Data";
import CategoryCard from "../../../Components/Card/Category-Card";
import SectionHeader from "../../../Components/Utilities/Section-Header";

function CategorySection() {

    const { productsCategory, productsCategoryLoading } = useContext(ExtraDataContext);

    if (productsCategoryLoading) return <div>Loading</div>

    return (
        <>
            <section className={ `category-section` }>

                <SectionHeader>Choose Device</SectionHeader>

                <div className={`service-section-box`}>
                    {
                        productsCategory?.length ?
                            productsCategory?.map(category => <CategoryCard
                                key={ category._id }
                                category={ category.category }
                                description={ category.description }
                                icon={ category.icon }
                            />)

                            : <div>not found</div>
                    }
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