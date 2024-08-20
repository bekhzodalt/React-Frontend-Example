import React from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';


function FromEmail() {
    const location = useLocation();
    const printRef = React.useRef();
    const [parentCourseName, setParentCourseName] = React.useState('');
    const [childCourseName, setChildCourseName] = React.useState('');
    const [domain, setDomain] = React.useState('');
    const [pDir, setPDir] = React.useState('');
    const [cDir, setCDir] = React.useState('');
    const [holes, setHoles] = React.useState(null);

    React.useEffect(() => {
        if(location.search) {
            const params = new URLSearchParams(location.search).get('prm');
            if(params) {
                const obj = JSON.parse(params);
                if(obj.pc) setParentCourseName(obj.pc);
                if(obj.cc) setChildCourseName(obj.cc);
                if(obj.dm) setDomain(obj.dm);
                if(obj.dp) setPDir(obj.dp);
                if(obj.dc) setCDir(obj.dc);
                if(obj.dt) setHoles(obj.dt);
            }
        }
    }, [location]);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div className="FromEmail">
            {/*  */}
            <button className="btn btn-print" onClick={handlePrint}>Print</button>
            {/*  */}
            <div className="club-card" ref={printRef}>
                <h2 className="text-center">{parentCourseName}</h2>
                <h4 className="text-center">{childCourseName}</h4>
                <div className="grid-holes">
                    {
                        holes 
                        ? holes.map((hole, index) => 
                            <div className="grid-hole" key={index}>
                                <img className="map-img" src={domain+pDir+'/'+cDir+'/'+hole.img} alt="map-img" />
                                {
                                    hole.pins 
                                    ? hole.pins.map((pin, iindex) => 
                                        <div className="pin-ele"
                                            title={pin.pm}
                                            key={iindex}
                                            style={{ top: pin.y + '%', left: pin.x + '%' }}
                                        >{pin.pm}</div>
                                    )
                                    : null
                                }
                            </div>
                        )
                        : null
                    }
                </div>
            </div>
            {/*  */}
        </div>
    );
}

export default FromEmail;
