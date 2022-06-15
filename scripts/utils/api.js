function getAPIData(callback){
    fetch("./../data/photographers.json")
        .then(reponse => reponse.json())
        .catch(error=>{alert('une erreur est survenue!!')})
        .then(callback)
        .catch(error=>{alert('une erreur est survenue!!')})

}