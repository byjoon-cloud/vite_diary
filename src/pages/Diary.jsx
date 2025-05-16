import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";

const Diary = () => {
  const nav = useNavigate();
  const Params = useParams();
  const curDiaryItem = useDiary(Params.id);
  if (!curDiaryItem) {
    return <div>데이터 부르는 중 : Diary.jsx</div>;
  }

  const { id, createdDate, emotionId, content } = curDiaryItem;

  return (
    <div>
      <Header
        title={`${new Date(createdDate).toLocaleDateString()} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${Params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer
        createdDate={createdDate}
        content={content}
        emotionId={emotionId}
      />
    </div>
  );
};

export default Diary;
