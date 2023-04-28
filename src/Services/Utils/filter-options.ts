import parseStringify from "./parse-stringify";
import parseRealType from "./parse-real-type";
import {useState} from 'react';

interface FilterOptionsShapeType {
    activity: string,
    brand: string,
    device: string,
    discount: boolean
};

type ReturnType = FilterOptionsShapeType & {handleFilterValue: (type:string,value:string | boolean)=>void}

const useFilterOptions = ():ReturnType => {
    const storage = sessionStorage;
    const existOptions: string | null = storage.getItem('productsFilter');
    const initFilterValue:FilterOptionsShapeType = {
        activity: '',
        brand: '',
        device: '',
        discount: false
    };

    const [strgUpdate,setStrgUpdate] = useState<boolean>(false);

    const handleFilterValue = (type:string,value:string | boolean):void => {
        if(existOptions){
            const optionVal = parseRealType<FilterOptionsShapeType>(existOptions);
            const modifiedObj = {...optionVal,[type]:value};
            storage.setItem(`productsFilter`,parseStringify(modifiedObj));
            setStrgUpdate(!strgUpdate)
        }
    };

    if(!existOptions) {
        storage.setItem(`productsFilter`,parseStringify(initFilterValue));
        return {...initFilterValue,handleFilterValue}
    } else {
        const optionVal = parseRealType<FilterOptionsShapeType>(existOptions);

        return {...optionVal,handleFilterValue}
    };

};

export default useFilterOptions;