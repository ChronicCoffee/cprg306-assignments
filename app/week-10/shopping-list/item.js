const Item = ({ name, quantity, category, onSelect }) => {
  const getCategoryStyle = (category) => {
    const styles = {
      dairy: "border-l-sky-300",
      bakery: "border-l-yellow-900",
      produce: "border-l-emerald-300",
      meat: "border-l-red-300",
      "canned goods": "border-l-slate-500",
      "dry goods": "border-l-yellow-300",
      household: "border-l-stone-500",
    };
    return styles[category] || "border-l-gray-400";
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
        {" "}
        <div className="flex items-center justify-between group">
          <div>
            <h3 className="text-lg text-white font-semibold flex items-center gap-2">
              {" "}
              {name}
            </h3>
            <p className="text-xs text-indigo-300 mt-0.5 opacity-80">
              {" "}
              Buy {quantity} in {category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;