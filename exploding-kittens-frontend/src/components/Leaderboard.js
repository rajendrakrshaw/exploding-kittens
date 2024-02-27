// src/components/Leaderboard.js

import React from 'react';
import { useSelector } from 'react-redux';
import './Leaderboard.css'; // Import your existing CSS

const Leaderboard = () => {
  const users = useSelector((state) => state.user.users);
  console.log(users);
  // Sort users in descending order based on points
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  // Get the highest score
  const highestScore = sortedUsers.length > 0 ? sortedUsers[0].points : 0;

  return (
    
    // <div className="leaderboard-container">
    //   <h2 className="leaderboard-heading">Leaderboard</h2>
    //   <table className="leaderboard-table">
    //     <thead>
    //       <tr>
    //         <th>Rank</th>
    //         <th>Username</th>
    //         <th>Points</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {sortedUsers.map((user, index) => (
    //         <tr key={index} className="leaderboard-item">
    //           <td>{index + 1}</td>
    //           <td>{user.username}</td>
    //           <td>{user.points}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <p className="highest-score">Highest Score: {highestScore}</p>
    // </div>
    <div class="container-wrap">
	<section id="leaderboard">
		<nav class="ladder-nav">
			<div class="ladder-title">
			<h1>Leaderboard</h1>
			</div>
			{/* <div class="ladder-search">
				<input type="text" id="search-leaderboard" class="live-search-box" placeholder="Search Team, Player..." />
			</div> */}
		</nav>
		<table id="rankings" class="leaderboard-results" width="100%">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Username</th>
					<th>Wins</th>
				</tr>
			</thead>
			<tbody>
        {sortedUsers.map((user, index) => (
            <tr key={index} className="leaderboard-item">
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
		</table>
    
	</section>
  
  </div>
  
  );
  
};

export default Leaderboard;
