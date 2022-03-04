import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { LoginContext, OrderContext, OutletContext } from "../_app";

const Details = ({ resData }) => {
  console.log(resData);
  const { orders, setOrders } = useContext(OrderContext);
  const { isLogIn } = useContext(LoginContext);
  const { outlet, setOutlet } = useContext(OutletContext);
  useEffect(() => {
    const outletData = { name: resData.name, period: resData.servicePeriod };
    // console.log("htfg");
    console.log(outletData);
    // console.log("brd");
    setOutlet(outletData);
  }, []);
  console.log(isLogIn);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  // const [ordering, setOrdering] = useState(false);
  const [flag, setFlag] = useState(true);
  const router = useRouter();

  let orderDiv = null;

  const orderHandler = (name, price) => {
    // if (ordering) {
    // } else {
    console.log(name, price);
    const updatedOrder = [...order, { name, price, quantity: 1 }];
    let updatedTotal = +total;
    updatedTotal += +price;
    setOrder(updatedOrder);
    setTotal(updatedTotal);
    // setOrdering(true);
    // orderDiv = (
    //   <div className="flex justify-between">
    //     <h1>Your Order ({order.length})</h1>
    //     <p>Subtotal : Rs. {total}</p>
    //   </div>
    // );
    // console.log(order, total);
    // setOrdering(false);
    // }
  };

  const checkoutHandler = () => {
    const updatedOrder = { order: order, total: total };
    // const outletData = { name: resData.name, period: resData.servicePeriod };
    // setOutlet(outletData);
    setOrders(updatedOrder);
    if (isLogIn) {
      router.push(`/checkout?Id=${resData._id}`);
    } else {
      alert("Please Login or Sign Up First");
    }
  };

  if (order.length !== 0) {
    orderDiv = (
      <div className="flex justify-between bg-white shadow-md shadow-gray-800 w-full px-52 py-2 items-center">
        <h1 className="text-xl tracking-wide ">Your Order ({order.length})</h1>
        <div className="flex gap-4 items-center">
          <p className="text-xl tracking-wide ">
            Subtotal: <span className="inline font-semibold">₹{total}</span>
          </p>
          <button
            onClick={checkoutHandler}
            className="text-lg tracking-wide font-light bg-teal-600 text-white px-8 py-2 rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
  // let flag = true;

  const addHandler = (name, price) => {
    const updatedOrders = [...order];
    let updatedTotal = +total;
    updatedOrders.map((order, index) => {
      if (order.name === name) {
        const updatedOrder = { ...order };
        updatedOrder.quantity += 1;
        updatedTotal += +price;
        updatedOrders.splice(index, 1, updatedOrder);
        return;
      }
    });
    setOrder(updatedOrders);
    setTotal(updatedTotal);
  };
  const subtractHandler = (name, price) => {
    const updatedOrders = [...order];
    let updatedTotal = +total;
    updatedOrders.map((order, index) => {
      if (order.name === name) {
        const updatedOrder = { ...order };
        updatedOrder.quantity -= 1;
        updatedTotal -= +price;
        if (updatedOrder.quantity <= 0) {
          updatedOrders.splice(index, 1);
        } else {
          updatedOrders.splice(index, 1, updatedOrder);
        }
        return;
      }
    });
    setOrder(updatedOrders);
    setTotal(updatedTotal);
  };

  let button = null;

  const buttonHandler = (name, price) => {
    button = (
      <button
        onClick={() => orderHandler(name, price)}
        className="rounded-lg bg-teal-50 border-teal-600 border-2 py-1 px-3 text-teal-600 text-sm font-semibold tracking-wide hover:bg-teal-100"
      >
        ADD +
      </button>
    );
    order.map((order) => {
      if (order.name === name) {
        button = (
          <div>
            <button
              onClick={() => subtractHandler(name, price)}
              className="rounded-l-lg bg-teal-50 border-teal-600 border-y-2 border-l-2 py-1 px-3 text-teal-600 text-sm font-semibold tracking-wide hover:bg-teal-100"
            >
              -
            </button>
            <button className=" bg-teal-50 border-teal-600 border-y-2 py-1 px-3 text-teal-600 text-sm font-semibold tracking-wide hover:bg-teal-100 inline">
              {order.quantity}
            </button>
            <button
              onClick={() => addHandler(name, price)}
              className="rounded-r-lg bg-teal-50 border-teal-600 border-y-2 border-r-2 py-1 px-3 text-teal-600 text-sm font-semibold tracking-wide hover:bg-teal-100 inline"
            >
              +
            </button>
          </div>
        );
      }
    });
  };

  // console.log(resData);
  const menu = resData.menuList.map((menu, index) => {
    return (
      <div className="mb-6" key={index}>
        <div className="flex justify-between items-start">
          <h1 className="text-lg font-semibold">{menu.name}</h1>
          {buttonHandler(menu.name, menu.price)}
          {button}
        </div>
        <p className=" text-gray-600 tracking-wide text-sm">
          {menu.description}
        </p>
        <p className="mt-1 text-gray-600 tracking-wide text-sm">
          ₹{menu.price}
        </p>
      </div>
    );
  });
  return (
    <div className="mx-52 relative">
      <div>
        <Navbar />
      </div>
      <div className="fixed bottom-0 left-0 right-0">{orderDiv}</div>
      <div className="bg-gray-100 h-0.5 mt-5 mb-10 rounded-full"></div>
      <div>
        <img
          className="w-full rounded-2xl h-80 overflow-hidden object-cover"
          src={resData.image}
          alt=""
        />
      </div>
      <div className="mt-4">
        <p className="text-4xl font-medium tracking-wider">{resData.name}</p>
        <p className="mt-2 text-gray-600 tracking-wider capitalize">
          {resData.tags}
        </p>
        <p className="mt-2 text-gray-500 text-sm tracking-wider capitalize">
          Open Now - {resData.timeFrom} - {resData.timeTo}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-lg tracking-wider text-gray-600 font-semibold border-teal-600 border-b-2 ">
          Order a Lunch Box Service Online
        </p>
      </div>
      <div className="mt-4 mb-20 ">{menu}</div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await axios.get(`${process.env.SERVER_URL}/api/outlets`);
  const paths = res.data.map((item) => {
    return {
      params: { id: item._id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await axios.get(`${process.env.SERVER_URL}/api/outlets/${id}`);
  // console.log(res.data);
  // const resDetails = res.data.hits.filter((res) => {
  // console.log(res.id);
  //   return res.id.toString() === id;
  // });
  //   console.log(id);
  //   console.log(resDetails);

  //console.log(res.data);
  return {
    props: {
      resData: res.data,
    },
  };
};

export default Details;
