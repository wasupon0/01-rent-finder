import React from "react";

export const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}) => {
  return (
    <div className={`p-6 ${backgroundColor} rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block px-4 py-2 text-white ${buttonInfo.backgroundColor} rounded-lg hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};
