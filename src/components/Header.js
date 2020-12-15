import React from 'react';
import Logo from '../wizelogo.png'



const Header = () => {
  return(
    <header className="App-header">
      <div>
        <img src={Logo} alt="Wizeline Logo" className={'App-logo'}/>
      </div>
      <div>
        <h3>Si fueras un pasajero del Titanic... sobrevivirás?</h3>
      </div>
    </header>
  )
};

export default Header;
