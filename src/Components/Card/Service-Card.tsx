import AutoType from "../../Library/auto-type/AutoType";

type Props = {
    servName: string,
    servImg: string,
    servDesc: string
}

function ServiceCard({ servName, servImg, servDesc }:Props) {

    return (
        <div className={`services-card`}>
            {/* Service Icon */}
            <div className={`p-2 rounded-md bg-gray-200`}>
                <div className={`w-[70%] mx-auto`}>
                    <img src={servImg} alt="Service_Icon" />
                </div>
            </div>
            <div className={`px-3`}>
                <h4 className={`text-xl font-bold font-baloo2 my-1 text-center text-gray-800`}>{servName}</h4>
                <p>
                    <AutoType textArr={[servDesc]} typeSpeed={0.03} onceType={true} className={`font-semibold font-baloo2 text-zinc-500`}/>
                </p>
            </div>
        </div>
    );
};
export default ServiceCard;