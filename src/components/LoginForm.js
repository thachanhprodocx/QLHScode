import React, { useState } from 'react';
import { RiUserFill, RiLockPasswordFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const baseUrlAuth = 'http://localhost:8888/api';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const account = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(baseUrlAuth + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('fullName', data.fullName);
        localStorage.setItem('id', data.id);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true); // Đặt trạng thái đã đăng nhập thành true
      } else {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Xóa tất cả các mục đã lưu trong localStorage
    setIsLoggedIn(false); // Đặt trạng thái đã đăng nhập thành false
  };

  if (isLoggedIn) {
    return <Navigate to="/account" />;
  }

  return (
    <div>
      <h1>Đăng nhập</h1>
      <form>
        <div>
          <label>
            <RiUserFill /> {/* Icon người dùng */}
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <RiLockPasswordFill /> {/* Icon khóa */}
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit" onClick={handleLogin}>
          Đăng nhập
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>

      {isLoggedIn && (
        <button onClick={handleLogout}>Đăng xuất</button>
      )}
    </div>
  );
};

export default LoginForm;
