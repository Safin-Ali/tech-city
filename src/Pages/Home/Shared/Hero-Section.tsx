import { useContext } from "react";
import PrimaryButton from "../../../Components/Button/Primary-Button";
import { ExtraDataContext, } from "../../../Context/Extra-Data";
import CarouselWrapper from "../../../Library/easy-carousel-stack/CarouselWrapper";
import Slider2D from "../../../Library/easy-carousel-stack/components/Slider";
import ProductsSlider from "../../../Components/Slider/Products-Slider";
import { useNavigate } from "react-router-dom";
import AutoType from "../../../Library/auto-type/AutoType";

function HeroSection() {

  const { bannerSlide, bannerSlideLoading } = useContext(ExtraDataContext);

  const navigate = useNavigate();

  return (
    <>
      <section className={ `hero-section` }>

        {/* text area */ }
        <div className={ `basis-1/2 order-2 md:order-none` }>
          <h2 className={ `font-mincho text-3xl font-bold` }><span>Tech</span> <span className={ `text-blue-900` }>City</span></h2>

          <div>
            <h5 className={ `text-xl md:text-2xl my-5 font-lexend font-bold` }>
              Welcome Sir, Good Morning. Here You Find Latest Technology Products. Currently You Can Buy <AutoType className={`text-blue-800`} alternate={true} delay={1} textArr={['Desktop', 'Mobile', 'Laptop', 'Smart Watch']}/>
            </h5>
          </div>

          <PrimaryButton onClick={ () => navigate('/products/all/all') } children={ 'See Products' } />
        </div>

        {/* slide area */ }
        <div className={ `basis-1/2 order-1 md:order-none` }>
          {
            !bannerSlideLoading && <CarouselWrapper>
              <Slider2D AIChange={true} changeSpeed={ 3 }>
                {
                  bannerSlide?.bannerimages.map((imgPath, idx) => <ProductsSlider key={ idx + 1 } imageLink={ imgPath } />)
                }
              </Slider2D>
            </CarouselWrapper>
          }
        </div>
      </section>
    </>
  );
};

HeroSection.defaultProps = {}
export default HeroSection;