import React, { useEffect, useState } from 'react'
import { selectCurrentOrder } from '../features/Order/OrderSlice';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QPMbtRqU7MncOdT7xnj7dS3VbxfNxrv1XXv7J6KXtw4qJp2rNrPOmQPoSWvHyi2HAMEqyCT7iyvhpewBrOdQgg800rzuMCiqm')

const StripeCheckOut = () => {

  const [clintSecret, setClintSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: currentOrder })
    })
      .then(res => res.json())  
      .then(data => setClintSecret(data.clientSecret));
  }, [])

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret: clintSecret,
    appearance,
  };

  return (
    <>
      <div className="Stripe">
        {clintSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        )}
      </div>
    </>
  )
}

export default StripeCheckOut