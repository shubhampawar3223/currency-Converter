
var data,values;
var fromElement1;
var fromElement2;
var database=[]
resultElement = document.createElement("div")
resultElement.setAttribute("class","offset-3 col-6")
getApiResponse();
async function getApiResponse(){
        let currencyResponse = await fetch("https://api.exchangeratesapi.io/latest")
        let data = await currencyResponse.json()
         keys = Object.keys(data.rates)
         values = Object.values(data.rates)
               

        let countryResponse = await fetch("https://restcountries.eu/rest/v2/all");
        let countryData= await countryResponse.json();
        
        
         
        for(let i=0; i<keys.length; i++){
            if(keys[i]==="SGD"){
                database.push("Singapore")
            }
            else{
           for(let j=0; j< countryData.length; j++){
               if(keys[i]== countryData[j].currencies[0].code){
                database.push(countryData[j].name);
                break;
               }

           }
        }
        }
        let usIndex=keys.indexOf("USD") 
        database[usIndex] = "US"
        database.push("EU")
        keys.push("EUR");
         values.push(1);
         setSelectValues(database)

         
         

        
let c1,c2;
function setSelectValues(database){
    
     fromElement1 = document.querySelector(".country1")
     fromElement2 = document.querySelector(".country2")
    for(let i=0;i<database.length;i++){
    createOption(database[i],fromElement1) 
    createOption(database[i],fromElement2) 
    }
}

function createOption(data1,element){
    let optioni = document.createElement("option")
    optioni.setAttribute("value", data1)
    optioni.innerHTML=data1;
    element.append(optioni)
}

let covertButton = document.querySelector(".convert")
covertButton.addEventListener("click",(e)=>{
    
    let c1=document.querySelector(".country1").value
    let c2 = document.querySelector(".country2").value
    let amountV = document.querySelector(".amount").value
    evaluate(c1,c2,amountV)
    
})


function evaluate(c1,c2,amountV){     
    amountV= +amountV
    if(c1 !== "Choose country" && c2 !== "Choose country" && amountV >=0 ){
        let p = database.indexOf(c1);
        let q = database.indexOf(c2); 
        let temp= 1/values[p]
        let temp1 = temp* values[q]
        let temp12 = temp1.toFixed(3)
        temp2 = temp12*amountV;
        showResult(temp2,temp12,keys[p],keys[q])   
    }
    else{
        showError('Error')
    }
}

let main = document.querySelector(".main")

let rowElement= document.createElement("div")
rowElement.setAttribute("class","row");

let colElement= document.createElement("div")
colElement.setAttribute("class","offset-3 col-6 p-3 para");
colElement.style.backgroundColor="#9cbdf7"

    


function showResult(result1, result2,curr1,cur2){
    
        colElement.innerHTML="";
        colElement.innerHTML="Result= " +result1 +""+cur2;
        colElement.style.fontSize="30px"; 

    document.body.append(resultElement);
    resultElement.append(rowElement);
    rowElement.append(colElement);
    

}

function showError(){
    colElement.innerHTML="";
    colElement.innerHTML="Invalid Inputs"
    colElement.style.fontSize="30px";

    document.body.append(resultElement);
    resultElement.append(rowElement);
    rowElement.append(colElement);
}
}



 



