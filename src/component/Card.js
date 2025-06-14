import { useRef } from 'react';
import './Card.css';
import {Link} from 'react-router-dom';

const Card = ({title, description, link, color}) => {
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
    <Link to={link} className="Card-Container"
    onMouseEnter={onCardMouseEnter} onMouseLeave={onCardMouseLeave}>
        <span className="Card-Circle" style={{background: color}} ref={ripple}></span>
        <div className="Card-Title">{title}</div>
        <div className="Card-Description" style={{color}}>{description}</div>
    </Link>
    );
}

export default Card;