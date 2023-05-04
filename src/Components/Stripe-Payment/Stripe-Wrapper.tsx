import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { SiShopify } from 'react-icons/si';
import StripeForm from './Stripe-Form';

export interface ProductStripeDataType {
    price: number,
    brand: string,
    model: string,
    device: string
}

interface PropsType {
    closeFunc: () => void,
    data: ProductStripeDataType
}

export default function StripeWrapper({
    closeFunc,
    data
}: PropsType) {

    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState<any>(null);

    useEffect(() => {

        // Create PaymentIntent as soon as the page loads
        if(data && data.price){
            fetch("https://tech-city.vercel.app/api/payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: data.price }),

        })
            .then((res) => res.json())
            .then((data) =>{
                setStripePromise(loadStripe(process.env.REACT_APP_TECH_CITY_STRIPE_PUBLIC_KEY!));
                setClientSecret(data.clientSecret);
            }
            );
        }
        setClientSecret(null)
    }, [data]);

    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    return (
        <Elements stripe={ stripePromise } options={ options }>
            <div className={ `hide-scrollbar stripe-component-container` }>

                <div className={ `flex px-5 justify-between h-full gap-10 mb-5 md:mb-10` }>
                    <div>
                        <h5 className={ `font-DMsans capitalize text-lg font-medium my-3` }>
                            <span className={ `font-semibold text-[14px] md:text-2xl` }>Hey </span>
                            <span className={ `font-semibold text-blue-800` }>Congratulations! </span>
                            on making an excellent choice! You're just one click away from owning the latest and greatest technology.
                            <span className={ `inline-block mx-2` }>
                                <img className={ `w-5 inline-block ` } src="https://i.ibb.co/sb0Sp95/happy-svgrepo-com.webp" alt="happy_emoji" />
                            </span>
                        </h5>

                        <h6 className={ `font-mincho text-[15px] md:text-lg font-medium` }>
                            Your <span className={ `underline underline-offset-4 capitalize` }>
                                { data.brand } { data.model } { data.device }</span> With 1 Year Warrenty

                            <SiShopify size={ 25 }
                                className={ `inline-block text-blue-800` } />
                        </h6>
                    </div>
                    <div onClick={ closeFunc } className={ `bg-gray-100 cursor-pointer border h-fit p-2 rounded-sm` }>
                        <GrClose />
                    </div>
                </div>

                <StripeForm callback={ closeFunc } amount={ data.price } />
            </div>
        </Elements>
    );
};