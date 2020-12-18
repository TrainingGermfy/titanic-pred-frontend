import React from 'react';
import Logo from '../wizelogo.png'



const Header = () => {
  return(
    <header className="App-header container">
      <div className={'row p-2'}>
        <div className={'col-sm-4'}>
          <img src={Logo} alt="Wizeline Logo" className={'App-logo'}/>
        </div>
        <div  className={'col-sm-8'}>
          <h3>Si fueras un pasajero del Titanic... sobrevivirás?</h3>
        </div>
      </div>

    </header>
  )
};

export default Header;
