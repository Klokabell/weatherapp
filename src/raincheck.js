
const rainCheck = (raining) =>{
    if(raining.rain){
        return raining.rain["1h"] +"mm"
    }
    else return "0 mm"
}

export default rainCheck