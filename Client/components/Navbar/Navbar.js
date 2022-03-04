import { useContext, useState, useEffect } from "react";
import { LoginContext, UserContext } from "../../pages/_app";
import { useRouter } from "next/router";
import Link from "next/link";
const Navbar = () => {
  const { isLogIn } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  // console.log(isLogIn);
  useEffect(() => {
    if (user === null) {
      // console.log(12);
      return router.push("/");
    }
    console.log(user);
    setUserData(user);
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
      <div className="bg-white rounded-lg h-28 w-40 py-4 shadow-md">
        <div className="hover:bg-gray-200 w-full">
          <Link href="/history">
            <a>
              <div className="mb-2 text-base font-base pl-4 py-2 tracking-wide">
                Order History
              </div>
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
    <ul className="flex justify-end gap-4">
      <li
        onClick={loginHandler}
        className="btn bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white"
      >
        Log In
      </li>
      <li
        onClick={signupHandler}
        className="btn bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white "
      >
        Sign Up
      </li>
    </ul>
  );
  if (isLogIn) {
    button = (
      <ul>
        <li>
          <button
            onClick={modalHandler}
            className="btn bg-white border-teal-600 border-2 text-teal-600 hover:bg-teal-600 hover:text-white "
          >
            {userData?.name?.split(" ")[0]} ↓
          </button>
        </li>
      </ul>
    );
  }
  return (
    <div className="mt-5">
      <nav className="flex justify-between relative">
        <div>
          <p className="font-bold text-4xl text-teal-600">Dibba</p>
        </div>
        <div>
          {button}
          <div className="mr-0.5 absolute top-0 right-1 mt-12">{m}</div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
