import { useRef, useState } from "react";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  const initialPriceRef = useRef();
  const stocksQuantityRef = useRef();
  const currentPriceRef = useRef();

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  function formSubmitHandelr(e) {
    e.preventDefault();
    const initialPrice = +initialPriceRef.current.value;
    const stocksQuantity = +stocksQuantityRef.current.value;
    const currentPrice = +currentPriceRef.current.value;

    if (
      initialPrice < 0 ||
      initialPrice === "" ||
      stocksQuantity < 1 ||
      stocksQuantity === "" ||
      currentPrice < 1 ||
      currentPrice === ""
    ) {
      setError("Invalid Inputs");
      setSuccess(false);
      return;
    }
    let gain = initialPrice < currentPrice;
    const difference = Math.abs(initialPrice - currentPrice) * stocksQuantity;
    const percentage = (
      (difference * 100) /
      (initialPrice * stocksQuantity)
    ).toFixed(2);

    if (initialPrice === currentPrice) {
      setError(true);
      setSuccess(true);
      return;
    }
    if (gain) {
      setError(false);
      setSuccess(
        `Yay, your gain is ${difference} and gain percentage is ${percentage}%`
      );
    } else {
      setSuccess(false);
      setError(
        `Yay, your loss is ${difference} and loss percentage is ${percentage}%`
      );
    }
  }
  return (
    <>
      <main className="App">
        <header className="header">
          <h1 className="heading">Investing Right ?</h1>
        </header>
        <form onSubmit={formSubmitHandelr} className="container">
          <div className="input-group">
            <label htmlFor="initial">Inital Price of Stock </label>
            <input
              id="initial"
              type="number"
              min={1}
              required
              ref={initialPriceRef}
            />
          </div>
          <div className="input-group">
            <label htmlFor="quantity">Total number of Stocks</label>
            <input
              id="quantity"
              type="number"
              min={1}
              required
              ref={stocksQuantityRef}
            />
          </div>
          <div className="input-group">
            <label htmlFor="current">Current Price of Stock</label>
            <input
              id="current"
              type="number"
              min={1}
              required
              ref={currentPriceRef}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="button">
              Check
            </button>
          </div>
        </form>
        <div className="output">
          {success && !error && <p className="success">{success}</p>}
          {!success && error && <p className="error">{error}</p>}
          {error && success && <p className="normal-text">No Difference</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
