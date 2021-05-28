window.onload = helperFunc();


function getData(categories) {
    const parent = document.getElementById('display');
    const removeChilds = (parent) => {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    };
    removeChilds(parent)
    for (let name of categories) {
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + name + "";
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("network error");
                }
            })
            .then(function(data) {
                return displayCocktail(data);
            })
            .catch((error) => {
                console.error("fetch error", error);
            });
    }
}

function helperFunc() {
    let categories = new Set()
        //'Ordinary_Drink', 'beer', 'cocktail'

    const ordinary = document.getElementById('ordinary').checked
    const cocktail = document.getElementById('cocktail').checked
    const beer = document.getElementById('beer').checked
    if (ordinary == true)
        categories.add('Ordinary_Drink')

    if (cocktail == true)
        categories.add('cocktail')

    if (beer == true)
        categories.add('beer')
    getData(categories)
}

function displayCocktail(data) {
    cocktail = data.drinks;

    //console.log(cocktail);
    const cocktailDiv = document.getElementById('display');

    for (let i of cocktail) {

        // console.log(i);
        const newDiv = document.createElement('div'); // CREATED NEW DIV TAG
        const cocktailImage = document.createElement('img'); // CREATED NEW IMG TAG WITH CLASSNAME 
        const cocktailSpan = document.createElement('h1'); // CREATED NEW H1 TAG FOR CAPTION

        newDiv.className = 'imgDiv';
        cocktailImage.src = i['strDrinkThumb'];
        newDiv.appendChild(cocktailImage);

        const cocktailName = i['strDrink'];
        cocktailSpan.innerHTML = cocktailName;
        newDiv.appendChild(cocktailSpan);
        cocktailDiv.appendChild(newDiv);
    }
}