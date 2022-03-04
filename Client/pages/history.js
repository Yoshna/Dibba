import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
const History = ({ orderData }) => {
  console.log(orderData);
  // let arr = [];

  // const outletData = orderData.filter((o) => {
  //   console.log(o.outletId);
  //   outlets.forEach((outlet) => {
  //     console.log(outlet._id);
  //     if (outlet._id == o.outletId) {
  //       arr.push()
  //     }
  //   });

  // });
  //console.log(outletData);
  const order = orderData.map((order, ind) => {
    return (
      <div
        key={ind}
        className="border border-gray-200 shadow rounded-md px-4 py-2 mt-4 mb-6"
      >
        <div>
          <h1 className="tracking-wider text-base mt-2">Order From</h1>
          <h1 className="tracking-wider font-semibold text-lg mt-1">
            {order.outletId.name}
          </h1>
        </div>
        {order.order.map((o, id) => {
          return (
            <div key={id} className="flex justify-between mt-2 items-center">
              <div className="font-light text-base text-gray-800 tracking-wide ">
                {o.name}
              </div>
              <div className="bg-teal-50 border-teal-600 border px-4 py-0.5 rounded-lg text-teal-600 text-sm font-semibold tracking-wide">
                {o.quantity}
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center mt-4">
          <h1 className="font-semibold text-lg">Service Period: </h1>
          <h1 className="font-semibold text-lg">{order.servicePeriod}</h1>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h1 className="font-semibold text-lg">Total price: </h1>
          <h1 className="font-semibold text-lg">₹{order.price}</h1>
        </div>
      </div>
    );
  });
  return (
    <div className="mx-52">
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100 h-0.5 mt-10 mb-8 rounded-full"></div>
      <div>
        <h1 className="text-2xl font-medium px-2 tracking-wider ">
          Order History
        </h1>
        <div className="mt-6">{order}</div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await axios.get(`${process.env.SERVER_URL}/api/order/user`, {
    headers: {
      cookie: context.req.headers.cookie ? context.req.headers.cookie : null,
    },
  });
  // const res1 = await axios.get(`${process.env.SERVER_URL}/api/outlets`, {
  //   headers: {
  //     cookie: context.req.headers.cookie ? context.req.headers.cookie : null,
  //   },
  // });
  // console.log(res);
  // console.log(res1.data);
  return {
    props: {
      orderData: res.data,
    },
  };
};

export default History;
