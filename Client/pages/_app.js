import "../styles/globals.css";
import { createContext, useState, useMemo } from "react";

export const LoginContext = createContext({
  isLogIn: "",
  setIsLogIn: () => {},
});
export const OrderContext = createContext({
  orders: {},
  setOrders: () => {},
});
export const UserContext = createContext({
  user: null,
  setUser: () => {},
});
export const OutletContext = createContext({
  outlet: {},
  setOutlet: () => {},
});
function MyApp({ Component, pageProps }) {
  const [isLogIn, setIsLogIn] = useState("false");
  const [orders, setOrders] = useState({});
  const [user, setUser] = useState(null);
  const [outlet, setOutlet] = useState({});
  const value = useMemo(() => ({ isLogIn, setIsLogIn }), [isLogIn]);
  const orderValue = useMemo(() => ({ orders, setOrders }), [orders]);
  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const outletValue = useMemo(() => ({ outlet, setOutlet }), [outlet]);
  return (
    <LoginContext.Provider value={value}>
      <OrderContext.Provider value={orderValue}>
        <UserContext.Provider value={userValue}>
          <OutletContext.Provider value={outletValue}>
            <Component {...pageProps} />
          </OutletContext.Provider>
        </UserContext.Provider>
      </OrderContext.Provider>
    </LoginContext.Provider>
  );
}

export default MyApp;
