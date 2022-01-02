import React, {useRef, useContext, useState, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Home() {
  const {isFetching, user, dispatch} = useContext(AuthContext);
  const [d, setD] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/auth', {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <span>user token is:{localStorage.getItem('user').accessToken}</span>
      <h5>Good luck in converting to react native.. goodnight!</h5>
    </div>
  );
}

export default Home;
