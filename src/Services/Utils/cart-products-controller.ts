import parseRealType from "./parse-real-type";
import parseStringify from "./parse-stringify";

type ReturnType = {
    handleCart: (type: 'add' | 'rmv', payload: string) => void,
    status: boolean
}

const useCartController = (id: string): ReturnType => {
    const storage = localStorage;
    const existCart: string | null = storage.getItem('cart-products');
    const orgDataType: string[] = existCart ? parseRealType(existCart!) : [];
    const status: boolean = orgDataType?.includes(id) || false;

    const handleCart = (type: 'add' | 'rmv', payload: string) => {
        switch (type) {
            case 'add':
                storage.setItem('cart-products', parseStringify([...orgDataType, payload]));
                break;
            case 'rmv':
                const rmvedArr = orgDataType.filter(id => id !== payload);
                storage.setItem('cart-products', parseStringify(rmvedArr));
                break;
        }
    };

    if (!existCart) {
        storage.setItem('cart-products', parseStringify([]));
    };

    return {
        handleCart,
        status
    }
};

export default useCartController;