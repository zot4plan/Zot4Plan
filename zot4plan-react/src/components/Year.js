import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import QuarterColumn from './QuarterColumn';

function Year({year}) {
    const [quarters] = useState(['Fall','Winter','Spring']);

    return ( 
        <Row className='mt-4 square border border-3 border-end-0'>
            <h3 key={year} style={{backgroundColor:'#82B1FF',}}
            className="p-1 mb-0 square border-bottom border-end border-3">{year}</h3>
            {quarters.map((quarter)=>(
                <Col key={quarter} className='p-0 square border-end border-3'>
                    <h5 style={{backgroundColor:'#64B5F6', marginBottom:'0px',}}className="square border-bottom border-3 p-1">{quarter}</h5>
                    <QuarterColumn></QuarterColumn>
                </Col>
            ))}
        </Row>
    );
}

export default Year;