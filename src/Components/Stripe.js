import "./Stripe.css";
const Stripe = (props) => {
  return (
    <form action="/api/v1/create-checkout-session" method="POST">
      <h3>Want to Reach Your Goals faster?</h3>
      <h3>Try Muscle Memory Platinum</h3>
      <button className="goPlatinum" role="link" type="submit">
        Go Platinum
      </button>
    </form>
  );
};
export default Stripe;
