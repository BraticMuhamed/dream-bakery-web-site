export const renderComponent = (componentHTML, componentId) => {
	const component = document.createElement('section');

	component.id = componentId;
	component.innerHTML = componentHTML;
	document.body.appendChild(component);
};
