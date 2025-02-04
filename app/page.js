import Link from 'next/link';

export default function Page(){
  return (
    <main>
      <h1>CPRG-306 - Web Development 2: Assignments</h1>
      <p>
      Link to Week 2's Assignment: <Link href="/week-2">Week 2</Link>
      </p>
      <p>
      Link to Week 2's Assignment: <Link href="/week-3">Week 3</Link>
      </p>
      <p>
      Link to Week 2's Assignment: <Link href="/week-4">Week 4</Link>
      </p>
    </main>
  );
}