import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Board = ({ idx, title, contents, createdBy, imageUrl }) => { // imageUrl 추가
  const navigate = useNavigate();

  const moveToUpdate = () => {
    navigate('/update/' + idx);
  };

  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await axios.delete(`//localhost:8080/board/${idx}`).then((res) => {
        alert('삭제되었습니다.');
        navigate('/board');
      }).catch((err) => {
        console.error(err);
        alert('삭제 실패했습니다.');
      });
    }
  };

  const moveToList = () => {
    navigate('/board');
  };

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <h5>{createdBy}</h5>
        <hr />
        <p>{contents}</p>
        {imageUrl && <img src={imageUrl} alt="게시글 이미지" style={{ maxWidth: '100%', height: 'auto' }} />} {/* 이미지 표시 */}
      </div>
      <div>
        <button onClick={moveToUpdate}>수정</button>
        <button onClick={deleteBoard}>삭제</button>
        <button onClick={moveToList}>목록</button>
      </div>
    </div>
  );
};

export default Board;
