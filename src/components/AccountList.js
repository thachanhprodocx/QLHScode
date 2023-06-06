import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Modal from 'react-modal';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateAccount from './CreateAccount';
import UpdateAccount from './UpdateAccount';
import ClassList from './ClassList';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const AccountList = () => {
  const baseUrl = 'http://localhost:8888/api/accounts';
  const classes = useStyles();
  const [accounts, setAccounts] = useState([]);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchAccounts();
  }, [isAccountDeleted]);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const deleteAccount = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAccountDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  const openUpdateModal = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const openConfirmModal = (id) => {
    setSelectedAccountId(id);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedAccountId(null);
  };

  const confirmDeleteAccount = () => {
    deleteAccount(selectedAccountId);
    closeConfirmModal();
  };

  return (
    <div className={classes.container}>
      <h1>Danh Sách Account</h1>

      <Button variant="contained" color="primary" className={classes.button} onClick={openModal}>
        Create Account
      </Button>

      {accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>phoneNumber</TableCell>
              <TableCell>email</TableCell>
              <TableCell>facebook</TableCell>
              <TableCell>information</TableCell>
              <TableCell>classId</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.dateOfBirth}</TableCell>
                <TableCell>{account.address}</TableCell>
                <TableCell>{account.fullName}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell>{account.phoneNumber}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.facebook}</TableCell>
                <TableCell>{account.information}</TableCell>
                <TableCell>{account.classId}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => openConfirmModal(account.id)}
                  >
                  Xóa
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openUpdateModal(account)}
                  >
                    Sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Account Modal"
      >
        <h2>{selectedAccount ? 'Update Account' : 'Create Account'}</h2>
        {selectedAccount ? (
          <UpdateAccount account={selectedAccount} closeModal={closeModal} />
        ) : (
          <CreateAccount closeModal={closeModal} />
        )}
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={closeConfirmModal}
        contentLabel="Confirm Delete Modal"
      >
        <h2>bạn có muốn xóa </h2>
        
        <div>
          <Button variant="contained" color="secondary" onClick={confirmDeleteAccount}>
            Yes, Delete
          </Button>
          <Button variant="contained" color="primary" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>

      <ClassList />
    </div>
  );
};

export default AccountList;
