const SearchBox = document.querySelector(".SearchBox");
const SearchBtn = document.querySelector(".SearchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeDetailsContent = document.querySelector(".recipe-details-content");

const fetchRecipes = async(inputData)=>{
  recipeContainer.innerHTML = "<h2>Fetching recipes...</h2>"
  const Output = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`)
  const response =await Output.json();
  recipeContainer.innerHTML = ""
  response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <h3>Belongs to <span>${meal.strCategory}</span> Category</h3>
    `
    const button = document.createElement('button');
    button.textContent = "View Recipe"
    recipeDiv.appendChild(button);

    button.addEventListener('click',(e)=>{
      e.preventDefault();
      openRecipePopup(meal);

    })

    recipeContainer.appendChild(recipeDiv);
    
  });
}
//function to fetch ingredient and measurements
const fetchIngredient = (meal)=>{
  let ingredientList = "";
  for(let i=1; i<=20;i++){
    const Ingredient = meal[`strIngredient${i}`];
    if(Ingredient){
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure} ${Ingredient}</li>`
    }
    else{
      break;
    }
  }
  return ingredientList;
};
const openRecipePopup = (meal) =>{
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredients: </h3> 
  <ul class= "ingredientList"> ${fetchIngredient(meal)}</ul>
  <div>
  <h3>Instructions:</h3>
  <p class="recipeInstructions">${meal.strInstructions}</p>
</div>
  `
  
  recipeDetailsContent.parentElement.style.display = "block"

}
recipeCloseBtn.addEventListener('click',(e)=>{
  recipeDetailsContent.parentElement.style.display = "none";
})
SearchBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const SearchInput = SearchBox.value.trim();
  fetchRecipes(SearchInput);
})
