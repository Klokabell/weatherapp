const dateMaker = () => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                  "September", "October", "November", "December"];
    
    let d = new Date()
    let day = d.getDate()
    let month = months[d.getMonth()] + " "
    let padMinutes = String(d.getMinutes()).padStart(2, '0')
    let hours = d.getHours() 
    let time = hours + ":" + padMinutes


    let date = [month, day, time, hours]
    return date
}

export default dateMaker