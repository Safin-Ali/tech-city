
type Props = {
  imageLink: string
}

function ProductsSlider({ imageLink }: Props) {

  return (
    <div className={`py-[17%]`}>
      <div className={ `slide-3d-cube` }>
        <div className={ `transform rotate-[-120deg] px-5` }>
          <img src={ imageLink } alt="xx" />
        </div>
      </div>
    </div>
  );
};

ProductsSlider.defaultProps = {}
export default ProductsSlider;