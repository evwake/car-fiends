import './Search.css'
import { useState } from 'react';




export default function Search({onSubmit}) {
  const [model, setModel] = useState("");
  const [features, setFeatures] = useState("");
  const [size, setSize] = useState("");
  const [loc, setLoc] = useState("");

  function changeModel(e){
    setModel(e.target.value);
  }
  function changeFeatures(e){
    setFeatures(e.target.value);
  }
  function changeSize(e){
    setSize(e.target.value);
  }  
  function changeLoc(e){
    setLoc(e.target.value);
  }
  function submit(e){
    e.preventDefault()
    onSubmit(model, features, size, loc)
  }
    return (
      <form>
        <label for = "model">Model:</label>
        <input name = "model" onChange={changeModel}/>
        <label for = "features">Features:</label>
        <input name = "features" onChange={changeFeatures}/>
        <label for = "size">Size:</label>
        <input name = "size" onChange={changeSize}/>
        <label for = "size">Location:</label>
        <input name = "size" onChange={changeLoc}/>
        <div className='submit-container'>
          <button name = "submit" onClick={submit}> Submit</button>
        </div>
      </form>
    );
  }