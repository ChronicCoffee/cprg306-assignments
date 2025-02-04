import ItemList from "./item-list.js";

export default function Page() {
  return (
    <main className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mr-6">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-emerald-400 mb-4">Shopping List</h1>
          <div className="h-1 w-20 bg-emerald-400"></div>
        </header>
        <ItemList />
      </div>
    </main>
  );
}