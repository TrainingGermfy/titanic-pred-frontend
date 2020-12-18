import React, { Component } from "react";
function Etiqueta(props) {
  if(!props.respSobrevivio)
    return null;

  const isSobrevivio = props.respSobrevivio;
  return(
    <div >{isSobrevivio === 'true'
      ? <h2 className="alert alert-success" role="alert">Sobrevivirías</h2>
      : <h2 className="alert alert-danger" role="alert">Lo siento no lo lograrías</h2>
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

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    fetch('https://titanic-pdr.wl.r.appspot.com', options).then(response => response.json())
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
      <div className={"Input-form container"}>
        <div>
          <h2>Datos del pasajero que abordará la embarcacion</h2>
          <form onSubmit={this.handleFormSubmit}>
            <div className={'mb-1'}>
              <label htmlFor="inpEmbarque" className={'form-label'}>Puerto de embarque</label>
              <select name="inpEmbarque" id="inpEmbarque" className={'form-select'} onChange={e => this.handleChange(e)}>
                <option value="1">Cherbourg</option>
                <option value="2">Queenstown</option>
                <option value="3">Southampton</option>
              </select>
            </div>
            <div className={'mb-1'}>
              <label htmlFor="inpTarifa" className={'form-label'}>Tarifa <b>(Libras 5-515)</b></label>
              <input type="number" name="inpTarifa" id={"inpTarifa"} min={5} max={515} value={this.state.inpTarifa} onChange={e => this.handleChange(e)}/>
            </div>
            <div className={'mb-1'}>
              <label htmlFor="inpEdad" className={'form-label'}>Edad <b>(12-120 años)</b></label>
              <input type="number" name="inpEdad" id={'inpEdad'} min={12} max={120} value={this.state.inpEdad} onChange={e => this.handleChange(e)}/>
            </div>
            <div className={'mb-1'}>
              <label htmlFor="inpGenero" className={'form-label'}>Género</label>
              <select name="inpGenero" id="inpGenero" className={'form-select'} onChange={e => this.handleChange(e)}>
                <option value="1">Femenino</option>
                <option value="0">Masculino</option>
              </select>
            </div>
            <div className={'mb-1'}>
              <label htmlFor="inpClase" className={'form-label'}>Clase</label>
              <select name="inpClase" id="inpClase" className={'form-select'} onChange={e => this.handleChange(e)}>
                <option value="1">Primera Clase</option>
                <option value="2">Segunda Clase</option>
                <option value="3">Tercera Clase</option>
              </select>
            </div>
            <div className={'mb-1'}>
              <label htmlFor="inpCabina" className={'form-label'}>Cabina</label>
              <select name="inpCabina" id="inpCabina" className={'form-select'} onChange={e => this.handleChange(e)}>
                <option value="1">Cabina A</option>
                <option value="2">Cabina B</option>
                <option value="3">Cabina C</option>
                <option value="4">Cabina D</option>
                <option value="5">Cabina E</option>
                <option value="6">Cabina F</option>
                <option value="7">Cabina G</option>
                <option value="8">Cabina T</option>
              </select>
            </div>
            <div className={'mb-1'}>
              <label htmlFor="inpSibSp" className={'form-label'}>Número de esposo/hermanos</label>
              <input type="number" name="inpSibSp" id={'inpSibSp'} value={this.state.inpSibSp} onChange={e => this.handleChange(e)} min={0}/>
            </div>
            <div className={'mb-1'}>
              <label htmlFor="inpParch" className={'form-label'}>Número de padres/hijos</label>
              <input type="number" name="inpParch" id={'inpParch'} value={this.state.inpParch} onChange={e => this.handleChange(e)} min={0}/>
            </div>
            <div className={'mb-3'}>
              <button type={'reset'} className={'btn btn-primary'}>Limpiar datos</button>
              <button type={'submit'} className={'btn btn-secondary'}>Predecir!</button>
            </div>

          </form>
        </div>


        <Etiqueta respSobrevivio={this.state.respSobrevivio}></Etiqueta>

      </div>

    )
}


}



export default InputForm;