const Card = ({ content }) => {
  let cardContent = (
    <div className="h-10 text-center font-bold text-teal-600">
      <p className="mt-4">{content.text}</p>
    </div>
  );
  if (content.res) {
    cardContent = (
      <div className="ml-2 ">
        <div className="flex justify-between mt-2">
          <p className=" font-semibold text-medium tracking-wider">
            {content.res}
          </p>
          <div className="rounded-sm bg-green-600 text-white mr-2">
            <p className="px-2">{content.rating} </p>
          </div>
        </div>
        <div className="flex justify-between mb-2 mt-2">
          <p className="text-sm  text-gray-500 capitalize">{content.text}</p>
          <p className="mr-2 text-sm  text-gray-500">{content.price} for one</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-10 mx-4 rounded-md border-gray-200 shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105">
      <img className="w-full h-52 object-cover" src={content.img} alt="" />
      {cardContent}
    </div>
  );
};

export default Card;
