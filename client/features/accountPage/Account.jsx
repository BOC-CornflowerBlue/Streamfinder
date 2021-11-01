import React from 'react';
import './Account.css';

const Account = props => (
  <div className="accountPage">
    <div class="users-header">
      <h1 class="users-title">Streamfinder</h1>
      <input class="users-searchBar" type="text" placeholder="Search For Movies" />
      {/* <img class="users-homeIcon" src="../home/homeIcon.png" />
      <img class="users-userIcon" src="../home/userIcon.png" /> */}
    </div>
    <hr />
    <h1 class="users-account">Account</h1>
    <div class="movieModule">
    </div>
    <hr />
    <div class="memberInfo">
      <h2>Member Info</h2>
      <ul>Username: username</ul>
      <ul>Email: email</ul>
      <ul>Password: password</ul>
    </div>
    <hr />
    <div class="subscriptionInfo">
      <h2>Subscription Info</h2>
      <ul>Subscriptions: </ul>
      <ul>Total Cost: </ul>
      <ul>Most used subscription: </ul>
    </div>
  </div>
);

export default Account;
