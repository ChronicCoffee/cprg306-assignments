const Item = ({ id, name, quantity, category, onSelect, onDelete }) => {
  const getCategoryStyle = (category) => {
    const styles = {
      dairy: "border-l-sky-300",
      bakery: "border-l-yellow-900",
      produce: "border-l-emerald-300",
      meat: "border-l-red-300",
      "canned goods": "border-l-slate-500",
      "dry goods": "border-l-yellow-300",
      household: "border-l-stone-500",
      "frozen foods": "border-l-blue-300",
      beverages: "border-l-purple-300",
      snacks: "border-l-amber-300",
      other: "border-l-gray-300",
    };
    return styles[category] || "border-l-gray-400";
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={`mb-2 bg-indigo-950/60 rounded-lg transition-all hover:bg-indigo-900 
                       hover:translate-x-2 border-l-4 ${getCategoryStyle(
                         category
                       )}
                       backdrop-blur-sm shadow-lg hover:shadow-indigo-500/25 cursor-pointer`}
      onClick={() => onSelect && onSelect()}
    >
      <div className="p-3">
        <div className="flex items-center justify-between group">
          <div>
            <h3 className="text-lg text-white font-semibold flex items-center gap-2">
              {name}
            </h3>
            <p className="text-xs text-indigo-300 mt-0.5 opacity-80">
              Buy {quantity} in {category}
            </p>
          </div>
          {onDelete && (
            <button 
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300 ml-2"
              aria-label="Delete item"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;