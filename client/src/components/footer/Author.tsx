import {memo} from 'react';
import Github from '../icon/Github';
import Linkedin from '../icon/Linkedin';
import Gmail from '../icon/Gmail';
import Instagram from '../icon/Instagram'

interface AuthorProps {
    author: {
        name: string;
        linkedin: string;
        github: string;
        email: string;
        instagram: string;
    }
}

const Author = ({author}: AuthorProps) => {
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

                {author.email !== '' && 
                    <li className="item" style={{marginLeft:"0.1rem"}}>
                        <a target="_blank" 
                            href= {"mailto: " + author.email}
                            rel="noreferrer"
                            aria-label="Gmail"
                        >
                            <Gmail/>
                        </a>
                    </li>}

                {author.instagram !== '' && 
                    <li className="item" style={{marginLeft:"0.1rem"}}>
                        <a target="_blank" 
                            href= {author.instagram}
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <Instagram/>
                        </a>
                    </li>}   
            </ul>
        </li>
    )
}

export default memo(Author);