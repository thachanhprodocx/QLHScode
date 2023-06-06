import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css';
const ClassRoomList = () => {
  const [classRooms, setClassRooms] = useState([]);

  useEffect(() => {
    fetchClassRooms();
  }, []);

  const fetchClassRooms = async () => {
    try {
      const response = await axios.get('/api/classrooms/get-all');
      setClassRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Class Room List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Note</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {classRooms.map((classRoom) => (
            <tr key={classRoom.id}>
              <td>{classRoom.id}</td>
              <td>{classRoom.name}</td>
              <td>{classRoom.address}</td>
              <td>{classRoom.note}</td>
              <td>{classRoom.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassRoomList;
