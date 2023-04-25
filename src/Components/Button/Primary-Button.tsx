type Props = {
  children: string,
  middle?: boolean,
  padding?: string,
  onClick?: () => void,
  rounded?: string
}

function PrimaryButton({ children, middle, padding, onClick, rounded }: Props) {

  return (
    <div onClick={ onClick }>
      <button className={ `text-white ${rounded} ${middle && 'center'} bg-blue-900 ${padding} font-DMsans` }>{ children }</button>
    </div>
  );
};

PrimaryButton.defaultProps = {
  children: `Button`,
  middle: false,
  padding: `p-2`,
  rounded: `rounded-lg`
}
export default PrimaryButton;