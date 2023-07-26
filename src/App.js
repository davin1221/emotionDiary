import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useReducer, useRef } from 'react';

// 사용할 페이지 임포트 
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// 컴포넌트



const reducer = (state, action) => {
  let newState  = [];
  switch(action.type) {
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      newState = [action.data, ...state]
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it)=> it.id === action.data.id ? {...action.data}:it);
      break;
    }
    default : return state;
  }
  return newState;
}


export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


const dummyData = [
  {
    id : 1, 
    emotion : 1, 
    content : "오늘의 일기 1번",
    date: 1690365894445,
  },
  {
    id : 2, 
    emotion : 2, 
    content : "오늘의 일기 2번",
    date: 1690365894446,
  },
  {
    id : 3, 
    emotion : 3, 
    content : "오늘의 일기 3번",
    date: 1690365894447,
  },
  {
    id : 4, 
    emotion : 4, 
    content : "오늘의 일기 4번",
    date: 1690365894448,
  },
  {
    id : 5, 
    emotion : 5, 
    content : "오늘의 일기 5번",
    date: 1690365894449,
  },
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);

  // id
  const  dataId = useRef(0);

  // dispatch 함수 : create, remove, edit 
  // CREATE 
  const onCreate = (date, content, emotion) => {
      dispatch({type : "CREATE", data:{
        id : dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion
  }})
  dataId.current += 1;
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  }

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type : "EDIT",
      data:{
        id: targetId, 
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
    dataId.current += 1;
  }


  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />  
              <Route path="/new" element={<New />} />  
              <Route path="/Edit/:id" element={<Edit />} />
              <Route path="/Diary/:id" element={<Diary />} />  
            </Routes>

          
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
