import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
function App() {
  const[input, setInput] = useState('');
  const[geo, setGeo] = useState([]);
  const[button, setButton]= useState(false);
  const[error, setError] = useState(false);

  const dummy = [{
    "ip": "161.185.160.93",
    "city": "New York City",
    "region": "New York",
    "country": "US",
    "loc": "40.7143,-74.0060",
    "org": "AS22252 The City of New York",
    "postal": "10004",
    "timezone": "America/New_York",
    "readme": "https://ipinfo.io/missingauth"
  }];

  const getGeo = async (ip) =>{
    try{
    const res = await axios.get('https://ipinfo.io/' + ip  + '/geo'); //Error 429, pero aca se obtendria los datos para poder llenar en la tabla
    setInput(res);
    } catch(error){
      setError(true);
      console.error(error);
    }
  }

  const sendGeo = async ()=>{
    try{
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        'ip': geo.at(0).ip,
        'city': geo.at(0).city,
        'region': geo.at(0).region,
        'country': geo.at(0).country
    })
    setGeo([res]);
    }catch(error){
      console.error(error);
    }
  }


  const handleInput = (e) =>{
    setInput(e.target.value)
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e.target.value)) {  
      setButton(true);
      return(true);
    } else{
      setButton(false);
      return(false)
    }
  }



  return (
    <div className="App">
      <h1>CONTROL 2 TEL-335</h1>
      <input id='input_ip'  onInput={handleInput} type='text' placeholder='Ingrese IP aca'></input>
      {/* Este boton se ocuparia si no diera error 429    <button id='search_btn' disabled={button === false || input === ''} onClick = {()=>getGeo(input)}>Buscar</button>*/}
      <button id='search_btn' disabled={button === false || input === ''} onClick = {()=>setGeo(dummy)}>Buscar</button>
      <textarea hidden={error===false}>No se logro encontrar la IP</textarea>
      <textarea hidden={button === true || input === ''}>El formato de la IP es incorrecto.</textarea>
      <table className='table'>
          <thead>
            <th>ip</th>
            <th>hostname</th>
            <th>city</th>
            <th>region</th>
            <th>country</th>
            <th>loc</th>
            <th>org</th>
            <th>postal</th>
            <th>timezone</th>
          </thead>
            <tbody>
              {geo.map((geo) => (
                <tr key={geo.ip} >
                  <td>{geo.ip}</td>
                  <td>{geo.hostname}</td>
                  <td>{geo.city}</td>
                  <td>{geo.region}</td>
                  <td>{geo.country}</td>
                  <td>{geo.loc}</td>
                  <td>{geo.org}</td>
                  <td>{geo.postal}</td>
                  <td>{geo.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button id='save_btn' hidden={geo.length ===0} onClick={()=>sendGeo()} >Guardar</button>
    </div>
  );
}

export default App;
