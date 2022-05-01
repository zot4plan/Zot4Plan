import {memo} from 'react';

import Github from '../../components/icon/Github';
import Linkedin from '../../components/icon/Linkedin';
import Facebook from '../../components/icon/Facebook';

interface AuthorType {
    author: {
        name: string;
        profile: string;
        linkedin: string;
        facebook: string;
        github: string;
    }
}
const Author = ({author}: AuthorType) => {
    return (
        <li>
            <div className='flex'>
                <img className="author-image"
                    src={author.profile}
                    alt={author.name}
                />

                <a target="_blank" 
                    href={author.linkedin} 
                    rel="noreferrer"
                    className="author-name"
                    aria-label="Linkedin"
                >
                    {author.name}
                </a>
            </div>

            <ul className="contact-list">
                <li className="contact-item">
                    <a target="_blank" 
                        href={author.facebook} 
                        rel="noreferrer"
                        aria-label="FaceBook"
                    >
                        <Facebook/>
                    </a>
                </li>

                <li className="contact-item">
                    <a target="_blank" 
                        href={author.linkedin}
                        rel="noreferrer"
                        aria-label="Linkedin"
                    >
                        <Linkedin/>
                    </a>
                </li>

                <li className="contact-item">
                    <a target="_blank" 
                        href={author.github}
                        rel="noreferrer"
                        aria-label="Github"
                    >
                        <Github/>
                    </a>
                </li>
            </ul>
        </li>
    )
}

export default memo(Author);