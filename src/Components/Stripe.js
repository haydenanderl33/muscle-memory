import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'
const Stripe = (props) => {
  const onToken = (token) => {
    console.log(token);
    console.log(props.cartTotal)
    token.card = void 0;
    axios.post('/api/checkout', { token, price: (props.cartTotal)})
    .then(response => {
      alert('Transaction Successful')
    }).catch( (err)=> console.log(err))
  }
  return (
    <div>
      <StripeCheckout
        description={"Muscle Memory Platinum"}
        token={onToken}
        stripeKey={process.env.REACT_APP_PUB_KEY}
        amount={"2500.00"}
      />
    </div>
  );
};
export default Stripe;
