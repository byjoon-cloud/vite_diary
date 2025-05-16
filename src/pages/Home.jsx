import { useState, useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

const getMonthlyData = (pivotDate, data) => {
  console.log("=== 데이터 필터링 시작 ===");
  console.log("입력된 데이터:", data);
  console.log("기준 날짜:", pivotDate.toLocaleString());

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

  console.log("필터링 범위:", {
    시작: new Date(beginTime).toLocaleString(),
    끝: new Date(endTime).toLocaleString(),
  });

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.createdDate);
    const isInMonth =
      itemDate.getFullYear() === pivotDate.getFullYear() &&
      itemDate.getMonth() === pivotDate.getMonth();

    console.log("항목 상세 확인:", {
      ID: item.id,
      원본날짜: item.createdDate,
      변환된날짜: itemDate.toLocaleString(),
      기준날짜: pivotDate.toLocaleString(),
      연도비교: itemDate.getFullYear() === pivotDate.getFullYear(),
      월비교: itemDate.getMonth() === pivotDate.getMonth(),
      포함여부: isInMonth,
    });

    return isInMonth;
  });

  console.log("필터링된 결과:", filteredData);
  console.log("=== 데이터 필터링 종료 ===");

  return filteredData;
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyData(pivotDate, data);

  console.log("현재 상태:", {
    기준날짜: pivotDate.toLocaleString(),
    필터링된데이터: monthlyData,
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
