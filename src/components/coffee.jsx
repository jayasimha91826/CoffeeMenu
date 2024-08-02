import React, { useEffect, useState } from "react";
import "./coffee.css";
import starfill from "../images/Star_fill.svg";
import star from "../images/Star.svg";

function Coffee() {
  const [data, setData] = useState([]);
  const [item, setItem]=useState([])
  const [activeButton, setActiveButton]=useState('all')

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
    )
      .then((response) => response.json())
      .then((data) => {setItem(data);setData(data)});
  }, []);

  function handleButtonClick(buttonItem){
    setActiveButton(buttonItem)
    if(buttonItem==="all")
        setItem(data)
    else
    setItem(data.filter(i=>i.available))

  }
  
  return (
    <div className="Maincontainer">
      <div className="Iteamscontainer">
        <h1 className="collection">Our Collection</h1>
        <p className="intro">
          Introducing our Coffee Collection, a selection of unique coffees{" "}
          <br />
          from different roast types and origins, expertly roasted in small
          <br /> batches and shipped fresh weekly.
        </p>
        <div className="buttoncontainer">
          <button  onClick={()=>handleButtonClick("all")} className={`all ${activeButton==="all"?"active":""}`}>All Products</button>
          <button  onClick={()=>handleButtonClick("available")} className={`all ${activeButton==="available"?"active":""}`}>Available Now</button>
        </div>
        <div className="listcontainer">
          {item.map((item) => (
            <div className="listitem">
              <img className="imag" alt="imagea" src={item.image} />
              {item.popular?<p className="popular">popular</p>:null}
              <div className="pricetag">
                <p className="coffeename">{item.name}</p>
                <p className="price">{item.price}</p>
              </div>
              <div className="soldoutcontainer">
              <div className="ratingcontainer">
                {item.rating ? <img className="star" src={starfill} /> : <img className="star" src={star} />}
                <p className="rating">{item.rating}</p>
                <p className="ratingVotes">({item.votes?item.votes+" votes":"no ratings"})</p>
              </div>
              {item.available?null:<p className="soldout">sold out</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Coffee;
