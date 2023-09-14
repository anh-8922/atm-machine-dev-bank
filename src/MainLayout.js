import './StyleSheet/stylesheet.css';
import {BsQuestionCircle} from 'react-icons/bs'

export default function MainLayout({children}) {
    return(
        <div  className="layout-body">
            <div className="heading">
                <h1 style={{fontSize:'2.5rem'}}>
                    <span style={{color:'var(--orange)', fontSize:'2.5rem'}}>Dev</span>Bank
                </h1>
                <BsQuestionCircle style={{fontSize:'2rem', color:'var(--orange)'}}/>
            </div>
            <div>{children}</div>
        </div>
    )
}