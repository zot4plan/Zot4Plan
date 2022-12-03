import { memo } from 'react';
import Github from '../icon/Github';
import Gmail from '../icon/Gmail';
import Tools from '../icon/Tools';
import Bug from '../icon/Bug';

const Contact = () => {
    const email = "zot4plan@gmail.com";

    return (
        <ul className='list-container list-contact-us'>
            <li className="item contact-us">
                <a target="_blank" 
                    href="https://github.com/zot4plan/Zot4Plan#readme" 
                    rel="noreferrer"  
                    aria-label="Github"
                    className="contact-us-icon"
                >
                    <Github/>
                </a>  

                <a target="_blank" 
                    href="https://github.com/zot4plan/Zot4Plan#readme" 
                    rel="noreferrer"  
                    aria-label="Github"
                    className='name'
                >
                    Github
                </a>      
            </li>

            <li className="item contact-us">
                <a target="_blank" 
                    href= {"mailto: " + email}
                    rel="noreferrer"
                    aria-label="Gmail"
                    className="contact-us-icon"
                >
                    <Gmail/>
                </a>   

                <a target="_blank" 
                    href= {"mailto: " + email}
                    rel="noreferrer"
                    aria-label="Gmail"
                    className='name'
                >
                    {email}
                </a>      
            </li>

            <li className="item contact-us">
                <a target="_blank"
                    href="https://forms.gle/vak9jPNBMMYsRHAX9"
                    rel="noreferrer" 
                    aria-label="Give Feedback"
                    className="contact-us-icon"
                > 
                    <Tools/>
                </a>

                <a target="_blank"
                    href="https://forms.gle/vak9jPNBMMYsRHAX9"
                    rel="noreferrer" 
                    aria-label="Give Feedback"
                    className="name"
                > 
                    Send Us Feedback
                </a>
            </li>

            <li className="item contact-us">
                <a target="_blank"
                    href="https://forms.gle/vak9jPNBMMYsRHAX9"
                    rel="noreferrer" 
                    aria-label="Report a Bug"
                    className="contact-us-icon"
                > 
                    <Bug/>
                </a>
                
                <a target="_blank"
                    href="https://forms.gle/vak9jPNBMMYsRHAX9"
                    rel="noreferrer" 
                    aria-label="Report a Bug"
                    className="name"
                > 
                    Report Bug
                </a>
            </li>
        </ul>   
    )
}

export default memo(Contact);