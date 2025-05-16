import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useReducer, useRef, useState, useEffect } from "react";
import {
  DiaryStateContext,
  DiaryDispatchContext,
} from "./context/DiaryContext";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      console.log("Reducer INIT:", action.data);
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      newState = state.map((item) =>
        String(item.id) === String(action.data.id) ? { ...action.data } : item
      );
      break;
    }
    case "DELETE": {
      newState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default: {
      newState = state;
    }
  }
  console.log("Reducer newState:", newState);
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    console.log("=== App Data Loading ===");
    const localData = localStorage.getItem("diary");
    console.log("1. Raw localStorage data:", localData);

    if (!localData) {
      console.log("2. No data in localStorage");
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(localData);
    console.log("3. Parsed data:", parsedData);

    if (!Array.isArray(parsedData)) {
      console.log("4. Data is not an array");
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    console.log("5. Max ID:", maxId);

    idRef.current = maxId + 1;
    dispatch({ type: "INIT", data: parsedData });
    setIsLoading(false);
  }, []);

  // localStorage.setItem("diary", JSON.stringify(data));
  // localStorage.setItem("person", JSON.stringify({ name: "이병준" }));
  // console.log(JSON.parse(localStorage.getItem("person")));
  // localStorage.removeItem("person");
  // localStorage.clear();

  const onCreate = (createdDate, emotionId, content) => {
    console.log("Creating new diary:", { createdDate, emotionId, content });
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    console.log("Updating diary:", { id, createdDate, emotionId, content });
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    console.log("Deleting diary:", id);
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export { DiaryStateContext, DiaryDispatchContext };
export default App;
