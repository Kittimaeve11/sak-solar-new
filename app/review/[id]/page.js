import "../../../styles/review.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getVideo(id) {
  try {
    const res = await fetch(`${baseUrl}/api/review/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Video not found");
    return await res.json();
  } catch (error) {
    console.error("Error loading video:", error);
    return null;
  }
}

export default async function ReviewDetailPage({ params }) {
  const video = await getVideo(params.id);

  if (!video) {
    return <div className="video-detail">ไม่พบวิดีโอ</div>;
  }

  return (
    <div className="video-detail">
      <h1>{video.title}</h1>
      <p>{new Date(video.date).toLocaleDateString()}</p>
      <video controls width="100%" poster={video.thumbnail}>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="description">{video.description}</p>
    </div>
  );
}
