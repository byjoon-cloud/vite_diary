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
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (!localData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(localData);

    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;
    dispatch({ type: "INIT", data: parsedData });
    setIsLoading(false);
  }, []);

  const onCreate = (createdDate, emotionId, content) => {
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
    dispatch({
      type: "UPDATE",
      data: {
        id: Number(id),
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
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
