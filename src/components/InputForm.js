import React, { Component } from "react";
function Etiqueta(props) {
  if(!props.respSobrevivio)
    return null;

  const isSobrevivio = props.respSobrevivio;
  return(
    <div>{isSobrevivio === 'true'
      ? <h2>Sobrevivirías</h2>
      : <h2>Lo siento no lo lograrías</h2>
    }
    </div>
  )
}

class InputForm extends Component{
  state = {
    inpParch : 0,
    inpSibSp : 0,
    inpEmbarque : 0,
    inpTarifa : 5,
    inpEdad : 29,
    inpGenero : 0,
    inpClase : 1,
    inpCabina: 0,
    respSobrevivio: null
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const data = {
      inpEmbarque : this.state.inpEmbarque,
      inpTarifa : this.state.inpTarifa,
      inpEdad : this.state.inpEdad,
      inpGenero : this.state.inpGenero,
      inpClase : this.state.inpClase,
      inpSibSp: this.state.inpSibSp,
      inpParch : this.state.inpParch,
      inpCabina : this.state.inpCabina
    };
    this.setState({ respSobrevivio : null });
    console.log(JSON.stringify(data));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    //fetch("https://titanic-pdr.wl.r.appspot.com", options).then(response => response.json())
    fetch("http://127.0.0.1:8000", options).then(response => response.json())
    .then((data) => {
      this.setState({ inpParch : 0,
        inpSibSp : 0,
        inpEmbarque : 0,
        inpTarifa : 5,
        inpEdad : 29,
        inpGenero : 0,
        inpClase : 1,
        inpCabina: 0,
        respSobrevivio : data.sobrevive.toLowerCase()
      });
    })
    .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Datos del pasajero que abordará la embarcacion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><label htmlFor="inpEmbarque">Puerto de embarque</label></td>
                <td><select name="inpEmbarque" id="inpEmbarque" onChange={e => this.handleChange(e)}>
                  <option value="1">Cherbourg</option>
                  <option value="2">Queenstown</option>
                  <option value="3">Southampton</option>
                </select></td>
              </tr>
              <tr>
                <td><label htmlFor="inpTarifa">Tarifa <b>(Libras 5-515)</b></label></td>
                <td><input type="number" name="inpTarifa" id={"inpTarifa"} min={5} max={515} value={this.state.inpTarifa} onChange={e => this.handleChange(e)}/></td>
              </tr>
              <tr>
                <td><label htmlFor="inpEdad">Edad <b>(12-120 años)</b></label></td>
                <td><input type="number" name="inpEdad" id={'inpEdad'} min={12} max={120} value={this.state.inpEdad} onChange={e => this.handleChange(e)}/></td>
              </tr>
              <tr>
                <td><label htmlFor="inpGenero">Género</label></td>
                <td><select name="inpGenero" id="inpGenero" onChange={e => this.handleChange(e)}>
                  <option value="1">Femenino</option>
                  <option value="0">Masculino</option>
                </select></td>
              </tr>
              <tr>
                <td><label htmlFor="inpClase">Clase</label></td>
                <td><select name="inpClase" id="inpClase" onChange={e => this.handleChange(e)}>
                  <option value="1">Primera Clase</option>
                  <option value="2">Segunda Clase</option>
                  <option value="3">Tercera Clase</option>
                </select></td>
              </tr>
              <tr>
                <td><label htmlFor="inpCabina">Cabina</label></td>
                <td><select name="inpCabina" id="inpCabina" onChange={e => this.handleChange(e)}>
                  <option value="1">Cabina A</option>
                  <option value="2">Cabina B</option>
                  <option value="3">Cabina C</option>
                  <option value="4">Cabina D</option>
                  <option value="5">Cabina E</option>
                  <option value="6">Cabina F</option>
                  <option value="7">Cabina G</option>
                  <option value="8">Cabina T</option>
                </select></td>
              </tr>
              <tr>
                <td><label htmlFor="inpSibSp">Número de esposo/hermanos</label></td>
                <td><input type="number" name="inpSibSp" id={'inpSibSp'} value={this.state.inpSibSp} onChange={e => this.handleChange(e)}/></td>
              </tr>
              <tr>
                <td><label htmlFor="inpParch">Número de padres/hijos</label></td>
                <td><input type="number" name="inpParch" id={'inpParch'} value={this.state.inpParch} onChange={e => this.handleChange(e)}/></td>
              </tr>
              <tr>
                <td><button type={'reset'}>Limpiar datos</button></td>
                <td><button type={'submit'}>Predecir!</button></td>
              </tr>
            </tbody>

          </table>
        </form>
        <div>
          <Etiqueta respSobrevivio={this.state.respSobrevivio}></Etiqueta>
        </div>
      </div>

    )
}


}



export default InputForm;