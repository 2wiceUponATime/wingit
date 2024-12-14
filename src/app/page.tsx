import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="page">
      <Sidebar />
      <main className="main">
        <p>I am some content</p>
      </main>
    </div>
  );
}
