import { useRef } from 'react';
import './Card.css';

const Card = ({title, description, color="black", press=()=>{}}) => {
    const ripple = useRef(null);

    const onCardMouseEnter = (e) => {
        const circle = ripple.current;
        circle.classList.toggle("mouse-enter");
    }
    const onCardMouseLeave = (e) => {
        const circle = ripple.current;
        circle.classList.toggle("mouse-enter");
    }

    return (
    <div className="Card-Container" onClick={press} style={{borderColor: color}}
    onMouseEnter={onCardMouseEnter} onMouseLeave={onCardMouseLeave}>
        <span className="Card-Circle" style={{background: color}} ref={ripple}></span>
        <div className="Card-Title" style={{"--text-color": color}}>{title}</div>
        <div className="Card-Description">{description}</div>
    </div>
    );
}

export default Card;