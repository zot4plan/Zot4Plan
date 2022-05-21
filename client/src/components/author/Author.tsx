import {memo} from 'react';

import Github from '../../components/icon/Github';
import Linkedin from '../../components/icon/Linkedin';
import Facebook from '../../components/icon/Facebook';

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
            <div className='flex-container'>
                <a target="_blank" 
                    href={author.linkedin} 
                    rel="noreferrer"
                    className="author-name"
                    aria-label="Linkedin"
                >
                    {author.name}
                </a>
            </div>

            <ul className="flex-container" style={{marginTop: "1rem"}}>
                <li className="contact-item" style={{marginRight: "0.5rem"}}>
                    <a target="_blank" 
                        href={author.linkedin}
                        rel="noreferrer"
                        aria-label="Linkedin"
                    >
                        <Linkedin/>
                    </a>
                </li>

                <li className="contact-item" style={{marginLeft: "0.5rem",marginRight: "0.5rem"}}>
                    <a target="_blank" 
                        href={author.github}
                        rel="noreferrer"
                        aria-label="Github"
                    >
                        <Github/>
                    </a>
                </li>

                <li className="contact-item" style={{marginLeft:"0.5rem"}}>
                    <a target="_blank" 
                        href={author.linkedin}
                        rel="noreferrer"
                        aria-label="Linkedin"
                    >
                        <Facebook/>
                    </a>
                </li>
            </ul>
        </li>
    )
}

export default memo(Author);