import { useReducer } from "react";

const initialState = {
  disable: true,
  balance: 0,
  loan: 0,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "openAccount":
      return { ...state, disable: false, balance: 500 };

    case "deposit":
      return { ...state, balance: payload + state.balance };

    case "withdraw":
      return { ...state, balance: state.balance - payload };

    case "loan":
      return { ...state, balance: state.balance + payload, loan: payload };

    case "payLoan":
      return { ...state, balance: state.balance - state.loan, loan: 0 };

    case "closeAccount":
      return { ...state, disable: true };

    default:
      console.log("Wrong choice");
      return state;
  }
}

function App() {
  const [{ disable, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <>
      <h1>Simple Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan:{loan}</p>
      <button
        disabled={!disable}
        onClick={() => dispatch({ type: "openAccount" })}
      >
        Open Account
      </button>
      <button
        onClick={() => dispatch({ type: "deposit", payload: 150 })}
        disabled={disable}
      >
        Deposit 150
      </button>
      <button
        onClick={() => dispatch({ type: "withdraw", payload: 50 })}
        disabled={disable}
      >
        Withdraw 50
      </button>
      <button
        onClick={() => dispatch({ type: "loan", payload: 5000 })}
        disabled={loan > 0 ? true : disable}
      >
        Request a loan of 5000
      </button>
      <button onClick={() => dispatch({ type: "payLoan" })} disabled={disable}>
        Pay loan
      </button>
      <button
        onClick={() =>
          loan === 0 && balance === 0 && dispatch({ type: "closeAccount" })
        }
        disabled={disable}
      >
        Close Account
      </button>
    </>
  );
}

export default App;
