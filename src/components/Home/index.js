import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
  	<span>Home page</span>
  	<ul>
  		<li><Link to={"/"}>Home</Link></li>
  		<li><Link to={"/reports/market"}>Market</Link></li>
  		<li><Link to={"/login"}>Login</Link></li>
  	</ul>
  	
  </div>
)

export default Home