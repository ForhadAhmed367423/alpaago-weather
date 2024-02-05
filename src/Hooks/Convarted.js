function tempInCelCius(value){
   
    return  Math.ceil((value - 273.15).toFixed(2))
    }
    
    function tempInFahrenheit (value){
        // (K − 273.15) × 9/5 + 32 = °F
    
    return  Math.ceil( ( ( (value - 273.15) * (9/5) ) + 32).toFixed(2))
    }
    
    export {tempInCelCius,tempInFahrenheit}