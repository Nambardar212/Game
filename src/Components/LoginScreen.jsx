import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalData } from "./LocalStorage";
import "./LoginScreen.css";


const LoginScreen = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dbName = 'local_database';
  const storeName = 'accounts';

  const openDb = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore(storeName, { keyPath: 'username' });
        store.createIndex('password', 'password', { unique: false });
      };
    });
  };

  const insertAccounts = async () => {
    const db = await openDb();

    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    store.put({ username: 'admin', password: 'admin1234' });
    store.put({ username: 'guest', password: 'guest1234' });

    await new Promise((resolve) => transaction.oncomplete = resolve);
    db.close();
  };

  insertAccounts();

  const validateCredentials = async (username, password) => {
    const db = await openDb();

    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.get(username);

    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(new Error('Failed to retrieve account information'));
      };

      request.onsuccess = () => {
        const account = request.result;

        if (account && account.password === password) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidCredentials = await validateCredentials(userName, password);

    if (isValidCredentials) {
      const data = getLocalData("userName");
      if(data.played === undefined)
      localStorage.setItem("userName", JSON.stringify({userName, played: 0}));
      else 
      localStorage.setItem("userName", JSON.stringify({userName, played: data.played}));
      navigate('/start');
    } else {
      alert("Enter valid Username and Password!");
    }
  };


  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-form__label">
          Username:
          <input 
            className="login-form__input" 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
        </label>
        <label className="login-form__label">
          Password:
          <input 
            className="login-form__input" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <button className="login-form__button" type="submit">Log In</button>
      </form>
    </div>
  );
}


export default LoginScreen;