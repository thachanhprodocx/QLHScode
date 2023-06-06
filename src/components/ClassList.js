import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  addButton: {
    marginBottom: '20px',
  },
});

const ClassList = () => {
  const classes = useStyles();
  const [classList, setClassList] = useState([]);
  const baseUrl = 'http://localhost:8888/api/class';

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/getAllClass`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClassList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchClasses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Danh Sách class</h1>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Class Status</TableCell>
              <TableCell>Teaching Form</TableCell>
              <TableCell>Mentor ID</TableCell>
              <TableCell>Zoom ID</TableCell>
              <TableCell>Class Room ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classList.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.id}</TableCell>
                <TableCell>{classItem.className}</TableCell>
                <TableCell>{classItem.startDate}</TableCell>
                <TableCell>{classItem.endDate}</TableCell>
                <TableCell>{classItem.classStatus}</TableCell>
                <TableCell>{classItem.teachingForm}</TableCell>
                <TableCell>{classItem.mentorId}</TableCell>
                <TableCell>{classItem.zoomId}</TableCell>
                <TableCell>{classItem.classRoomId}</TableCell>
                <TableCell>{classItem.description}</TableCell>
                <TableCell>{classItem.schedule}</TableCell>
                <TableCell>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(classItem.id)}
                  >
                    Xóa
                  </Button>

                  <Button
                    component={Link}
                    to={`/class/edit/${classItem.id}`}
                    variant="contained"
                    color="primary"
                  >
                    Sửa
                  </Button>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClassList;
