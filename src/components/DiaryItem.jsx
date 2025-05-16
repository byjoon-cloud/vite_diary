import "./DiaryItem.css";
import Button from "./Button";
import getEmotionImage from "../util/get-emotion-image";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionId, content, createdDate }) => {
  const nav = useNavigate();
  if (!id) {
    return <div>일기를 불러오는 중 : DiaryItem.jsx</div>;
  }
  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`emotion_section emotion_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} alt="emotion3" />
      </div>
      <div onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div onClick={() => nav(`/edit/${id}`)} className="button_section">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
