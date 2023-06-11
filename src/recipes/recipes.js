import recipesHTML from './recipes.html';
import { renderComponent } from '../shared/utils';
import { renderRecipe } from './recipe/recipe';
import { Modal } from 'bootstrap';
import { callAPI } from '../shared/api-service';

renderComponent(recipesHTML, 'recipes');

const unitOptions = ['Miligram', 'Gram', 'Kilogram', 'Mililiter', 'Deciliter', 'Liter'];
const deleteRecipeModal = new Modal(document.getElementById('remove-recipe-modal'));
const recipeModal = new Modal(document.getElementById('recipe-modal'));
const recipeForm = document.getElementById('form-recipe');
let materials = [];
let recipeId = '';

unitOptions.forEach((unit) => {
	const unitElement = document.createElement('option');

	unitElement.value = unit;
	unitElement.innerText = unit;
	unitElement.id = unit;
	document.getElementById('unit-selection').appendChild(unitElement);
})

function getRecipes() {
	const recipesListElement = document.getElementById('recipes-list');

	callAPI('recipes').then((recipes) => {
		while (recipesListElement.firstChild) {
			recipesListElement.removeChild(recipesListElement.lastChild);
		}

		if (recipes.length === 0) {
			recipesListElement.innerHTML = 'No recipes exists at the moment.';
			recipesListElement.className = ''
		} else {
			recipes.sort((recipeA, recipeB) => {
				if (recipeA.rawMaterialName.toLowerCase() < recipeB.rawMaterialName.toLowerCase()) {
					return -1;
				}

				if (recipeA.rawMaterialName.toLowerCase() > recipeB.rawMaterialName.toLowerCase()) {
					return 1;
				}

				return 0
			}).forEach((recipe) => {
				renderRecipe(recipe, document.getElementById('recipes-list'), materials, unitOptions);

				document.getElementById(`remove-recipe-${recipe.id}`).addEventListener('click', () => {
					recipeId = recipe.id;
				});
				document.getElementById(`edit-recipe-${recipe.id}`).addEventListener('click', () => {
					document.getElementById('raw-materials-selection').value = materials.find((material) => material.name === recipe.rawMaterialName)._id;
					document.getElementById('quantity').value = recipe.quantity;
					document.getElementById('unit-selection').value = recipe.unit;
				});
			});
		}
	}).catch(() => {
		recipesListElement.innerHTML = 'An issue with the API has occurred.';
	});
}


callAPI('raw-materials').then((rawMaterials) => {
	const rawMaterialSelection = document.getElementById('raw-materials-selection');

	rawMaterials.forEach((material) => {
		const option = document.createElement('option');

		option.value = material._id
		option.innerText = material.name;
		option.id = material._id
		rawMaterialSelection.appendChild(option);
	});
	materials = rawMaterials.map((rawMaterial) => rawMaterial);
	getRecipes();
});

recipeForm.addEventListener('submit', handleSubmit);
document.getElementById('recipe-modal').addEventListener('hide.bs.modal', () => {
	document.getElementById('raw-materials-selection').value = '';
	document.getElementById('quantity').value = '';
	document.getElementById('unit-selection').value = '';
})

function handleSubmit(event) {
	event.preventDefault();

	const formData = new FormData(recipeForm),
		rawMaterialIdData = formData.get('raw-materials-selection'),
		quantityData = formData.get('quantity'),
		unitData = formData.get('unit-selection'),
		body = {
			rawMaterialId: rawMaterialIdData,
			quantity: quantityData,
			unit: unitData
		};

	callAPI('recipes', 'POST', body).then(() => {
		recipeModal.hide();
		getRecipes();
	});
};

document.getElementById('remove-recipe-button').addEventListener('click', () => {
	callAPI('recipes/', 'DELETE', { id: recipeId }).then(() => {
		deleteRecipeModal.hide();
		getRecipes();
	})
});

document.getElementById('change-theme').addEventListener('click', () => {
	if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
		document.documentElement.setAttribute('data-bs-theme', 'light')
	}
	else {
		document.documentElement.setAttribute('data-bs-theme', 'dark')
	}
})
