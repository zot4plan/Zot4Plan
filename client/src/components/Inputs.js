import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

function Inputs() {
    
    return (
      <InputGroup className="mb-3 mt-4">
        <FormControl
          placeholder="Add course"
          aria-label="Add course"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
        <i className="fas fa-plus"></i>
        </Button>
    </InputGroup>
    );
  }

export default Inputs