/*eslint-disable*/ //warning 메세지 삭제

import { useState } from "react";
import "./App.css";

function App() {
  let [text, setText] = useState([
    "남자코트 추천",
    "강남 우동맛집",
    "파이썬독학",
  ]);
  let [good, setGood] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [user_input, setUser_input] = useState("");

  function change_text() {
    let text_ = [...text];
    text_[0] = "여자코트 추천";
    setText(text_);
  }

  function sort_text() {
    let text_sort = [...text];
    text_sort.sort();
    setText(text_sort);
  }

  function change_modal() {
    modal ? setModal(false) : setModal(true);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button onClick={sort_text}>가나다순정렬</button>
      {text.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                change_modal();
                setTitle(i); /* setModal(!modal) */
              }}
            >
              {a /* text[i] */}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 버블링 막기
                  let copy_good = [...good];
                  copy_good[i] = copy_good[i] + 1;
                  setGood(copy_good);
                }}
              >
                👍
              </span>
              {good[i]}
              <button
                onClick={() => {
                  let delete_text = [...text];
                  delete_text.splice(i, 1);
                  setText(delete_text);
                }}
              >
                삭제
              </button>
            </h4>
            <p>7월 28일</p>
          </div>
        );
      })}
      <input
        onChange={(e) => {
          setUser_input(e.target.value);
        }}
        type="text"
      />
      {/* 늦게처리됨(비동기처리) */}
      <button
        onClick={() => {
          let add_text = [...text];
          let add_good = [...good];
          user_input && add_text.unshift(user_input);
          setText(add_text);
          add_good.push(0);
          setGood(add_good);
        }}
      >
        추가
      </button>
      {modal == true ? (
        <Modal
          color={"skyblue"}
          text={text}
          change_text={change_text}
          title={title}
        />
      ) : null}
    </div>
  );
}

function Modal({ text, color, change_text, title }) {
  return (
    <div className="modal" style={{ background: color }}>
      <h4>{text[title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={change_text}>글수정</button>
    </div>
  );
}

export default App;
