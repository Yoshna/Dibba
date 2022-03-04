import { useContext, useState } from "react";
import { OrderContext, UserContext, OutletContext } from "./_app";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
const Checkout = () => {
  const { orders } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const { outlet } = useContext(OutletContext);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [total, setTotal] = useState(orders.total);
  const [servicePeriod, setServicePeriod] = useState("1 day");

  const router = useRouter();
  const outletId = router.query;
  console.log(outletId);

  // console.log(outlet);
  // console.log(orders);

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };
  const pincodeHandler = (e) => {
    setPincode(e.target.value);
    // console.log(pincode.length);
  };
  const servicePeriodHandler = (e) => {
    const period = e.target.value;
    let t;
    if (period.slice(-3) === "day") {
      t = orders.total;
    } else if (period.slice(-4) === "days") {
      // console.log(period.slice(0, 2));
      t = orders.total * period.slice(0, 2);
    } else if (period.slice(-4) === "nths") {
      t = orders.total * period.slice(2, 3) * 30;
      // console.log(period.slice(2, 3));
    } else {
      t = orders.total * period.slice(0, 1) * 365;
      // console.log(period.slice(0, 1));
    }
    // console.log(period.slice(-4));
    setTotal(t);
    setServicePeriod(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const order = {
      name: user?.name,
      address: address,
      pincode: pincode,
      servicePeriod: servicePeriod,
      price: total,
      order: orders.order,
      outletId: outletId.Id,
      delivered: false,
      userId: user._id,
    };
    // try {
    console.log(pincode.length);
    if (pincode.length !== 6) {
      alert("Pincode should be of 6 digits");
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order`,
        order,
        { withCredentials: true }
      );
      router.push("/");
    }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="mx-52">
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100 h-0.5 mt-5 mb-10 rounded-full"></div>
      <div>
        <h1 className="text-4xl font-medium">Checkout</h1>
      </div>
      <div className="mt-6 px-4 py-4 border-gray-200 border rounded-md shadow-sm shadow-gray-200">
        <h1 className="text-2xl font-semibold">
          {user?.name}
          <span className="text-xl font-light"> ({user.emailId})</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 tracking-wide font-light">
          You are securely logged in
        </p>
      </div>
      <div className="mt-6 px-4 py-4 border-gray-200 border rounded-md shadow-sm shadow-gray-200">
        <h1 className="text-2xl font-medium tracking-wide">Delivery Address</h1>
        <input
          className="w-full mt-4 tracking-wide h-10 p-2 rounded-md border border-gray-200"
          type="text"
          value={address}
          onChange={addressHandler}
          placeholder="Add Address"
        />
        <input
          className="w-full mt-4 tracking-wide h-10 p-2 rounded-md border border-gray-200"
          type="number"
          value={pincode}
          onChange={pincodeHandler}
          placeholder="Pincode"
        />
      </div>
      <div className="mt-6 px-4 py-4 border-gray-200 border rounded-md shadow-sm shadow-gray-200">
        <h1 className="text-2xl font-medium tracking-wide">Service Period</h1>
        <select
          value={servicePeriod}
          onChange={servicePeriodHandler}
          className="w-full mt-4 tracking-wide h-10 p-2 rounded-md border border-gray-200"
        >
          <option value="1 day">1 day</option>
          {outlet.period.map((p, id) => {
            console.log(p);
            return (
              <option key={id} value={p}>
                {p}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-6 py-4 mb-4 border-gray-200 border rounded-md shadow-sm shadow-gray-200">
        <h1 className="text-2xl px-4 font-medium tracking-wide">
          Order Summary
        </h1>
        <div className="bg-gray-100 w-full py-1 rounded-sm mt-2">
          <h1 className="mt-4  px-4 text-sm tracking-widest ">ORDER FROM</h1>
          <p className="mt-1 px-4 font-semibold tracking-wide text-base">
            {outlet?.name}
          </p>
        </div>
        <div className="mt-4 px-4 ">
          {orders.order.map((order, id) => {
            return (
              <div className="mt-4" key={id}>
                <div className="flex justify-between items-center">
                  <p className="font-medium tracking-wide">{order?.name}</p>
                  <div>
                    <button
                      // onClick={() => subtractHandler(name, price)}
                      className="rounded-l-lg bg-teal-50 border-teal-600 border-y-2 border-l-2 py-1 px-3 text-teal-600 text-sm font-semibold tracking-wide hover:bg-teal-100"
                    >
                      -
                    </button>
                    <button className=" bg-teal-50 border-teal-600 border-y-2 py-1 px-3 text-teal-600 text-sm font-semibold tracking-wide hover:bg-teal-100 inline">
                      {order.quantity}
                    </button>
                    <button
                      // onClick={() => addHandler(name, price)}
                      className="rounded-r-lg bg-teal-50 border-teal-600 border-y-2 border-r-2 py-1 px-3 text-teal-600 text-sm font-semibold tracking-wide hover:bg-teal-100 inline"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-gray-600 tracking-wide text-sm">
                  ₹{order.price}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 px-4 py-2 flex justify-between items-center border-t border-gray-200">
          <p className="text-base tracking-wide font-medium">Subtotal</p>
          <p className="font-semibold  mr-8">₹{orders.total}</p>
        </div>
        <div className="mt-1 px-4 py-2 flex justify-between items-center border-b border-gray-200">
          <p className="text-base tracking-wide font-medium">Total</p>
          <p className="font-semibold  mr-8">₹{total}</p>
        </div>
        <div className=" mt-6 mb-2 text-center">
          <button
            onClick={submitHandler}
            className="text-xl px-8 py-2 rounded-full border-2 border-white font-medium tracking-widest bg-teal-600 text-white hover:bg-white hover:text-teal-600 hover:border-2 hover:border-teal-600"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
