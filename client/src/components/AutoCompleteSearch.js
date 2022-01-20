import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef } from 'react';
import { InputGroup, Button, FormControl, ListGroup } from 'react-bootstrap';
import Axios from 'axios';

function AutoCompleteSearch( {onSubmit} ) {
  const [autoComplete, setAutoComplete] = useState({
    suggestRowIdx: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ""
  });

  const itemRefs = useRef();
  itemRefs.current = [];

  const selectText = text => {
    setAutoComplete( (prevState) => ({...prevState, userInput: text}) );
  };

  const setSearchBarValue = (e) => {
    const userInput = e.currentTarget.value;

    if(userInput.trim().length === 0) {
      itemRefs.current = [];
    }

    if(userInput.trim().length > 2) {
      Axios.get('http://localhost:8080/api/filterCourses', {
        params: {
          id: userInput
        }
      }).then((res) => {
        console.log(res);
        let filteredSuggestions = [];
        res.data.forEach(course => filteredSuggestions.push(course.id))
        setAutoComplete({suggestRowIdx: 0, showSuggestions:true, userInput: userInput,filteredSuggestions: filteredSuggestions} );

      }).catch((err)=> console.log(err))
    }
    else
      setAutoComplete({suggestRowIdx: 0, showSuggestions:false, userInput: userInput,filteredSuggestions: []} );
  };

  const addToRefs = (el, index) => {
    if(el && ! itemRefs.current.includes(el)){
      itemRefs.current[index] = el;
    }
  }

  const onSelectKeyDown = (e) => {
    const filteredSuggestions = autoComplete.filteredSuggestions;
    const suggestRowIdx = autoComplete.suggestRowIdx;

    let scrollIndex = suggestRowIdx - 1;

    if (e.keyCode === 13) {
      selectText(filteredSuggestions[suggestRowIdx]);
    }
    else if (e.keyCode === 38 && suggestRowIdx > 0) {
      //itemRefs.current[scrollIndex].scrollIntoView();
      setAutoComplete( (prevState) => ({...prevState, suggestRowIdx: scrollIndex}) );
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40 && suggestRowIdx + 1 !== filteredSuggestions.length) {
      scrollIndex = suggestRowIdx + 1;
      //itemRefs.current[scrollIndex].scrollIntoView();
      setAutoComplete( prevState =>{ return {...prevState, suggestRowIdx: scrollIndex} });
    }
  };

  const renderSuggestions = () => {
    const filteredSuggestions = autoComplete.filteredSuggestions;
    const suggestRowIdx = autoComplete.suggestRowIdx;

    return (
      <>
        {filteredSuggestions.map((suggestion, index) => {
          return (
            <ListGroup.Item
              className={index === suggestRowIdx ? "active" : null}
              key={suggestion}
              onClick={e => selectText(e.currentTarget.innerText)}
              ref={el => addToRefs(el, index)}
            >
              {suggestion}
            </ListGroup.Item>
          );
        })}
      </>
    ); 
  }

  return (
    <div className="search-bar-dropdown mb-3 mt-4">
      <InputGroup>
        <FormControl
          placeholder="Add course"
          aria-label="Add course"
          aria-describedby="basic-addon2"
          onChange={setSearchBarValue}
          onKeyDown={onSelectKeyDown}
          value={autoComplete.userInput}
        />
        <Button style={{zIndex: 0}}
                variant="outline-secondary" 
                id="button-addon2"
                onClick = { e => {
                  e.preventDefault();
                  onSubmit(autoComplete.userInput);
                }}>
          <i className="fas fa-plus"></i>
        </Button>
      </InputGroup>
      <ListGroup>
        {renderSuggestions()}
      </ListGroup>
    </div>
  );
}

export default AutoCompleteSearch