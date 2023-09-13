import './StyleSheet/landingpage.css'

export default function MainLayout({children}) {
    return(
        <div  className="layout-body">
            <div className="heading">
                <h1>DevBank</h1>
                <div>question</div>
            </div>
            <div>{children}</div>
        </div>
    )
}