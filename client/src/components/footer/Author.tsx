import { memo } from 'react';
import Github from '../icon/Github';
import Linkedin from '../icon/Linkedin';
import Gmail from '../icon/Gmail';
import Instagram from '../icon/Instagram';
import Facebook from '../icon/Facebook';

interface AuthorProps {
    author: {
        name: string;
        role: string;
        linkedin?: string;
        github?: string;
        email?: string;
        instagram?: string;
        facebook?: string;
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
            
            <ul className="list author-icon">
                {author.linkedin !== undefined &&
                <li className="item">
                    <a target="_blank" 
                        href={author.linkedin}
                        rel="noreferrer"
                        aria-label="Linkedin"
                    >
                        <Linkedin/>
                    </a>
                </li>}

                {author.github !== undefined &&
                <li className="item">
                    <a target="_blank" 
                        href={author.github}
                        rel="noreferrer"
                        aria-label="Github"
                    >
                        <Github/>
                    </a>
                </li>}

                {author.facebook !== undefined && 
                <li className="item">
                    <a target="_blank" 
                        href= {author.facebook}
                        rel="noreferrer"
                        aria-label="Facebook"
                    >
                        <Facebook />
                    </a>
                </li>}  

                {author.instagram !== undefined && 
                <li className="item">
                    <a target="_blank" 
                        href= {author.instagram}
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <Instagram/>
                    </a>
                </li>}  

                {author.email !== undefined && 
                <li className="item">
                    <a target="_blank" 
                        href= {"mailto: " + author.email}
                        rel="noreferrer"
                        aria-label="Gmail"
                    >
                        <Gmail/>
                    </a>
                </li>}
            </ul>
        </li>
    )
}

export default memo(Author);