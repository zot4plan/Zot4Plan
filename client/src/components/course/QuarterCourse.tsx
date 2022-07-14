import { memo, MouseEvent } from 'react';
import {useSelector} from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import {RootState} from '../../app/store';
import ButtonRemoveCourse from '../button/ButtonRemoveCourse';
import CourseButton from './CourseButton';

import './Course.css';

function checkPrereqs(prereqs: any, taken:Set<string>) {
  if (Object.keys(prereqs).length === 0) return true          // No prereqs

  const key = Object.keys(prereqs)[0];
  const reqArray = prereqs[key]

  if (key === 'AND') {
    for (let i = 0; i < reqArray.length; i++) {
      const req = reqArray[i]
      if (typeof(req) === 'string') {
        if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('PLACEMENT')) continue     // Treat those requirements as fulfilled
        if (!taken.has(req)) return false                                                    // Missing a required class in AND
      } else {
        if (!checkPrereqs(req, taken)) {
          return false                                                 // Prereq tree inside AND not fulfilled
        }
      }
    }
    return true                                                       // Everything fulfilled

  } else {  
    for (let i = 0; i < reqArray.length; i++) {
      const req = reqArray[i]
      if (typeof(req) === 'string') { 
        if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('PLACEMENT')) return true     // Treat those requirements as fulfilled
        if (taken.has(req)) return true                               // Taken a class in OR
      } else {
        if (checkPrereqs(req, taken)) {
          return true                                                 // Prereq tree fulfilled in OR
        }
      }
    }
    return false                                                      // Nothing fulfilled
  }
}

function QuarterCourse({index, sectionId, courseId}: CoursePayload) {
  const prereqsFulfilled = useSelector((state:RootState) => {
    const pastCourses = new Array()
    const yearIds = state.store.years.allIds
    let ended = false
    for (let i = 0; i < yearIds.length; i++) {
      const yearId = yearIds[i]
      const quarterIds = state.store.years.byIds[yearId]
      for (let j = 0; j < quarterIds.length; j++) {
        if (quarterIds[j] === sectionId) {
          ended = true
          break
        } else {
          pastCourses.push(...state.store.sections[quarterIds[j]])
        }
      }
      if (ended) {
        break
      }
    }

    const pastCoursesSet = new Set<string>(pastCourses)

    let prereqs = state.store.courses[courseId].data['prerequisite_tree']
    prereqs = prereqs.replace(/'/g, '"')                                               // Replacing with double quotes to use JSON.parse
    if (prereqs === '') {
      prereqs = '{}'
    }
    prereqs = JSON.parse(prereqs)

    return checkPrereqs(prereqs, pastCoursesSet)
  })

  return (   
    <Draggable 
      key={sectionId + courseId} 
      draggableId={sectionId + courseId} index={index}
    >
      {(provided) => (
          <div ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="relative quarter-course"
            //onClick={handleOnClick}
          >
            <CourseButton id={courseId} 
              sectionId={sectionId}
              showUnit={true} 
              isCrossed={false}
              isWarning={!prereqsFulfilled}
            />
            <ButtonRemoveCourse courseId={courseId} sectionId={sectionId} index={index}/>
            
          </div>
      )}
    </Draggable>
  )
}

export default memo(QuarterCourse)