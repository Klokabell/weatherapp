
const Weathericon = ({icon, iconclass}) => {
    let iconurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
    return (
        <div>
            <div className="icon"><img id={iconclass} src={iconurl} alt="icon"></img></div>
        </div>
    )
}

export default Weathericon