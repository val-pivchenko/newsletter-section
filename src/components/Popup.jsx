import React from "react";

const Popup = ({ active, error, success, message }) => {
  setTimeout(() => {
    active = false;
  }, 1000);

  return (
    <div
      className={
        !active
          ? `w-full flexflex-row rounded-3xl items-center col-span-4 absolute invisible top-0 left-0 md:max-w-[499px]`
          : `w-full flex flex-row rounded-3xl items-center col-span-4 absolute active lg:max-w-[499px] m-auto left-0 right-0 ${
              success ? "bg-green-50" : "bg-red-50"
            } `
      }
    >
      <div>
        <p
          className={
            success
              ? "text-green-700 text-sm font-medium bg-white rounded-3xl px-2.5 py-0.5 ml-1 my-3 mr-3 shadow-sm"
              : "text-red-800 text-sm font-medium bg-white rounded-3xl px-2.5 py-0.5 ml-1 my-3 mr-3 shadow-sm"
          }
        >
          {success && "Success"}
          {error && "Error"}
        </p>
      </div>
      <p
        className={
          success
            ? "text-green-700 text-sm mr-12 md:mr-0 my-1 font-medium"
            : "text-red-600 text-sm mr-12 my-1 md:mr-0 font-medium"
        }
      >
        {message}
      </p>
    </div>
  );
};

export default Popup;
