import React from 'react';

const Item = ({ name, quantity, category }) => {
  return (
    <div className="mb-2 bg-indigo-950 rounded-lg transition-all hover:bg-indigo-900">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl text-white font-semibold">{name}</h3>
            <p className="text-sm text-indigo-300">
              Buy {quantity} in {category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;