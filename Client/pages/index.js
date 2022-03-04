import Card from "../components/Card/Card";
import Link from "next/link";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext, UserContext } from "./_app";
export default function Home({ isLogin, users }) {
  const { isLogIn, setIsLogIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  // console.log("cdd");
  // console.log(users);
  useEffect(() => {
    setIsLogIn(isLogin);
    setUser(users);
  }, []);

  const signupHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google/signup`;
  };
  const loginHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google/login`;
  };
  const logoutHandler = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`;
  };
  let m = null;
  if (modal) {
    m = (
      <div className="bg-white rounded-lg h-28 w-40 py-4 ">
        <div className="hover:bg-gray-200 w-full">
          <Link href="/history">
            <a>
              <h1 className="mb-2 text-base font-base pl-4 py-2 tracking-wide">
                Order History
              </h1>
            </a>
          </Link>
        </div>
        <div className="hover:bg-gray-200 w-full">
          <button
            onClick={logoutHandler}
            className="text-base font-base pl-4 py-2 tracking-wide"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  const modalHandler = () => {
    setModal(!modal);
  };

  let button = (
    <>
      <li>
        <button
          onClick={loginHandler}
          className="btn bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white "
        >
          Log In
        </button>
      </li>
      <li className="ml-5 mr-20 ">
        <button
          onClick={signupHandler}
          className="btn bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white"
        >
          Sign Up
        </button>
      </li>
    </>
  );
  if (isLogin) {
    button = (
      <li>
        <button
          onClick={modalHandler}
          className="btn mr-20 bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white "
        >
          {users.name.split(" ")[0]} ↓
        </button>
      </li>
    );
  }
  let card = (
    <Link href="/register">
      <a>
        <Card
          content={{
            img: "/images/foodshop.jpg",
            text: "Register a Lunch Box Service",
          }}
        />
      </a>
    </Link>
  );
  if (users && users.outlet.length > 0) {
    card = (
      <Link href="/details">
        <a>
          <Card
            content={{
              img: "/images/foodshop.jpg",
              text: "View Your Lunch Box Service",
            }}
          />
        </a>
      </Link>
    );
  }

  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-128 object-cover"
          src="/images/food.jpg"
          alt="food"
        />
        <nav className="absolute top-0 right-5 mt-8">
          <ul className="flex justify-end ">{button}</ul>
          <div className="mr-20">{m}</div>
        </nav>
        <div className="absolute top-48 inset-x-0 ">
          <h1 className="text-center text-white text-8xl font-bold">Dibba</h1>
          <h1 className="text-center text-white text-4xl mt-4 font-medium	italic">
            One Stop For Best Lunch Box Services In the Town
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <Link href="/services">
          <a>
            <Card
              content={{
                img: "/images/lunchbox.jpeg",
                text: "Order a Lunch Box Service",
              }}
            />
          </a>
        </Link>
        {card}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  //console.log(context);
  let isLogin = false;
  const res = await axios.get(`${process.env.SERVER_URL}/auth/login`, {
    headers: {
      cookie: context.req.headers.cookie ? context.req.headers.cookie : null,
    },
  });
  // console.log(res.data);
  // console.log("dsddf");
  if (res.data) {
    isLogin = true;
  }
  return {
    props: {
      isLogin: isLogin,
      users: res.data ? res.data : null,
    },
  };
};
