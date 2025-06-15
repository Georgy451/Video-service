import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./VideoDetailPage.css";

function VideoDetailPage() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const commentInputRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/moments/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setVideoData(data);
        setComments(data.comments ? data.comments.split("\n") : []);
      })
      .catch((err) => console.error("Ошибка загрузки видео:", err));
  }, [id]);

  const handleAddLike = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/moments/${id}/like/`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setVideoData((prev) => ({ ...prev, likes: data.likes }));
      }
    } catch (error) {
      console.error("Ошибка добавления лайка:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await fetch(`http://localhost:8000/api/moments/${id}/comment/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment }),
        });
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
          setNewComment("");
        }
      } catch (error) {
        console.error("Ошибка добавления комментария:", error);
      }
    }
  };

  if (!videoData) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="video-detail-card">
      <div className="video-detail-header">
        <div className="video-detail-avatar"></div>
        <span className="video-detail-user">{videoData.user}</span>
      </div>
      <div className="video-detail-video">
        <video
          src={videoData.video}
          controls
          style={{ width: "100%", height: "100%", borderRadius: "12px" }}
        />
      </div>
      <div className="video-detail-footer">
        <div className="video-detail-likes" onClick={handleAddLike}>
          ❤️ <span>{videoData.likes}</span>
        </div>
        <div className="video-detail-comments" onClick={() => commentInputRef.current?.scrollIntoView({ behavior: "smooth" })}>
          💬 <span>{comments.length}</span>
        </div>
      </div>
      <div className="comments-section">
        <h3>Комментарии</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <div className="add-comment" ref={commentInputRef}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Добавить комментарий..."
          />
          <button onClick={handleAddComment}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailPage;