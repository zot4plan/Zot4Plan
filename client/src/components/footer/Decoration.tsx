import { memo } from 'react';
import tree from '../../assets/images/tree.png';
import zotWalk from '../../assets/images/zot-walk.png';
// import ornaments from '../theme/christmas/Ornaments';
// import topStar from '../../assets/theme/christmas/top-star.png';

const Decoration = () => {
    return (
        <div id="zot-tree">
            <img src={zotWalk} style={{width: '6.4rem', height:'6.4rem'}} alt="A walking aneater"/>
            <img src={tree} style={{width: '12.8rem', height:'12.8rem'}} alt="A black tree"/>

            {/* {ornaments.map(ornament => 
                <img key={ornament.id}
                    className="ornament"
                    id={ornament.id} 
                    src={ornament.src} 
                    alt={ornament.alt}
                />
            )}

            <img src={topStar} id='topStar' alt='top star'/> */}
        </div>
    )
}

export default memo(Decoration);