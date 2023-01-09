const AP_EXAM_URL = 'https://apstudents.collegeboard.org/getting-credit-placement/search-policies/college/3887'
const DEGREE_WORK_URL = 'https://reg.uci.edu/RespDashboard/worksheets'

const ApExamNote = () => {
    return (
        <p className='ap-exam-note'>*Check your&nbsp; 
            <a  
                target='_blank'
                href={AP_EXAM_URL}
                rel='noreferrer'
                aria-label='AP Exams list'
            > 
                AP exams 
            </a> 
            &nbsp;and credits in&nbsp;
            <a 
                target='_blank' 
                href={DEGREE_WORK_URL}
                rel='noreferrer'
                aria-label='Degree Work'
            >
                Degree Work
            </a>
        </p>
    )
}

export default ApExamNote;