import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
interface PropsType {
    callback?: () => void,
    amount:number
}

function StripeForm({
    callback = () => {},
    amount
}:PropsType) {

    const stripe = useStripe();
    const elements = useElements();

    const [status, setStatus] = useState<{message:string,loading:boolean}>({
        loading:false,
        message:''
    });

    const location = useLocation().state;

    const handleSubmit = async (event:React.MouseEvent) => {
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setStatus({...status,loading:true});

        const result = await stripe.confirmPayment({

            elements,
            confirmParams: {
                return_url:location
            },
        });

        if (result.error) {
            setStatus({...status,loading:false,message:result.error.message!});

        } else {
            setStatus({...status,loading:false,message:'success'});

        }
    };

    return (
        <form>
        <div className={ `px-5` }>
            <PaymentElement />
            <p className={`text-red-700 ${status.message ? 'block' : 'hidden'} my-3 font-medium text-xl font-DMsans`}> {status.message} </p>
        </div>

        <div className={ `bg-gray-100 mt-3 gap-y-5 h-full flex-v-center flex-col sm:flex-row justify-between px-5 py-5` }>

            <div className={`w-full sm:w-auto`}>
                <input type="text" className={ `w-full text-center sm:text-left font-semibold text-slate-900 text-2xl font-lexend` } name={ `price` } value={ `$${amount}` } readOnly={ true } disabled={ true } />
            </div>

            <div className={ `flex-full-center gap-5` }>
                <button type={`button`}
                onClick={callback }
                className={ `px-5 ${status.loading && 'opacity-50'} font-lexend font-medium py-1.5 rounded-md bg-gray-50 border text-gray-800` }
                disabled={status.loading}>
                Cencel
                </button>

                <button onClick={handleSubmit}
                className={ `px-7 ${status.loading && 'opacity-50'} font-lexend font-medium text-white-50 py-1.5 rounded-md bg-blue-800` } disabled={status.loading}>

                {status.loading ? 'Loading..' : 'Payment' }
                </button>
            </div>
        </div>
    </form>
    );
};

export default StripeForm;