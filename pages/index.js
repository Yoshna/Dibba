import Card from "../components/Card/Card";
export default function Home() {
  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-128 object-cover"
          src="/images/food.jpg"
          alt="food"
        />
        <nav className="absolute top-0 right-5 mt-8">
          <ul className="flex justify-end ">
            <li>
              <a className="btn bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white ">
                Sign In
              </a>
            </li>
            <li className="ml-5 mr-20 ">
              <a className="btn bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute top-48 inset-x-0 ">
          <h1 className="text-center text-white text-8xl font-bold">Dibba</h1>
          <h1 className="text-center text-white text-4xl mt-4 font-medium	italic">
            One Stop For Best Lunch Box Services In the Town
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <Card
          content={{
            img: "/images/lunchbox.jpeg",
            text: "Order a Lunch Box Service",
          }}
        />
        <Card
          content={{
            img: "/images/foodshop.jpg",
            text: "Register a Lunch Box Service",
          }}
        />
      </div>
    </div>
  );
}
