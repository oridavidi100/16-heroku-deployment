let bad=new Image(250,200)
bad.src="https://pm1.narvii.com/5752/dfa795a403b03df267e44ab0a223fd50bf86c3c3_hq.jpg"
let data ;
let dat ;
document.getElementById("release").addEventListener("click",release)
document.getElementById("collection").addEventListener("click",showCollection)
document.getElementById("catch").addEventListener("click",Catch)
document.getElementById("img").addEventListener("mouseover",changeSrc)//when the mouse over change the image
document.getElementById("img").addEventListener("mouseleave",backSrc)//when the mouse leave change the image again
document.getElementById("Types").addEventListener("click", typeClick)
let submit=document.getElementById("submitUserName")
submit.addEventListener("click",take)
let nameSearch=document.getElementById("searchButtonByName")  //.addEventListener("click",pokemonSearch);
let idSearch=document.getElementById("searchButtonById")//.addEventListener  ("click",pokemonSearch)//search 
idSearch.addEventListener("click", pokemonSearchId);
nameSearch.addEventListener("click",pokemonSearchName)
let loader=new Image(200,250)
loader.src="https://media4.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif"
 



function take(){
    let username=document.getElementById("username").value
}






function clear(){ 
document.getElementById("name").innerText="Name :" ;
document.getElementById("Height").innerText="Height :" ;
document.getElementById("Weight").innerText="Weight :" ;
document.getElementById("Types").innerText="Types :"
document.getElementById("img").setAttribute("src","");
document.getElementById("img").setAttribute("alt","")

}
//seraching by id
async function  pokemonSearchId (){
    clear()
     try{
        document.getElementById("loader").appendChild(loader)
        let list=document.getElementById("pokeList")
        list.innerText=""
        let inputId=document.getElementById("searchById").value
        let username=document.getElementById("username").value
        if (username==="")
        {return alerting("please enter username")} 
        const respone= await axios.get(`http://localhost:3000/pokemon/get/${inputId}`,{
            headers: { 
                "username": username,
            },
        })
        dat=await respone
        data=dat.data
        setdata(data,inputId)
        setTimeout(() => {
            document.getElementById("loader").removeChild(loader)
            },1000)
  }
    catch(error){
        setTimeout(() => {document.getElementById("loader").removeChild(loader)
         }, 500); 
        let list=document.getElementById("pokeList")
        list.innerText=error.response.data.error
        badGuy()

     }
 }


//searching by name
 async function  pokemonSearchName (){
    clear()
    try{
        document.getElementById("loader").appendChild(loader)
        let list=document.getElementById("pokeList")
        list.innerText=""
        let inputName=document.getElementById("searchByName").value
        let username=document.getElementById("username").value
        if (username==="")
        {return alerting("please enter username")} 
        const respone= await axios.get(`http://localhost:3000/pokemon/get/${inputName}`,{
            headers: { 
                "username": username,
            },
        })
        dat=await respone
        data=dat.data
        setdata(data,inputName)
        setTimeout(() => {
            document.getElementById("loader").removeChild(loader)
            },1000)
  }
    catch{
        setTimeout(() => {document.getElementById("loader").removeChild(loader)
         }, 500); 
        let list=document.getElementById("pokeList")
        list.innerText=error.response.data.error
        badGuy()

     }
 }



function setdata(data,input){
    const name=data.name;
    const Height=data.height;
    const Weight=data.weight;
    document.getElementById("Types").innerText="Types :"
    let Types=document.getElementById("Types");
    for(let typeindex of data.types){
        const typ =document.createElement("span")
        typ.innerText=typeindex +" "
        Types.appendChild(typ)
    }
    const src=data.front_pic
    document.getElementById("name").innerText="Name :" +name;
    document.getElementById("Height").innerText="Height :" +Height;
    document.getElementById("Weight").innerText="Weight :" +Weight;
    document.getElementById("img").setAttribute("src",src);
    document.getElementById("img").setAttribute("alt",input);
}


