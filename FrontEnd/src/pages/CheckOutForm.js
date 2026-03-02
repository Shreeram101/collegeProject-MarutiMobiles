import React, { useEffect, useState } from 'react'
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import '../Stripe.css';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../features/Order/OrderSlice';
import { redirect, useNavigate } from 'react-router-dom';


const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const currentOrder = useSelector(selectCurrentOrder);
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // return_url: `http://localhost:3000/order-success/${currentOrder.id}`,
                return_url: `http://localhost:3000/order-success/${currentOrder.id}`,
            },
            redirect: "if_required"


        });

        // if (error.type === "card_error" || error.type === "validation_error") {
        //     setMessage(error.message);
        // } else {
        //     setMessage("An unexpected error occurred.");
        // }
        console.log(error);

        if (error) {
            console.log(error.message);
        } else {
            navigation(`/order-success/${currentOrder.id}`);
            setMessage("Payment succeeded!");
        }

        setIsProcessing(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isProcessing ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckOutForm 