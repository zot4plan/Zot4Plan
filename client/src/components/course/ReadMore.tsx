import {useState} from 'react';

interface ReadMoreType {
    text: string;
}

const ReadMore = ({ text }: ReadMoreType) => {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      setIsReadMore(!isReadMore);
    };

    return (
    <>
      <span>
        {isReadMore ? text.slice(0, 100) : text}
      </span>
      <span onClick={toggleReadMore} style={{color:'#307ABB', cursor:'pointer'}}>
        {isReadMore ? "... read more" : " show less"}
      </span>
    </>
    );
  };

  export default ReadMore;