function alerting(err){
    document.getElementById("alert").innerText=err
    setTimeout(() => {document.getElementById("alert").innerText=""
}, 3500); 
    
}

function badGuy(){
    //setTimeout(() => {
        document.getElementById("badguy").appendChild(bad)
    //}, 1500); 
    setTimeout(() =>
        document.getElementById("badguy").removeChild(bad),
        2000)
    

}






async function changeSrc(e){
    let inputId=e.target.alt
    let username=document.getElementById("username").value
    const respone= await axios.get(`http://localhost:3000/pokemon/get/${inputId}`,{
        headers: { 
            "username": username,
        },
    })
    const dat=await respone
    data=dat.data
    document.getElementById("img").setAttribute("src",data.back_pic)
}


//changing the image back when the mouse isnt over 
async function backSrc(event){
    let inputId=event.target.alt
    let username=document.getElementById("username").value
    const respone= await axios.get(`http://localhost:3000/pokemon/get/${inputId}`,{
        headers: { 
            "username": username,
        },
    })
    const dat=await respone
     data=dat.data
    document.getElementById("img").setAttribute("src",data.front_pic)
}



async function Catch(){
    let username=document.getElementById("username").value
    let id=data.id
    try {
        const respone= await axios.put(`http://localhost:3000/pokemon/catch/${id}`,
            {"pokemon":data},
            {headers: { 
                "username": username,   
                'Content-Type': 'application/json'   
            }},
            )
       showCollection()
    }
    catch(error){
        console.log(error.response.data.error)
       alerting(error.response.data.error)
    }
}



async function release(){
    let id=data.id
    let username=document.getElementById("username").value;
    try{ 
       const response= await axios.delete(`http://localhost:3000/pokemon/release/${id}`,{
        headers:{
            "username":username
        }
        })
        showCollection()
         }
    catch(error){
        alerting(error.response.data.error)
    }
}







//print all pokemons with the same type
async function typeClick(event){
    //try{
            let type=(event.target.textContent) 
            const respone= await axios.get(`http://localhost:3000/pokemon/type/${type}`,{
                headers: { 
                    "username": username
            }})
            let pokenames=await respone;
            let list=document.getElementById("pokeList")
            list.innerText=`  ${type} pokemons :`
            for (let poke of pokenames.data){
                let li=document.createElement("li")
                li.innerText=poke
                li.addEventListener("click",searchByClick)
                list.appendChild(li)
            }    
        }
//     catch{
//         alert("click only the types names")
//     }
// }




async function showCollection(){
    let collection=document.getElementById("pokecollc");
    let username=document.getElementById("username").value
    collection.innerText=`${username}'s collection:`
    let response=await axios.get(`http://localhost:3000/pokemon/`,{
        headers: { 
            "username": username,
    }})
    let pokemonCollection=(response.data)
    for (let collect of pokemonCollection){
        let coll =document.createElement("span")
        let img =document.createElement("img")
        img.setAttribute("src",JSON.parse(collect).front_pic)
        coll.addEventListener("click",searchByClick)
        coll.innerText=JSON.parse(collect).name 
        collection.appendChild(img)
        collection.appendChild(coll)
    }
}

 




//by clicking the name he comes up in the web 
async function searchByClick(event){
    let search =event.target.textContent
    //search = search.slice(0, -1)
    const respone= await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}/`)
    data=await respone;
    const name=data.data.name;
    const Height=data.data.height;
    const Weight=data.data.weight;
    document.getElementById("Types").innerText="Types :"
    let Types=document.getElementById("Types");
    for(let typeindex of data.data.types){
        const typ =document.createElement("span")
        typ.innerText=typeindex.type.name +" "
        Types.appendChild(typ)
    }
    const src=data.data.sprites.front_default
    document.getElementById("name").innerText="Name :" +name;
    document.getElementById("Height").innerText="Height :" +Height;
    document.getElementById("Weight").innerText="Weight :" +Weight;
    document.getElementById("img").setAttribute("src",src);
    document.getElementById("img").setAttribute("alt",search);
    let list=document.getElementById("pokeList")
    list.innerText=""
}
