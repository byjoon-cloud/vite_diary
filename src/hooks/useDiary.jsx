import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;

    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      if (
        data.length > 0 &&
        (window.location.pathname.startsWith("/edit/") ||
          window.location.pathname.startsWith("/diary/"))
      ) {
        window.alert("존재하지 않는 일기입니다.");
        nav("/", { replace: true });
      }
      return;
    }

    setCurDiaryItem(currentDiaryItem);
  }, [data, id, nav]);

  return curDiaryItem;
};

export default useDiary;
