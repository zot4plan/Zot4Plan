import {useState} from 'react';

interface ReadMoreType {
    text: string;
}

const ReadMore = ({ text }: ReadMoreType) => {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    return (
      <span>
        {isReadMore ? text.slice(0, 100) : text}
        <span onClick={toggleReadMore} style={{color:'#307ABB', cursor:'pointer'}}>
          {isReadMore ? "... read more" : " show less"}
        </span>
      </span>
    );
  };

  export default ReadMore;