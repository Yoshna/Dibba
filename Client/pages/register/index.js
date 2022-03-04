import Navbar from "../../components/Navbar/Navbar";
import { useState, useContext } from "react";
import { LoginContext } from "../_app";
import axios from "axios";
import { useRouter } from "next/router";
// import cloudinary from "cloudinary";

const Register = ({ cookieData }) => {
  const { isLogIn } = useContext(LoginContext);
  const options = [];
  const [oName, setOName] = useState("");
  const [oAddress, setOAddress] = useState("");
  const [oTags, setOTags] = useState("");
  const [oImage, setOImage] = useState(null);
  const [oTimeFrom, setOTimeFrom] = useState("");
  const [oTimeTo, setOTimeTo] = useState("");
  const [checkedState, setCheckedState] = useState({
    "10 days": false,
    "20 days": false,
    "1-3 months": false,
    "3-6 months": false,
    "1 year": false,
    "3 years": false,
  });
  // const [oServicePeriod, setOServicePeriod] = useState([]);
  const [oPrice, setOPrice] = useState("");
  const [menuList, setMenuList] = useState([
    {
      name: "",
      description: "",
      price: "",
    },
  ]);

  const router = useRouter();

  const addMenuHandler = (e) => {
    e.preventDefault();
    const newMenuList = [...menuList];
    newMenuList.push({
      name: "",
      description: "",
      price: "",
    });
    setMenuList(newMenuList);
  };

  const onNameChangeHandler = (e) => {
    setOName(e.target.value);
  };
  const onAddressChangeHandler = (e) => {
    setOAddress(e.target.value);
  };
  const onTagsChangeHandler = (e) => {
    setOTags(e.target.value);
  };
  const onImageChangeHandler = async (e) => {
    // cloudinary.v2.uploader.upload(e.target.files[0], (err, result) => {
    //   console.log(error);
    //   console.log(result);
    // });
    console.log(e.target.files[0]);
    setOImage(e.target.files[0]);
    // try {
    //   const formData = new FormData();
    //   formData.append("file", e.target.files[0]);
    //   formData.append("upload_preset", "vsu3wtgx");
    //   formData.append("api_key", "435831236418618");

    //   const res = await axios.post(
    //     "https://api.cloudinary.com/v1_1/dibba/image/upload",
    //     formData
    //   );
    //   console.log(res.data.url);
    //   setOImage(res.data.url);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  const onTimeFromChangeHandler = (e) => {
    setOTimeFrom(e.target.value);
  };
  const onTimeToChangeHandler = (e) => {
    setOTimeTo(e.target.value);
  };
  const onServicePeriodChangeHandler = (e) => {
    const newCheckedState = { ...checkedState };
    newCheckedState[e.target.value] = !checkedState[e.target.value];
    setCheckedState(newCheckedState);
    // console.log(e.target.value);
  };
  const onPriceChangeHandler = (e) => {
    setOPrice(e.target.value);
  };
  const onMenuNameChangeHandler = (e, id, index) => {
    const newMenuList = [...menuList];
    // if (newMenuList.length === 1) {
    //   newMenuList.id = e.target.value;
    //   setMenuList(newMenuList);
    // } else {
    const newMenuListItem = { ...newMenuList[index] };
    newMenuListItem[id] = e.target.value;
    newMenuList[index] = newMenuListItem;
    setMenuList(newMenuList);
    //}
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogIn) {
      const img = null;
      try {
        const formData = new FormData();
        formData.append("file", oImage);
        formData.append("upload_preset", "vsu3wtgx");
        formData.append("api_key", "435831236418618");

        img = await axios.post(
          "https://api.cloudinary.com/v1_1/dibba/image/upload",
          formData
        );
        console.log(img.data.url);
      } catch (err) {
        console.log(err);
      }
      const outlet = {
        name: oName,
        address: oAddress,
        tags: oTags,
        image: img.data.url,
        timeFrom: oTimeFrom,
        timeTo: oTimeTo,
        servicePeriod: Object.keys(checkedState).filter(
          (key) => checkedState[key]
        ),
        price: oPrice,
        menuList: menuList,
      };
      console.log(outlet);
      console.log("efd");
      let cookies = document.cookie.split(";");
      console.log(cookies);
      console.log("scdsd");
      if (oTimeFrom > oTimeTo) {
        alert("Enter correct time period");
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/outlets`,
          outlet,
          { withCredentials: true }
        );
        router.push("/");
      }
    } else {
      alert("Please Login or Sign Up First");
    }
  };

  return (
    <div className="mx-52">
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100 h-0.5 mt-10 mb-12 rounded-full "></div>
      <div>
        <h1 className="text-4xl tracking-wider font-medium">
          Lunch Box Service Information
        </h1>
        <div className="mt-10 mr-20 rounded-md border-gray-200 border px-8 pt-8">
          <h1 className="text-2xl tracking-wider font-medium">
            Outlet details
          </h1>
          <p className="text-md text-gray-500 font-light mb-4">
            Name, address, cuisine, menu and pricing
          </p>
          <form>
            <input
              value={oName}
              onChange={onNameChangeHandler}
              className="input"
              type="text"
              placeholder="Outlet name"
            />
            <input
              value={oAddress}
              onChange={onAddressChangeHandler}
              className="input"
              type="text"
              placeholder="Outlet address"
            />
            <input
              value={oTags}
              onChange={onTagsChangeHandler}
              className="input"
              type="text"
              placeholder="Outlet tags"
            />
            <div className="input">
              <p className="text-lg font-light tracking-wider text-gray-400 mb-2">
                Outlet cover image
              </p>
              <input
                // value={oImage}
                onChange={onImageChangeHandler}
                type="file"
                accept="image/*"
              />
            </div>
            <div className="input">
              <p className="text-lg font-light tracking-wider text-gray-400">
                Outlet opening hours
              </p>
              <div className="flex justify-between gap-2 items-center">
                <p className="inline text-gray-600 font-light tracking-wider text-base w-20">
                  From
                </p>
                <input
                  value={oTimeFrom}
                  onChange={onTimeFromChangeHandler}
                  className="input"
                  type="time"
                  placeholder="from"
                />
              </div>
              <div className="flex justify-between gap-2 items-center">
                <p className="inline text-gray-600 font-light tracking-wider text-base w-20">
                  To
                </p>
                <input
                  value={oTimeTo}
                  onChange={onTimeToChangeHandler}
                  className="input"
                  type="time"
                  placeholder="to"
                />
              </div>
            </div>
            <div className="input">
              <p className="text-lg font-light tracking-wider text-gray-400 mb-1">
                Outlet service period options available
              </p>
              <input
                onChange={onServicePeriodChangeHandler}
                className="mr-2"
                type="checkbox"
                value="10 days"
              />
              <p className="inline text-gray-600 font-light tracking-wider text-base">
                10 days
              </p>
              <br />
              <input
                onChange={onServicePeriodChangeHandler}
                className="mr-2 "
                type="checkbox"
                value="20 days"
              />
              <p className="inline text-gray-600 font-light tracking-wider text-base">
                20 days
              </p>
              <br />
              <input
                onChange={onServicePeriodChangeHandler}
                className="mr-2 "
                type="checkbox"
                value="1-3 months"
              />
              <p className="inline text-gray-600 font-light tracking-wider text-base">
                1-3 months
              </p>
              <br />
              <input
                onChange={onServicePeriodChangeHandler}
                className="mr-2 "
                type="checkbox"
                value="3-6 months"
              />
              <p className="inline text-gray-600 font-light tracking-wider text-base">
                3-6 months
              </p>
              <br />
              <input
                onChange={onServicePeriodChangeHandler}
                className="mr-2 "
                type="checkbox"
                value="1 year"
              />
              <p className="inline text-gray-600 font-light tracking-wider text-base">
                1 year
              </p>
              <br />
              <input
                onChange={onServicePeriodChangeHandler}
                className="mr-2 "
                type="checkbox"
                value="3 years"
                s
              />
              <p className="inline text-gray-600 font-light tracking-wider text-base">
                3 years
              </p>
              <br />
            </div>
            <input
              value={oPrice}
              onChange={onPriceChangeHandler}
              className="input"
              type="number"
              placeholder="Outlet pricing for one"
            />
            {/* <h1 className="text-2xl tracking-wider font-medium mt-6">
              Outlet owner details
            </h1>
            <p className="text-md text-gray-500 font-light mb-4">
              These will be used to share revenue related communications
            </p>
            <input
              className="input"
              type="text"
              placeholder="Full name of owner"
            />
            <input
              className="input"
              type="email"
              placeholder="Email address of owner"
            />
            <input
              className="input"
              type="number"
              placeholder="Contact number of owner"
            /> */}
            <h1 className="text-2xl tracking-wider font-medium mt-6">
              Outlet Menu
            </h1>
            <p className="text-md text-gray-500 font-light mb-4">
              Menu and pricing will be displayed for online orders
            </p>
            <div className="input">
              {menuList.map((num, index) => {
                return (
                  <div key={index} className="flex justify-between gap-2">
                    <input
                      onChange={(e) =>
                        onMenuNameChangeHandler(e, "name", index)
                      }
                      value={menuList[index].name}
                      className="input"
                      type="text"
                      placeholder="Item"
                    />
                    <input
                      onChange={(e) =>
                        onMenuNameChangeHandler(e, "description", index)
                      }
                      value={menuList[index].description}
                      className="input"
                      type="text"
                      placeholder="Description"
                    />
                    <input
                      onChange={(e) =>
                        onMenuNameChangeHandler(e, "price", index)
                      }
                      value={menuList[index].price}
                      className="input"
                      type="number"
                      placeholder="Price ( per day )"
                    />
                  </div>
                );
              })}
              <div className="flex justify-end mt-4 items-center gap-4">
                <p className="text-lg font-light tracking-wider text-gray-600 mb-1">
                  Add more items
                </p>
                <button
                  onClick={addMenuHandler}
                  className="rounded-full text-lg text-center border-teal-600 border-2 text-teal-600 shadow-md hover:bg-teal-600 w-12 h-12 hover:text-white hover:shadow-lg "
                >
                  +
                </button>
              </div>
            </div>
            <div className=" text-center mt-8 mb-6">
              <button
                onClick={submitHandler}
                className="bg-teal-600 rounded-full py-2 px-4 text-xl text-white border-white border-2 hover:bg-white hover:border-teal-600 hover:border-2 hover:text-teal-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  let cookie = context.req.headers.cookie.split("=");
  console.log(cookie[1]);
  return {
    props: {
      cookie: cookie[1],
    },
  };
};

export default Register;
