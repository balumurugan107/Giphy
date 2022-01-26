import React,{useState,useEffect} from 'react';
import { GiphyFetch } from "@giphy/js-fetch-api";
// import { IGif } from "@giphy/js-types"; 
import { TextField,Button,Grid,Container } from '@mui/material';
import Tooltip from "react-power-tooltip";
import {
    Carousel,
    Gif,
    Video,
    VideoOverlay
  } from "@giphy/react-components";
  import GiphyLogo from "../../assets/giphy.svg";

function SearchComponent() {
const [message,setMessage] = useState();
const [messagesArr,setMessagesArr] = useState([]);
const [shareShow, setShareShow] = useState(false);
const [searchTerm,setSearchTerm] = useState();
const [render,setRender] = useState();

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function CarouselDemo() {
    const fetchGifs = (offset) =>
      giphyFetch.search(searchTerm ? searchTerm : "all", { offset, limit: 10 });
    return <Carousel fetchGifs={fetchGifs} gifHeight={200} gutter={6} noLink onGifClick={(e) => {
        console.log(e);
        messagesArr.push(e);
        setMessagesArr(messagesArr);
        setRender(Math.random());
    }}/>;
  }

useEffect(() => {
    setMessagesArr(messagesArr);
}, [messagesArr.length]);

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };



  return <Container maxWidth="md" className='searchGiphy'>
      <img src={GiphyLogo} alt="giphyLogo" className='giphyLogo'/>
      <Grid id="top-row" container spacing={4} style={{marginBottom : "25px"}} >
          <Grid item xs={8}>
          <TextField id="outlined-basic" className="textField" fullWidth placeholder="Write Something" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value) } autoComplete='off' multiline rows={4}/>
          </Grid>
          <Grid item xs={2}>
          <div style={{position:"relative"}}>
          <Button variant="outlined" color='secondary' onClick={() =>{
              setShareShow(shareShow == true ? false : true);
          }}>
              Gif</Button>
              <Tooltip
                  className="tooltip"
                  show={shareShow}
                  arrowAlign="end"
                  position="bottom center"
                >
                    <TextField id="outlined-basic" placeholder="search gif" variant="outlined" onChange={(e) => setSearchTerm(e.target.value) }/>
                    <CarouselDemo />
                </Tooltip>
                </div>
          </Grid>
          <Grid item xs={2} >
          <Button variant="contained" onClick={() => {
              messagesArr.push(message);
              setMessagesArr(messagesArr);
              setMessage("");
          }}>Post</Button>
          </Grid>
      </Grid>
      {
          messagesArr.length > 0 ?
          messagesArr.map((singleMessage) =>{
              if(typeof(singleMessage) == "object"){
                  return (<Gif gif={singleMessage} width={300} style={{marginBottom : "20px"}} noLink/>);
              }else
              return <p>{singleMessage}</p>;
          }).reverse() :
          <p>No message available!</p>
      }
  </Container>;
}

export default SearchComponent;
