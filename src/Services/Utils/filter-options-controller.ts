import parseStringify from "./parse-stringify";
import parseRealType from "./parse-real-type";
import { useMemo, useState } from 'react';
import { useParams,useLocation } from "react-router-dom";

export interface FilterOptionsShapeType {
    activity: string,
    brands: string,
    device: string,
    discount: boolean
};

type ReturnType = FilterOptionsShapeType & { handleFilterValue: (type: string, value: string | boolean) => void }

const useFilterOptions = (): ReturnType => {

    const storage = sessionStorage;

    const existOptions: string | null = storage.getItem('productsFilter');

    const { brand, device} = useParams();

    const history = useLocation().pathname

    const [filterValue, setFilterValue] = useState<FilterOptionsShapeType>({
        activity: '',
        brands: '',
        device: '',
        discount: false
    });

    const handleFilterValue = (type: string, value: string | boolean): void => {
        if (existOptions) {
            const optionVal = parseRealType<FilterOptionsShapeType>(existOptions);
            const modifiedObj = { ...optionVal, [type]: value };
            storage.setItem(`productsFilter`, parseStringify(modifiedObj));
            setFilterValue(modifiedObj)
        }
    };

    useMemo(() => {

        if (!existOptions) {
            const newVal = {...filterValue,device:device || '',brands:brand || ''}
            storage.setItem(`productsFilter`, parseStringify(newVal));
            setFilterValue(newVal);
        } else {
            const optionVal: any = parseRealType<FilterOptionsShapeType>(existOptions);
            const optionIterator = Object.keys(parseRealType<FilterOptionsShapeType>(existOptions));

            setFilterValue(prevState => {
                const updatedState: any = { ...prevState };
                optionIterator.forEach(opt => {
                if(opt === 'device') {
                    return updatedState[opt] = device;
                }
                if(opt === 'brands') {
                    return updatedState[opt] = brand;
                }
                    updatedState[opt] = optionVal[opt];
                });
                return updatedState;

            });

        };
        return () => { }
    }, [history]);

    return { ...filterValue, handleFilterValue }

};

export default useFilterOptions;