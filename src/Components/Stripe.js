import {loadStripe} from '@stripe/stripe-js'
const stripePromise = loadStripe('pk_test_51HwaqHDNjLMWEToxyAUQFSC6GVN3n9tv4CWah6DjjGNySQVJLdwJzB7CFiEHPreHtj8Mw4qKgfOCeTGQFiluBBdm00ArAlta08');
const Stripe = (props) => {

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('/create-checkout-session', { method: 'POST' });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div>
      <div>Want to Reach Your goals faster?</div>
      <div>Try Muscle Memory Platinum</div>
    <button role="link" onClick={handleClick}>
      Go Platinum
    </button>
    </div>
  );
};
export default Stripe;

// import StripeCheckout from "react-stripe-checkout";
// import axios from 'axios'
// const Stripe = (props) => {
//   const onToken = (token) => {
//     console.log(token);
//     console.log(props.cartTotal)
//     token.card = void 0;
//     axios.post('/api/checkout', { token, price: (props.cartTotal)})
//     .then(response => {
//       alert('Transaction Successful')
//     }).catch( (err)=> console.log(err))
//   }
//   return (
//     <div>
//       <StripeCheckout
//         description={"Muscle Memory Platinum"}
//         token={onToken}
//         stripeKey={process.env.REACT_APP_PUB_KEY}
//         amount={"2500.00"}
//       />
//     </div>
//   );
// };
// export default Stripe;
