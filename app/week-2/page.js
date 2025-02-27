import StudentInfo from './student-info'; 

export default function Page() {
    return (
      <main>
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black p-4">
        <h1>Shopping List</h1>
        <StudentInfo />
        </div>
      </main>
    );
  }