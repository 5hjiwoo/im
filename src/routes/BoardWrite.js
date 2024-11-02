import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    title: '',
    createdBy: '',
    contents: '',
    image: null, // 이미지 상태 추가
  });

  const { title, createdBy, contents, image } = board; // 비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; // event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const onImageChange = (event) => {
    setBoard({
      ...board,
      image: event.target.files[0], // 선택된 파일을 상태에 저장
    });
  };

  const saveBoard = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('createdBy', createdBy);
    formData.append('contents', contents);
    if (image) {
      formData.append('image', image); // 이미지 파일 추가
    }

    await axios.post(`//localhost:8080/board`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 폼 데이터 전송 시 헤더 설정
      },
    }).then((res) => {
      alert('등록되었습니다.');
      navigate('/board');
    }).catch((err) => {
      console.error(err);
      alert('등록 실패했습니다.');
    });
  };

  const backToList = () => {
    navigate('/board');
  };

  return (
    <div>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input
          type="text"
          name="createdBy"
          value={createdBy}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          name="contents"
          cols="30"
          rows="10"
          value={contents}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <span>이미지 업로드</span>
        <input type="file" name="image" onChange={onImageChange} />
      </div>
      <br />
      <div>
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardWrite;
