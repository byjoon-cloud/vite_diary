import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("newest");
  const handleChangeSortType = (e) => {
    setSortType(e.target.value);
  };
  if (!data) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }
  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === "newest") {
        return Number(b.createdDate) - Number(a.createdDate);
      } else {
        return Number(a.createdDate) - Number(b.createdDate);
      }
    });
  };
  const sortedData = getSortedData();
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={handleChangeSortType}>
          <option value={"oldest"}>오래된순</option>
          <option value={"newest"}>최신순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
