import { memo } from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import CourseButton from './CourseButton';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { removeCourseFromQuarter } from '../../features/StoreSlice'
import Xmark from '../icon/Xmark';

import './Course.css';

interface courseType {
    courseId: string;
    index: number;
    droppableId: string;
}

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

function QuarterCourse({index, droppableId, courseId}: courseType) {
    const dispatch = useDispatch();


    const pastCourses = useSelector((state:RootState) => {
      const pastCourses = new Array()
      const yearIds = state.store.years.allIds
      let ended = false
      for (let i = 0; i < yearIds.length; i++) {
        const yearId = yearIds[i]
        const quarterIds = state.store.years.byIds[yearId].quarterIds
        for (let j = 0; j < quarterIds.length; j++) {
          if (quarterIds[j] === droppableId) {
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

      return pastCourses
    })

    const pastCoursesSet = new Set<string>(pastCourses)

    const prereqs = useSelector((state:RootState) => {
      let prereqs = state.store.courses.byIds[courseId].data['prerequisite_tree']
      prereqs = prereqs.replace(/'/g, '"')                                               // Replacing with double quotes to use JSON.parse
      if (prereqs === '') {
        prereqs = '{}'
      }
      return JSON.parse(prereqs)
    })
    
    const prereqsFulfilled = checkPrereqs(prereqs, pastCoursesSet)

    // pastCourses.forEach(x => {console.log(x)});

    const removeCourse = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      dispatch(removeCourseFromQuarter({
          quarterId: droppableId,
          index: index, 
          courseId: courseId
      }))
    }; 
   
    return (   
    <Draggable key={droppableId + courseId} 
      draggableId={droppableId + courseId} index={index}
    >
      {(provided) => (
        <div>
          <div ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="relative quarter-course"
          >
            <CourseButton id={courseId} 
              showUnit={true} 
              isCrossed={false}
              isWarning={!prereqsFulfilled}
            />

            <button className="remove-course-btn" onClick = {removeCourse}>
              <Xmark/>
            </button>

          </div>
        </div>
      )}
    </Draggable>
    )
}

export default memo(QuarterCourse)