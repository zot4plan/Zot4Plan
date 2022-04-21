interface FunctionType {
    deleteYear: () => void;
}

/**  
 * Source: https://icon-sets.iconify.design/gg/remove/
 * Author: Astrit
 * License: MIT
*/
function Remove ({deleteYear}:FunctionType) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" className="removeIcon" onClick={deleteYear}>
            <g fill="currentColor">
            <path d="M8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"/>
            <path fillRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1s11 4.925 11 11Zm-2 0a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" clipRule="evenodd"/></g></svg>
    )
}

export default Remove;