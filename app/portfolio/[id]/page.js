// app/portfolio/[id]/page.js
import React from 'react';

async function getPortfolioData(id) {
  const res = await fetch(`http://localhost:3000/api/portfolio`, { cache: 'no-store' });
  const data = await res.json();
  return data.projects.find((p) => p.id === parseInt(id));
}

export default async function PortfolioDetailPage({ params }) {
  const project = await getPortfolioData(params.id);

  if (!project) {
    return <div>ไม่พบข้อมูล</div>;
  }

  return (
    <main className="layout-container">
      <h2>{project.title}</h2>
      <img
        src={project.coverImage}
        alt={project.title}
        style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <p>{project.description}</p>
      <p style={{ whiteSpace: 'pre-line' }}>{project.content}</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {project.gallery.map((img, index) => (
          <img key={index} src={img} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
        ))}
      </div>
    </main>
  );
}
