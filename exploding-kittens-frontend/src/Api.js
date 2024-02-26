// src/Api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
export const getAllUsers = () => axios.get(`${API_BASE_URL}/users`);
// export const getAllUsers = () => {
// // Example Axios request
// axios.get('http://localhost:8080/users', {
//   // withCredentials: true,
//   // headers: {
//   //   'Authorization': 'Bearer your-access-token',
//   //   'Access-Control-Allow-Origin': 'http://localhost:3000',
//   // },
// })
//   .then(response => {
//     // Check if response is defined
//     if (response && response.data) {
//       // Handle successful response
//       console.log("Data");
//       console.log(response.data);
//       return response.data;
//     } else {
//       console.error('Response is undefined or does not contain data.');
//     }
//   })
//   .catch(error => {
//     // Handle error
//     console.error('Error:', error);
//   });


// }

export const putUser = (data) => axios.post(`${API_BASE_URL}/users`, data);

// Add more API functions as needed
export const updateUserPoints = async (username, points) =>  await axios.put(`${API_BASE_URL}/users/${username}`, { points });
