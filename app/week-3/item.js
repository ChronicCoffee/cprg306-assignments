import React from 'react';


const Item = ({ name, quantity, category }) => {
  return (
    <li className="flex items-center justify-between py-2 px-4 bg-gray-100 rounded-md mb-2">
      <div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <span className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md">{quantity}</span>
    </li>
  );
};
export default Item;