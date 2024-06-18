/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = '2f767dd8-db38-4617-9a82-51e6778c3328';

const App = () => {
  const [match, setMatches] = useState([]);
  if (!localStorage.getItem('username')) return <LoginForm />;

  const onGetChats = () => {
    axios
      .get('http://localhost:3001/users')
      .then((r) => {
        if (r.data) setMatches(r.data);
      }) // NOTE: over-ride secret
      .catch(() => setMatches([]));
  };

  return (

    <>
      {/* <div className="matches">
        {match && match.length > 0 && match.map((x, index) => {
          return x.avatar ? <div key={index} className="single-match" style={{ backgroundImage: `url(${x.avatar})` }}>
            <div className="match-name">{x.first_name}</div>
          </div> : <div />
        }

        )}
      </div> */}
      <ChatEngine
        height="100vh"
        projectID={projectID}
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        onGetChats={onGetChats}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
      />

    </>

  );
};

// infinite scroll, logout, more customizations...

export default App;
