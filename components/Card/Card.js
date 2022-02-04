const Card = ({ content }) => {
  return (
    <div className="mt-10 mx-4 rounded-md border-gray-200 shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105">
      <img className="w-full h-52 object-cover" src={content.img} alt="" />
      <div className="h-10 text-center font-bold text-teal-600">
        <p className="mt-4">{content.text}</p>
      </div>
    </div>
  );
};

export default Card;
