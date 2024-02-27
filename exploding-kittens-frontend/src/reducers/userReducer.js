// src/reducers/userReducer.js
import { getAllUsers, putUser, updateUserPoints } from '../Api'; // Import your API functions
const response = await getAllUsers();
// Helper function to load users from local storage
const loadUsers = () =>  {
  try {
    return response.data 
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};
// const loadUsers = async () => {
//   try {
//     // Make API call to fetch users
//     const response = await getAllUsers();
//     console.log(response.data);
//     return response.data; 
//     // Assuming the API returns an object with a 'data' property containing users
//   } catch (error) {
//     console.error('Error loading users from API:', error);
//     return [];
//   }
// };
// Helper function to save users to local storage
// const saveUsers = (users) => {
//   try {
//     localStorage.setItem("users", JSON.stringify(users));
//   } catch (error) {
//     console.error("Error saving users:", error);
//   }
// };
const saveUsers = (users) => {

try {
  // Iterate over users and update points via API
   Promise.all(
    users.map(async (user) => {
      // console.log(user.username);
      // sleep(300); 
      await putUser(user);
    })
  );
} catch (error) {
  console.error('Error saving users to API:', error);
}
};

const initialState = {
  users: loadUsers(), // Load users from local storage
  currentUser: [], // Current user object
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":

      return { ...state, users: action.payload };

    case "INCREASE_DEFUSE_CARDS":
      return { ...state, defuseCards: state.defuseCards + action.payload };

    case "SET_CURRENT_USER":
      const saveUserToDatabase = async (newUser) => {
        try {
          await putUser(newUser); // Assuming putUser is your API function to save/update a user
        } catch (error) {
          console.error('Error saving user to database:', error);
        }
      };

      // Set the current user in the state
      saveUserToDatabase(action.payload); // Save the new user to the database
      return { ...state, currentUser: action.payload };

      // return { ...state, currentUser: action.payload };

    case "INCREASE_POINTS":
      // Update points for the current user
      const updateUserToDatabase = async (updatedUser) => {
        try {
          await updateUserPoints(updatedUser.username, updatedUser.points ); // Assuming putUser is your API function to save/update a user
        } catch (error) {
          console.error('Error saving user to database:', error);
        }
      };

      // Set the current user in the state
      updateUserToDatabase(action.payload); // Save the new user to the database
      // return { ...state, currentUser: action.payload };

      const updatedUsers = state.users.map((user) =>
        user.username === state.currentUser.username
          ? { ...user, points: user.points + 1 }
          : user
      );

      // Save updated users to local storage
      // saveUsers(updatedUsers);

      return {
        ...state,
        users: updatedUsers,
        currentUser: {
          ...state.currentUser,
          points: state.currentUser.points + 1,
        },
      };
    case "RESTART_USER":
      // Add logic to handle user restart, such as resetting user-related data
      return {
        ...state,
        currentUser: {}, // Set your initial user state as needed
      };
      
    default:
      return state;
  }
};

export default userReducer;

// src/reducers/userReducer.js


// ----------------------------------------------------------
// import { getAllUsers, updateUserPoints } from '../Api'; // Import your API functions
// const response = await getAllUsers();
// const initialState = {
//   users: response.data,
//   currentUser: {},
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_USERS':
//       console.log(action.payload);
//       return { ...state, users: action.payload };

//     case 'SET_CURRENT_USER':
//       return { ...state, currentUser: action.payload };

//     case 'INCREASE_POINTS':
//       // Update user points using the API
//       const updatedUser = { ...state.currentUser, points: state.currentUser.points + 1 };
//       updateUserPoints(state.currentUser.username, updatedUser.points);
//       return { ...state, currentUser: updatedUser };

//     // Add other cases as needed

//     default:
//       return state;
//   }
// };

// export default userReducer;

