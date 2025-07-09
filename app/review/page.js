import Link from "next/link";
import "../../styles/review.css";

// base URL แบบ dynamic
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getVideos() {
  try {
    const res = await fetch(`${baseUrl}/api/review`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Error loading videos:", error);
    return [];
  }
}

export default async function ReviewListPage() {
  const videos = await getVideos();

  return (
    <main className="video-grid">
      {videos.map((video) => (
        <Link key={video.id} href={`/review/${video.id}`} className="video-card">
          <img src={video.thumbnail} alt={video.title} className="thumbnail" />
          <div className="info">
            <h2>{video.title}</h2>
            <p>{new Date(video.date).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
