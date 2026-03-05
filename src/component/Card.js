import { useRef } from 'react';
import './Card.css';

const Card = ({title, description, color="black", press=()=>{}}) => {
    const ripple = useRef(null);

    const onCardMouseEnter = (e) => {
        const circle = ripple.current;
        circle.style.width = "220px";
        circle.style.height = "170px";
        circle.style.borderRadius = "10px";
    }
    const onCardMouseLeave = (e) => {
        const circle = ripple.current;
        circle.style.width = "40px";
        circle.style.height = "40px";
        circle.style.borderRadius = "0px 0px 0px 150%";
    }

    return (
    <div className="Card-Container" onClick={press}
    onMouseEnter={onCardMouseEnter} onMouseLeave={onCardMouseLeave}>
        <span className="Card-Circle" style={{background: color}} ref={ripple}></span>
        <div className="Card-Title">{title}</div>
        <div className="Card-Description" style={{color}}>{description}</div>
    </div>
    );
}

export default Card;