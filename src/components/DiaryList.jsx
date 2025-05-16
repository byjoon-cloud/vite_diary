import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("newest");

  console.log("=== DiaryList Debug Info ===");
  console.log("1. Received data length:", data.length);
  console.log(
    "2. Raw data with timestamps:",
    data.map((item) => ({
      id: item.id,
      timestamp: item.createdDate,
      date: new Date(item.createdDate).toLocaleString(),
      content: item.content,
    }))
  );

  const handleChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  if (!data) {
    return <div>데이터를 불러오는 중 : DiaryList.jsx</div>;
  }

  const getSortedData = () => {
    console.log(
      "3. Before sorting - data:",
      data.map((item) => ({
        id: item.id,
        timestamp: item.createdDate,
        date: new Date(item.createdDate).toLocaleString(),
      }))
    );

    const sorted = data.toSorted((a, b) => {
      const result =
        sortType === "newest"
          ? Number(b.createdDate) - Number(a.createdDate)
          : Number(a.createdDate) - Number(b.createdDate);

      console.log(`4. Comparing dates:`, {
        a: {
          id: a.id,
          date: new Date(a.createdDate).toLocaleString(),
          timestamp: a.createdDate,
        },
        b: {
          id: b.id,
          date: new Date(b.createdDate).toLocaleString(),
          timestamp: b.createdDate,
        },
        result,
      });

      return result;
    });

    console.log(
      "5. After sorting - data:",
      sorted.map((item) => ({
        id: item.id,
        timestamp: item.createdDate,
        date: new Date(item.createdDate).toLocaleString(),
      }))
    );

    return sorted;
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
        {sortedData.map((item) => {
          console.log("6. Rendering item:", {
            id: item.id,
            timestamp: item.createdDate,
            date: new Date(item.createdDate).toLocaleString(),
          });
          return <DiaryItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default DiaryList;
