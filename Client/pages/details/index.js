import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import OrderCard from "../../components/OrderCard/OrderCard";

const Details = () => {
  const [orderData, setOrderData] = useState([]);
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/details`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setOrderData(res.data.orders);
      });
  }, []);
  console.log(orderData);

  const deliveredHandler = async (id) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/${id}`,
      {
        withCredentials: true,
      }
    );
    const newOrderData = [...orderData];
    orderData.map((order, index) => {
      if (order._id === id) {
        const newOrder = { ...newOrderData[index] };
        newOrder.delivered = true;
        newOrderData[index] = newOrder;
        setOrderData(newOrderData);
      }
    });
  };

  const historyHandler = () => {
    setActive(false);
  };
  const activeHandler = () => {
    setActive(true);
  };

  let orders = null;

  if (active) {
    orders = orderData.map((order) => {
      if (order.delivered !== true) {
        return (
          <OrderCard
            orderData={order}
            delivered={() => deliveredHandler(order._id)}
          />
        );
      }
    });
  } else {
    orders = orderData.map((order) => {
      if (order.delivered === true) {
        return (
          <OrderCard
            orderData={order}
            delivered={() => deliveredHandler(order._id)}
          />
        );
      }
    });
  }

  return (
    <div className="mx-52">
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100 h-0.5 mt-10 mb-8 rounded-full "></div>
      <div className="mb-4">
        <div className="text-3xl font-semibold tracking-wide mb-6 ml-1">
          {name}
        </div>
        <div className="flex gap-8 mb-8">
          <button
            onClick={activeHandler}
            className="text-xl font-medium px-2 tracking-wider border-b-2 border-white hover:border-b-2 hover:border-teal-600"
          >
            Active Orders
          </button>
          <button
            onClick={historyHandler}
            className="text-xl font-medium px-2 tracking-wider border-b-2 border-white hover:border-b-2 hover:border-teal-600"
          >
            History
          </button>
        </div>
        {/* <div className="bg-gray-100 h-0.5 mb-8 rounded-full "></div> */}
        <div>{orders}</div>
      </div>
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/details`,
//     {
//       headers: {
//         cookie: context.req.headers.cookie ? context.req.headers.cookie : null,
//       },
//     }
//   );
//   console.log(res.data);
//   return {
//     props: {
//       orderData: res.data,
//     },
//   };
// };

export default Details;
