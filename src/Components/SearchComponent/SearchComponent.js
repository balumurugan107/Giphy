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



  return <Container maxWidth="sm">
      <Grid id="top-row" container spacing={24}>
          <Grid item xs={4}>
          <TextField id="outlined-basic" fullWidth placeholder="Write Something" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value) } autoComplete='off'/>
          </Grid>
          <Grid item xs={4} >
          <Button variant="contained" onClick={() => {
              messagesArr.push(message);
              setMessagesArr(messagesArr);
              setMessage("");
          }}>Post</Button>
          </Grid>
          <Grid item xs={4}>
          <Button variant="contained" onClick={() =>{
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
          </Grid>
      </Grid>
      {
          messagesArr.length > 0 ?
          messagesArr.map((singleMessage) =>{
              if(typeof(singleMessage) == "object"){
                  return (<Gif gif={singleMessage} />);
              }else
              return <p>{singleMessage}</p>;
          }) :
          <p>No message available!</p>
      }
  </Container>;
}

export default SearchComponent;
