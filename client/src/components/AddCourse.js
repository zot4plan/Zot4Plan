import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

function AddCourse( {onSubmitFunction, onChangeFunction} ) {

    return (
      <div>
        <InputGroup className="mb-3 mt-4">
          <FormControl
            placeholder="Add course"
            aria-label="Add course"
            aria-describedby="basic-addon2"
            onChange={ e =>{ onChangeFunction(e.target.value)} }
          />
          <Button variant="outline-secondary" 
                  id="button-addon2"
                  onClick = { e => {
                    e.preventDefault();
                    onSubmitFunction();
                  }}>
          <i className="fas fa-plus"></i>
          </Button>
      </InputGroup>
    </div>
    );
  }

export default AddCourse