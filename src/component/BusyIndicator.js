import { useEffect } from 'react';
import './BusyIndicator.css';

const BusyIndicator = ({show}) => {
  return (
    <div className="BusyIndicator-Container" style={{display: show ? "flex" : "none"}}>
        <div className="BusyIndicator-Background">
          <div style={{display: "flex"}}>
          {
            "ultimate utility".split("").map((ch, i) => {
              return (
                <div className="BusyIndicator-Word" key={`busyIndicator_${i}`} style={{animationDelay: (i / 16) + "s"}}>
                  {ch}
                </div>
              )
            })
          }
          </div>
          Loading please wait...
        </div>
    </div>
  );
}

export default BusyIndicator;