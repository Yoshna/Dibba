const OrderCard = ({ orderData, delivered }) => {
  let button = (
    <button
      onClick={delivered}
      className="bg-teal-600 text-white rounded-full px-4 py-2 tracking-wider font-semibold border-2 border-white hover:border-2 hover:border-teal-600 hover:bg-white hover:text-teal-600 hover:font-semibold"
    >
      Delivered
    </button>
  );
  if (orderData.delivered === true) {
    button = null;
  }
  return (
    <div className="border border-gray-200 rounded-lg pl-6 pr-10 py-4 shadow-md mt-4">
      <h1 className="font-semibold text-xl">{orderData.name}</h1>
      <div className="flex justify-between mt-1">
        <h1 className="font-light text-gray-800">
          <span className="font-medium text-black">Address: </span>{" "}
          {orderData.address}
        </h1>
        <h1 className="font-light text-gray-800">
          <span className="font-medium text-black">Pincode: </span>
          {orderData.pincode}
        </h1>
      </div>
      <h1 className="font-light text-gray-700">
        <span className="font-medium text-black">Service Period: </span>
        {orderData.servicePeriod}
      </h1>
      <h1 className="font-semibold text-lg mt-4">Order List</h1>
      {orderData.order.map((o, id) => {
        return (
          <div key={id} className="flex justify-between mt-1 items-center">
            <div className="font-light text-base text-gray-800 tracking-wide ">
              {o.name}
            </div>
            <div className="bg-teal-50 border-teal-600 border px-4 py-0.5 rounded-lg text-teal-600 text-sm font-semibold tracking-wide">
              {o.quantity}
            </div>
          </div>
        );
      })}
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-lg">Total price: </h1>
        <h1 className="font-semibold text-lg">₹{orderData.price}</h1>
      </div>
      <div className="text-center mt-2">{button}</div>
    </div>
  );
};

export default OrderCard;
