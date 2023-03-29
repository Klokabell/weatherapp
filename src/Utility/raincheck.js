const rainCheck = (raining, hour) =>{
    if(raining.rain){
        return raining.rain[hour+"h"] +"mm"
    }
    else return "0 mm"
}

export default rainCheck