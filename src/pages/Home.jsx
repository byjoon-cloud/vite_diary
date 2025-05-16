import { useState, useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  console.log("Filtering dates:", {
    beginTime: new Date(beginTime).toLocaleString(),
    endTime: new Date(endTime).toLocaleString(),
    data: data.map((item) => ({
      ...item,
      createdDate: new Date(item.createdDate).toLocaleString(),
    })),
  });

  // 각 데이터의 날짜를 확인하고 로그 출력
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.createdDate);
    const isInMonth =
      itemDate.getFullYear() === pivotDate.getFullYear() &&
      itemDate.getMonth() === pivotDate.getMonth();

    console.log("Checking date:", {
      itemId: item.id,
      itemDate: itemDate.toLocaleString(),
      pivotDate: pivotDate.toLocaleString(),
      isInMonth,
    });

    return isInMonth;
  });

  return filteredData;
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date(2025, 4, 1));
  const monthlyData = getMonthlyData(pivotDate, data);

  console.log("Current data:", {
    pivotDate: pivotDate.toLocaleString(),
    monthlyData: monthlyData.map((item) => ({
      ...item,
      createdDate: new Date(item.createdDate).toLocaleString(),
    })),
  });

  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 1)
    );
  };
  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1, 1)
    );
  };
  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
