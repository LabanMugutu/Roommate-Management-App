import React from "react";

const Card = ({ title, children }) => (
  <div className="bg-white shadow rounded-lg p-4">
    {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
    <div>{children}</div>
  </div>
);

export default Card;
