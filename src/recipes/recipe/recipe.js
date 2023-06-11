import { Modal } from 'bootstrap';
import recipeHTML from './recipe.html';
import { callAPI } from '../../shared/api-service';

export const renderRecipe = (data, parent, materials, units) => {
	const recipeComponent = document.createElement('section');

	recipeComponent.id = `recipe-${data.id}`;
	recipeComponent.innerHTML = recipeHTML;

	parent.appendChild(recipeComponent);

	const recipeTitleElement = document.getElementById('recipe-name'),
		recipeDataElement = document.getElementById('recipe-data'),
		editModalIcon = document.getElementById('edit-recipe'),
		removeModalIcon = document.getElementById('remove-recipe');
	// rawMaterialSelectionElement = document.getElementById('edit-raw-materials-selection'),
	// quantityElement = document.getElementById('edit-quantity'),
	// unitElementSelection = document.getElementById('edit-unit-selection');

	// rawMaterialSelectionElement.id = `edit-raw-materials-selection-${data.id}`;
	// unitElementSelection.id = `edit-unit-selection-${data.id}`;
	// quantityElement.id = `edit-quantity-${data.id}`;

	// while (rawMaterialSelectionElement.firstChild) {
	// 	rawMaterialSelectionElement.removeChild(rawMaterialSelectionElement.lastChild);
	// }
	// while (unitElementSelection.firstChild) {
	// 	unitElementSelection.removeChild(unitElementSelection.lastChild);
	// }

	// materials.forEach((material) => {
	// 	const option = document.createElement('option');

	// 	option.value = material._id
	// 	option.innerText = material.name;
	// 	option.id = material._id
	// 	rawMaterialSelectionElement.appendChild(option);
	// });
	// units.forEach((unit) => {
	// 	const unitElement = document.createElement('option');

	// 	unitElement.value = unit;
	// 	unitElement.innerText = unit;
	// 	unitElement.id = unit;
	// 	unitElementSelection.appendChild(unitElement);
	// })

	editModalIcon.id = `edit-recipe-${data.id}`;
	removeModalIcon.id = `remove-recipe-${data.id}`;
	recipeTitleElement.id = `recipe-name-${data.id}`;
	recipeTitleElement.innerHTML = data.rawMaterialName;
	recipeDataElement.id = `recipe-name-${data.id}`;
	recipeDataElement.innerText = `${data.quantity} ${data.unit}`;

	// rawMaterialSelectionElement.value = materials.find((material) => material.name === data.rawMaterialName)._id;
	// quantityElement.value = data.quantity;
	// unitElementSelection.value = data.unit;

	// const editRecipeModal = new Modal(document.getElementById('edit-recipe-modal'));
	// const deleteRecipeModal = new Modal(document.getElementById('remove-recipe-modal'));

	// const editRecipeForm = document.getElementById('edit-form-recipe');

	// editRecipeForm.addEventListener('submit', handleSubmit);

	// function handleSubmit(event) {
	// 	event.preventDefault();

	// 	const formData = new FormData(editRecipeForm),
	// 		rawMaterialIdData = formData.get('edit-raw-materials-selection'),
	// 		quantityData = formData.get('edit-quantity'),
	// 		unitData = formData.get('edit-unit-selection'),
	// 		body = {
	// 			id: data.id,
	// 			rawMaterialId: rawMaterialIdData,
	// 			quantity: quantityData,
	// 			unit: unitData
	// 		};

	// 	callAPI('recipes', 'PUT', body).then(() => {
	// 		editRecipeModal.hide();
	// 		getRecipes();
	// 	});
	// };

	// document.getElementById('remove-recipe-button').addEventListener('click', () => {
	// 	callAPI('recipes/', 'DELETE', { id: data.id }).then(() => {
	// 		deleteRecipeModal.hide();
	// 		getRecipes();
	// 	})
	// });

	// function getRecipes() {
	// 	const recipesListElement = document.getElementById('recipes-list');

	// 	callAPI('recipes').then((recipes) => {
	// 		while (recipesListElement.firstChild) {
	// 			recipesListElement.removeChild(recipesListElement.lastChild);
	// 		}

	// 		if (recipes.length === 0) {
	// 			recipesListElement.innerHTML = 'No recipes exists at the moment.';
	// 			recipesListElement.className = ''
	// 		} else {
	// 			recipes.sort((recipeA, recipeB) => {
	// 				if (recipeA.rawMaterialName.toLowerCase() < recipeB.rawMaterialName.toLowerCase()) {
	// 					return -1;
	// 				}

	// 				if (recipeA.rawMaterialName.toLowerCase() > recipeB.rawMaterialName.toLowerCase()) {
	// 					return 1;
	// 				}

	// 				return 0
	// 			}).forEach((recipe) => {
	// 				renderRecipe(recipe, document.getElementById('recipes-list'), materials, units);
	// 			})
	// 		}
	// 	}).catch((error) => {
	// 		console.log(error);
	// 		recipesListElement.innerHTML = 'An issue with the API has occurred.';
	// 	});
	// }
};
