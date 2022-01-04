import QuarterColumn from "./QuarterColumn"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';


function Schedules({courses, moveCourse}) {
    const years = ['Freshman','Sophomore','Junior','Senior'];
    const quarters = ['Fall','Winter','Spring'];
    const quartersColor = ['#FA8072','#a0e6ff','#58D68D']
    //'#E2E8E4' : grey
    let quarterCourses = [[],[],[],[],[],[],[],[],[],[],[],[]]
    Object.values(courses).forEach((course) => {
        if(course.quarter > 0)
            quarterCourses[course.quarter-1].push(course);
    })
    
    return (
        <>
            {years.map((year, indexYear)=>(
              <Row key={year} className='mt-4 square border border-3 border-end-0'>
                <h3 key={year} 
                  style={{backgroundColor:'#17202A',color: '#FDFEFE'}}
                  className="p-1 mb-0 square border-bottom border-end border-3"> {year} 
                </h3>

                {quarters.map((quarter, indexQuarter) => {
                  const currentQuarter = indexYear*3 + indexQuarter + 1;
                  return (
                    <Col key={year+quarter} className='p-0 square border-end border-3'>
                      <h5 
                      style={{backgroundColor:'#E2E8E4', marginBottom:'0px',}} 
                      className="square border-bottom border-3 p-1"> {quarter}
                      </h5>

                      <QuarterColumn 
                        courses={quarterCourses[currentQuarter-1]} 
                        onDrop={moveCourse} 
                        quarter={currentQuarter}>
                      </QuarterColumn>
                    </Col>
                  )
                })}
              </Row>
            ))}  
        </>
    );
}

  
export default Schedules;