import './Header.css';

function DropDown() {
    const MenuItems = [
        {
            "name": "UCI Course Catalogue",
            "href": 'https://catalogue.uci.edu/allcourses/',
        },
        {
            "name": "UCI Majors Catalogue",
            "href": "https://catalogue.uci.edu/undergraduatedegrees/",
        },
        {
            "name": "UCI Academic Advising",
            "href": "https://ps.uci.edu/stuaff/ac.html",
        }
    ];

    return (
        <ul className='dropdown-menu'>
            {MenuItems.map((item, index) =>  
                <li key={index} className='dropdown-link'>
                    <a target="_blank" 
                        href={item.href}
                        rel="noreferrer"
                        aria-label="Linkedin"
                    >
                        {item.name}
                    </a>
                </li>
            )}
        </ul>
    );
}

export default DropDown;