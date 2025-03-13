import Link from 'next/link';

export default function Page(){
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black p-4">
      <h1>CPRG-306 - Web Development 2: Assignments</h1>
      <p>
      Link to Week 2's Assignment: <Link href="/week-2">Week 2</Link>
      </p>
      <p>
      Link to Week 3's Assignment: <Link href="/week-3">Week 3</Link>
      </p>
      <p>
      Link to Week 4's Assignment: <Link href="/week-4">Week 4</Link>
      </p>
      <p>
      Link to Week 5's Assignment: <Link href="/week-5">Week 5</Link>
      </p>
      <p>
      Link to Week 6's Assignment: <Link href="/week-6">Week 6</Link>
      </p>
      <p>
      Link to Week 7's Assignment: <Link href="/week-7">Week 7</Link>
      </p>
      <p>
      Link to Week 8's Assignment: <Link href="/week-8">Week 8</Link>
      </p>
      <p>
      Link to Week 9's Assignment: <Link href="/week-9">Week 9</Link>
      </p>
      </div>
    </main>
  );
}