import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../components/Board';

const BoardDetail = () => {
  const { idx } = useParams();
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});

  const getBoard = async () => {
    try {
      const resp = await axios.get(`//localhost:8080/board/${idx}`);
      setBoard(resp.data); // 데이터 구조에 맞게 조정
      setLoading(false);
    } catch (error) {
      console.error("Error fetching board details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          idx={board.idx}
          title={board.title}
          contents={board.contents}
          createdBy={board.createdBy}
          imageUrl={board.imageUrl} // 이미지 URL 전달
        />
      )}
    </div>
  );
};

export default BoardDetail;
