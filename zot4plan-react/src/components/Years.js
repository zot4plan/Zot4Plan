import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Year from './Year';

function Years() {
    const [years] = useState(['Freshman','Sophomore','Junior','Senior']);
    return (
        <> 
            {years.map((year)=>(
                <Year key={year} year={year}></Year>
            ))}
        </>
    );
}

export default Years;