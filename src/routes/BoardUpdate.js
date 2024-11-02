import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const [board, setBoard] = useState({
    idx: 0,
    title: '',
    createdBy: '',
    contents: '',
  });
  const [image, setImage] = useState(null); // 이미지 상태 추가

  const { title, createdBy, contents } = board;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // 선택한 파일 저장
  };

  const getBoard = async () => {
    const resp = await axios.get(`//localhost:8080/board/${idx}`);
    setBoard(resp.data);
  };

  const updateBoard = async () => {
    const formData = new FormData(); // FormData 객체 생성
    formData.append('idx', board.idx);
    formData.append('title', board.title);
    formData.append('createdBy', board.createdBy);
    formData.append('contents', board.contents);
    if (image) {
      formData.append('image', image); // 이미지 파일 추가
    }

    await axios.patch(`//localhost:8080/board`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 이미지 업로드를 위한 헤더
      },
    }).then((res) => {
      alert('수정되었습니다.');
      navigate('/board/' + idx);
    });
  };

  const backToDetail = () => {
    navigate('/board/' + idx);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input type="text" name="createdBy" value={createdBy} readOnly={true} />
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
        <input type="file" onChange={handleImageChange} />
      </div>
      <br />
      <div>
        <button onClick={updateBoard}>수정</button>
        <button onClick={backToDetail}>취소</button>
      </div>
    </div>
  );
};

export default BoardUpdate;
