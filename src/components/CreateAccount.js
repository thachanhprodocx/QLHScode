import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const CreateAccount = ({ closeModal }) => {
  const baseUrl = 'http://localhost:8888/api/accounts';

  const [newAccount, setNewAccount] = useState({
    username: '',
    dateOfBirth: '',
    address: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    facebook: '',
    information: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.post(`${baseUrl}/create`, newAccount, {
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
    <form onSubmit={handleSubmit}>
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        name="username"
        value={newAccount.username}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        id="dateOfBirth"
        label="Date of Birth"
        type="date"
        variant="outlined"
        name="dateOfBirth"
        value={newAccount.dateOfBirth}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        id="address"
        label="Address"
        variant="outlined"
        name="address"
        value={newAccount.address}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        id="fullName"
        label="Full Name"
        variant="outlined"
        name="fullName"
        value={newAccount.fullName}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        id="phoneNumber"
        label="Phone Number"
        variant="outlined"
        name="phoneNumber"
        value={newAccount.phoneNumber}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        id="email"
        label="Email"
        variant="outlined"
        name="email"
        value={newAccount.email}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        id="facebook"
        label="Facebook"
        variant="outlined"
        name="facebook"
        value={newAccount.facebook}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        id="information"
        label="Information"
        variant="outlined"
        name="information"
        value={newAccount.information}
        onChange={handleInputChange}
        required
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        value={newAccount.password}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
  );
};

export default CreateAccount;
