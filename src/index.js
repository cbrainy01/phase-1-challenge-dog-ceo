console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", init);


function init() {
/*once page is initialized, we fetch the images and add
images to div with id of 'dog-image-container' via forEach method
*/
fetch("https://dog.ceo/api/breeds/image/random/4")
.then((response) => {return response.json()})
.then(
    (data) => {
        const arrayOfImages = data.message;
        //console.log(arrayOfImages);
       arrayOfImages.forEach(link => {
           //for each link we want to create an image element and set that link as its src attribute
            //create image element
        const image = document.createElement("img");
        //set image src attribute to its link which is stored in the message key of array
       image.setAttribute("src", link);
       //find div where images will land and append image to div
        const landing = document.querySelector("#dog-image-container");
        landing.appendChild(image); 
       });
    }
);

/*create fetch which adds name of dog breed to unordered list which has id of dog-breeds */
 
fetch('https://dog.ceo/api/breeds/list/all')
.then(response => {return response.json()})
.then(   (data) => {
    //deep-iterate through all the objects found in the message key
//console.log("new stuff is: ", data);
//console.log(data.message);

//i gotta do the work to deep iterate and put EVERY breed into the arrayOfBreeds array
//so it wont be that object.keys stuff

//store the top level of the message object into variable. (The Object.keys returns an array)
const topLevel = (Object.keys(data.message))
//spread that top level into the arrayOfBreeds array
const arrayOfBreeds = [...topLevel];
//create deep itarator to get all the breeds that are stuck in arrays of the top level elements
function deepIterator(dataStructure) {

    if(Array.isArray(dataStructure)) {
        for(const element of dataStructure) {
        deepIterator(element);
        }
    }

    else if(typeof dataStructure === "object") {
        for(const key in dataStructure)
        deepIterator(dataStructure[key]);
    }
    else{
        //put whatever it is into the arrayOfBreeds. But console.log it first
        arrayOfBreeds.push(dataStructure);
    }

}

deepIterator(data.message);
//console.log(arrayOfBreeds);
//for each arrayOfBreeds element, well create a list element and add it to the ul
arrayOfBreeds.forEach(element => {
    //create new list element
    const list = document.createElement("li");
    //find ul to append list to 
    const ul = document.querySelector("#dog-breeds");
    //apply textContent(breed name gotten from element) to list
    list.textContent = element;
    //append list to its ul
    ul.appendChild(list);
    //add click event for list elements
    list.addEventListener("click", turnBlue);
function turnBlue() {
list.style.color = "blue";
}

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //show results
    //create element which represents div of landing for breed names
    const landingDiv = document.querySelector("#filter-landing");

const alphabet = ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
alphabet.forEach( (letter) => {
    //console.log("Im in");
const option = document.createElement("option");
option.value = letter;
option.setAttribute("id", letter);
option.textContent = letter;
//append option to select element
const select = document.querySelector("#breed-dropdown");
select.appendChild(option);
} );

const dropdown = document.getElementById("breed-dropdown");
dropdown.addEventListener("change", showFiltered);
function showFiltered() {
    //make original list of breeds disappear
    const makeListDisappear = document.querySelector("#dog-breeds");
    makeListDisappear.textContent = "";
    //make filtered list of breeds disappear
    landingDiv.innerHTML = "";
    const selectedOption = dropdown.value;
    //create array to put filtered results in 
    const arrayOfFilteredResults = [];
    //filter through the arrayofbreeds and if the first letter of breed name matches whatever letter was clicked, that breed name goes into arrayoffilteredresults
    arrayOfBreeds.forEach(element => {
        if(element[0] === selectedOption) {arrayOfFilteredResults.push(element);}
    });
   
    //for each filtered result, create list element, set list elements value to filtered result and append to #ul-landing. 
    arrayOfFilteredResults.forEach(  (element) => {    
        const filteredList = document.createElement("li");
        filteredList.textContent = element;
        landingDiv.appendChild(filteredList);
    } );
    


}


});


}



