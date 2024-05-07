import { useState } from "react";
import { RiCheckFill } from "@remixicon/react";
import Popup from "./Popup";

const Newsletter = () => {
  const [emailRequiredError, setEmailRequired] = useState(false);
  const [emailInvalidError, setEmailInvalid] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [requestError, setRequestError] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userEmail === "") {
      setEmailRequired(true);
      return;
    }

    if (!userEmail.match(emailRegex)) {
      setEmailInvalid(true);
      return;
    }

    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/projects/challenges/newsletter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      setRequestError(false);
      setRequestSuccess(true);
    } catch (error) {
      console.error(error);
      setRequestSuccess(false);
      setRequestError(true);
      setMessage(
        "Failed to subscribe. Please ensure your email is correct or try again later."
      );
    }

    const response = await fetch(
      "https://www.greatfrontend.com/api/projects/challenges/newsletter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
        }),
      }
    );

    const data = await response.json();

    console.log(data);
  };

  return (
    <div className="grid grid-cols-4 w-full gap-x-4 bg-white rounded-lg py-8 relative md:grid-cols-6 lg:grid-cols-12 lg:px-16 lg:py-24 place-content-center">
      <Popup
        active={requestError || requestSuccess}
        error={requestError}
        success={requestSuccess}
        message={message}
      />
      <div className="col-span-4 md:col-span-6 lg:col-span-6 mx-3 md:mx-4 lg:mx-8 place-self-center">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900">
            Get the finest curated abstracts delivered weekly to your inbox
          </h1>
          <ul className="w-full flex flex-col gap-y-5 mt-8">
            <div className="flex flex-row items-center">
              <RiCheckFill className="min-w-6 w-6 min-h-6 h-6 text-lg text-indigo-500 bg-indigo-50 rounded-full mr-3" />
              <li className="text-lg w-full text-neutral-600">
                Exclusive access to new abstract images and collections
              </li>
            </div>
            <div className="flex flex-row items-center">
              <RiCheckFill className="min-w-6 w-6 min-h-6 h-6 text-indigo-500 bg-indigo-50 rounded-full mr-3" />
              <li className="text-lg w-full text-neutral-600">
                Unlock special promotions only for subscribers
              </li>
            </div>
            <div className="flex flex-row items-center">
              <RiCheckFill className="min-w-6 w-6 min-h-6 h-6 text-indigo-500 bg-indigo-50 rounded-full mr-3" />
              <li className="text-lg w-full text-neutral-600">
                Regular doses of artistic inspiration
              </li>
            </div>
          </ul>
        </div>
        <div>
          <form className="w-full flex flex-col md:flex-row">
            <div className="flex flex-col">
              <input
                className="w-full placeholder-neutral-500 text-sm px-3.5 py-2.5 h-10 bg-neutral-50 border rounded-md border-neutral-200 focus:ring-4 focus:ring-indigo-50 focus:outline-1 focus:outline-indigo-700"
                type="email"
                id="email"
                autoComplete="email"
                name="userEmail"
                required
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => {
                  setEmailRequired(false);
                  setEmailInvalid(false);
                  setUserEmail(e.target.value);
                }}
              />
              {emailRequiredError && (
                <p className="text-sm text-red-600 mt-1.5">
                  Email address is required.
                </p>
              )}
              {emailInvalidError && (
                <p className="text-sm text-red-600 mt-1.5">
                  Please enter a valid email address.
                </p>
              )}
              <p className="text-neutral-600 text-base mt-3 mb-4">
                We only send you the best! No spam.
              </p>
            </div>
            <button
              className="bg-indigo-700 hover:bg-[#3730A3] focus:bg-[#3730A3] focus:ring-4 text-sm focus:ring-indigo-50 w-full md:w-24 md:ml-4 h-10 flex items-center justify-center rounded-md text-white py-2.5"
              type="submit"
              onClick={handleSubmit}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="col-span-4 md:col-span-6 mx-3 my-4 md:my-12 mb-4 md:mx-4 lg:mx-8 md:mt-16 lg:my-24 place-self-center">
        <img
          className="w-full  lg:max-w-[592px] rounded-3xl "
          src="/abstract.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Newsletter;
