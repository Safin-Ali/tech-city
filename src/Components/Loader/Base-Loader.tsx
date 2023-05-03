import './loader-base.css';
interface PropsType {
    center?: boolean
    bgBlur?: boolean
}

function BaseLoader({
    center = false,
    bgBlur = false,
}:PropsType) {

    return (
        <>
        <div className={`${center ? 'center' : ''}`}>
            <div className={ 'loader-base' }>
                <div className="loader"></div>
            </div>
        </div>
        <div className={`${bgBlur ? 'bg-blur' : 'bg-blur-hidden'}`}></div>
        </>
    );
};

export default BaseLoader;