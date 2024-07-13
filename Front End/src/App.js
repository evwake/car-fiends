import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Modal  from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function App() {
  const [resultsList, setResultsList] = useState(["Please make a search to see results"])
  const [results, setResults] = useState([])
  const [currentCar, setCurrentCar] = useState({})
  const [carPicture, setCarPicture] = useState()
  const [comment, setComment] = useState("");

  function selectCar(e){
    let targetCarID = e.target.value;
    let targetCar = results.filter((car) => car._id == targetCarID)[0]
    setCurrentCar(targetCar);
    let image_url = 'http://localhost:8000/image?filepath=' + targetCar.ImgFileName
    setCarPicture(<img src = {image_url}/>)
    if(targetCar.comments == undefined){
      setComment("")
    }
    else{
      setComment(targetCar.comments)
    }
    
  }

  function processComment(e){
    setComment(e.target.value)
  }

  function submitComment(){
    currentCar.comments = comment;
    fetch('http://localhost:8000/comment',
    {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: comment,
        id: currentCar._id
      })
    }
    )
  }

  function submitSearch(model, features, size, location){
   fetch(`http://localhost:8000/query?model=${model}&features=${features}&size=${size}&location=${location}`,
    {
      method: 'GET'
    }
   ).then(response => {
    if (response.ok) {
      response.json().then(json => {
        setResults(json);
        setResultsList(json.map(car => 
        <option value={car._id}>{car.COMPANY} {car.MODEL} {car.TYPE}</option>
      ));
      });
    }
  });
  }
  return (
    <div className="App">
      <div className="main-container">
        <h1>
          Car Fiends
        </h1>
        <Search onSubmit = {submitSearch}></Search> 
        <h2>
          Results
        </h2>
        {results[0] ?
        <div className='result-container'>
          
        <select size="5" onChange={selectCar}>
            {resultsList}
        </select>
        {currentCar.MODEL ? 
          <div className='car-result'>
            <div className='car-name'>
              <h2>{currentCar.COMPANY} {currentCar.MODEL} {currentCar.TYPE}</h2>
            </div>
            {carPicture}
            <div className='basic-info'>
              <div className='basic-info-left'>
                <ul>
                  <li>Size: {currentCar.SIZE}</li>
                  <li>Color: {currentCar.color}</li>
                  <li>Interior: {currentCar.interior}</li>
                  <li>Transmission: {currentCar.transmission}</li>
                  <li>Odometer: {currentCar.odometer} Miles</li>
                </ul>
              </div>
              <div className='basic-info-right'>
                <ul>
                  <li>Seller: {currentCar.seller}</li>
                  <li>Sale Date: {currentCar['Sale month']} {currentCar['Sale year']}</li>
                  <li>Selling Price: ${currentCar.sellingprice}</li>
                  <li>Seller State: {currentCar.state}</li>
                  <li>MMR: ${currentCar.mmr}</li>
                </ul>
              </div>
            </div>
            <div className='description'>
              <h3>Features</h3>
              {currentCar.Description}
            </div>
            <div className='comments-div'>
              <h3>Comments</h3>
              <textarea className='comments' onChange={processComment} id="commentSection" value={comment}></textarea>
              <button onClick={submitComment}>Save</button>
            </div>
          </div>
          : <p>Please select a car to see details</p>}
        </div>
        : <p>Please make a search to see results.</p>}
      </div>
    </div>
  );
}

export default App;
