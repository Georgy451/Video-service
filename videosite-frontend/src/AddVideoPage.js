import React, { useRef, useState } from 'react';

const EMOJIS = [
  { icon: '😄', label: 'Радость' },
  { icon: '😢', label: 'Грусть' },
  { icon: '😠', label: 'Злость' },
  { icon: '😍', label: 'Влюблённость' },
  { icon: '😎', label: 'Крутость' },
];

function AddVideoPage({ onBack }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [emotion, setEmotion] = useState('');
  const [location, setLocation] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('emotion', emotion);
    formData.append('location', location);

    try {
      const response = await fetch('http://localhost:8000/api/moments/', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Момент опубликован!');
        if (onBack) onBack();
      } else {
        alert('Ошибка при публикации');
      }
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 28,
      boxShadow: '0 4px 32px #0001',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: '#8b5cf6',
        padding: '32px 0 24px 0',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#fff',
          fontSize: 32,
          fontWeight: 700,
          margin: 0,
          letterSpacing: 1
        }}>Upload Moment</h2>
      </div>
      <form onSubmit={handlePublish} style={{ padding: '32px 32px 24px 32px' }}>
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: '#eee',
            borderRadius: 18,
            overflow: 'hidden',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {videoURL ? (
              <video
                ref={videoRef}
                src={videoURL}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <button
                type="button"
                onClick={handleUploadClick}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  left: 0,
                  top: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                tabIndex={-1}
              >
                <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="32" fill="#fff8" />
                  <polygon points="26,20 48,32 26,44" fill="#8b5cf6" />
                </svg>
              </button>
            )}
            {videoURL && (
              <div style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: '#fff9',
                color: '#333',
                borderRadius: 8,
                padding: '2px 10px',
                fontWeight: 600,
                fontSize: 16
              }}>
                0:05
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleUploadClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#8b5cf6',
                fontWeight: 500,
                fontSize: 18,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Upload from Gallery
            </button>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, fontSize: 20, display: 'block', marginBottom: 10 }}>Emotion</label>
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center' }}>
            {EMOJIS.map((em) => (
              <button
                type="button"
                key={em.icon}
                onClick={() => setEmotion(em.icon)}
                style={{
                  fontSize: 38,
                  background: emotion === em.icon ? '#ede9fe' : 'transparent', // было 'none'
                  border: emotion === em.icon ? '2px solid #8b5cf6' : '2px solid transparent',
                  borderRadius: '50%',
                  padding: 6,
                  cursor: 'pointer',
                  transition: 'border 0.2s'
                }}
                aria-label={em.label}
              >
                {em.icon}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 32 }}>
          <label style={{ fontWeight: 500, fontSize: 18, display: 'block', marginBottom: 8 }}>
            Location <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Location"
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                borderRadius: 12,
                border: '1.5px solid #e5e7eb',
                fontSize: 17,
                background: '#f9fafb'
              }}
            />
            <span style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#8b5cf6',
              fontSize: 20
            }}>📍</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={!videoFile || !emotion || isPublishing}
          style={{
            width: '100%',
            background: '#8b5cf6',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            padding: '14px 0',
            fontSize: 22,
            fontWeight: 600,
            cursor: (!videoFile || !emotion || isPublishing) ? 'not-allowed' : 'pointer',
            opacity: (!videoFile || !emotion || isPublishing) ? 0.7 : 1,
            marginBottom: 8,
            boxShadow: '0 2px 8px #8b5cf633'
          }}
        >
          {isPublishing ? 'Posting...' : 'Post'}
        </button>
        <button
          type="button"
          onClick={onBack}
          style={{
            width: '100%',
            background: 'none',
            color: '#8b5cf6',
            border: 'none',
            borderRadius: 14,
            padding: '10px 0',
            fontSize: 17,
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Назад
        </button>
      </form>
    </div>
  );
}

export default AddVideoPage;