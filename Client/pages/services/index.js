import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Card from "../../components/Card/Card";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../_app";
import { useRouter } from "next/router";

const Services = ({ data }) => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  //console.log(user.out)
  const router = useRouter();
  useEffect(() => {
    console.log(user);
    if (user === null) {
      //console.log(12);
      return router.push("/");
    }

    console.log(user);
    // console.log(user.outlet[0]);
    if (user.outlet.length !== 0) setUserData(user.outlet[0]);
    else setUserData("no");
    // setTimeout(() => {
    //   console.log(user.outlet[0]);
    //   console.log(user.outlet.length);
    //   if (user.outlet.length !== 0) setUserData(user.outlet[0]);
    //   else setUserData("no");
    // }, 20);
  }, []);
  //let userData = null;
  //console.log(userData);
  let cards = null;
  if (userData) {
    cards = data.map((card) => {
      if (userData === "no" || userData !== card._id) {
        return (
          <Link href={`/services/${card._id}`} key={card._id}>
            <a>
              <Card
                content={{
                  img: card.image,
                  text: card.tags,
                  res: card.name,
                  price: card.price,
                  rating: "4.5",
                }}
              />
            </a>
          </Link>
        );
      }
    });
  }
  return (
    <div className="mx-52">
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100 h-0.5 mt-10 mb-12 rounded-full"></div>
      <div className="">
        <h1 className="font-medium text-3xl tracking-wider">
          Order Lunch Boxes in Central Delhi
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-2">{cards}</div>
    </div>
  );
};

export const getStaticProps = async () => {
  // console.log(process.env.SERVER_URL);
  const res = await axios.get(`${process.env.SERVER_URL}/api/outlets`);
  // console.log(res.data);
  return {
    props: {
      data: res.data,
    },
  };
};

export default Services;
