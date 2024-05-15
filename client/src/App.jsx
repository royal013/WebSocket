import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Input from './component/input';

function App() {
  const [score, setScore] = useState({});
  const [scores, setScores] = useState([]);
  const socket = io('http://localhost:3000');
  function connectSocket() {
    socket.on('connection', (socket) => {
      console.log('connection success');
    })
  }
  function handleInput(event) {
    let { name, value } = event.target;
    let currentObject = { [name]: value };
    setScore((prev) => ({ ...prev, ...currentObject }));
  }
  function sendScore() {
    socket.emit('scores', score);
    socket.on('playerScores', (playerScores) => {
      setScores(playerScores);
      console.log(scores);
    })
  }
  useEffect(() => {
    connectSocket();
  }, [])
  return (
    <>
      <div>
        <h1>
          React Multiplayer Dashboard
          <Input name='name' placeholder='Enter Your Name' handleInput={handleInput} />
          <Input name='score' placeholder='Enter Your Score' handleInput={handleInput} />
          <button id='send_btn' onClick={sendScore}>Publish Score</button>
          {scores.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>

                {scores.map((score) => (
                  <tr>
                    <td>{score?.id}</td>
                    <td>{score?.name}</td>
                    <td>{score?.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <></>
          )}

        </h1>
      </div>
    </>
  )
}

export default App
