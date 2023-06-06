import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

const UpdateAccount = ({ account, closeModal }) => {
  const baseUrl = 'http://localhost:8888/api/accounts';
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [information, setInformation] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setUsername(account.username);
    setDateOfBirth(account.dateOfBirth);
    setAddress(account.address);
    setFullName(account.fullName);
    setPhoneNumber(account.phoneNumber);
    setEmail(account.email);
    setFacebook(account.facebook);
    setInformation(account.information);
    setPassword(account.password);
  }, [account]);

  const updateAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedAccount = {
        ...account,
        username,
        dateOfBirth,
        address,
        fullName,
        phoneNumber,
        email,
        facebook,
        information,
        password,
      };
      await axios.put(`${baseUrl}/${account.id}`, updatedAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  
    return (
      <div>
        <div>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="dateOfBirth"
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="address"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="fullName"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="phoneNumber"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="facebook"
            label="Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="information"
            label="Information"
            multiline
            value={information}
            onChange={(e) => setInformation(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" onClick={updateAccount}>
          Update Account
        </Button>
      </div>
    );
    
    }
export default UpdateAccount;
