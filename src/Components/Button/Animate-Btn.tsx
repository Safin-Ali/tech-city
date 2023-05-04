
interface PropsType {
    onClick?: () => void,
    children: string
}

function AnimateBtn({children,onClick}:PropsType) {

    return (
        <button className={`animate-btn-container`} onClick={onClick}>
            <span>{children}</span>
        </button>
    );
};

export default AnimateBtn;