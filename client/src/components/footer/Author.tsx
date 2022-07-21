import {memo} from 'react';

import Github from '../icon/Github';
import Linkedin from '../icon/Linkedin';
import Gmail from '../icon/Gmail';

interface AuthorType {
    author: {
        name: string;
        linkedin: string;
        github: string;
        email: string;
    }
}

const Author = ({author}: AuthorType) => {
    return (
        <li>
            <a target="_blank" 
                href={author.linkedin} 
                rel="noreferrer"
                className="name"
                aria-label="Linkedin"
            >
                {author.name}
            </a>
            
            <ul className="list">
                <li className="item" style={{marginRight: "0.5rem"}}>
                    <a target="_blank" 
                        href={author.linkedin}
                        rel="noreferrer"
                        aria-label="Linkedin"
                    >
                        <Linkedin/>
                    </a>
                </li>

                <li className="item" style={{marginLeft: "0.5rem",marginRight: "0.5rem"}}>
                    <a target="_blank" 
                        href={author.github}
                        rel="noreferrer"
                        aria-label="Github"
                    >
                        <Github/>
                    </a>
                </li>

                <li className="item" style={{marginLeft:"0.1rem"}}>
                    <a target="_blank" 
                        href= {"mailto: " + author.email}
                        rel="noreferrer"
                        aria-label="Gmail"
                    >
                        <Gmail/>
                    </a>
                </li>
            </ul>
        </li>
    )
}

export default memo(Author);