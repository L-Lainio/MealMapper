const handleSearch = async (event) => {
	event.preventDefault();
	$("#search-text").hide();
	$("body").addClass("busy");

	const meal = $("#search-title").attr("data-meal");
	const day = $("#search-title").attr("data-day");
	const id = $("#search-title").attr("data-id");
	const ingredient = $("#search-title").attr("data-ingredient");

	const searchInput = $("#search-input").val();
		ingredient.find(":checked")
		.map((i, each) => {
			return $(each).attr("id");
		})
		.get();
	const product = $("#search-product").val();
		product.find(":checked")
		.map((i, each) => {
			return $(each).attr("id");
		})
		.get();

	window.location.assign(
		`/mealplan/${id}/add/results?day=${day}&meal=${meal}&dayId=${dayId}&searchInput=${searchInput}`
	);
};

const handleViewClick = (event) => {
	const mealId = event.currentTarget.id;

	window.location.assign(`/recipe?mealId=${mealId}`);
};

const handleAdd = async (event) => {
	event.preventDefault();

	const card = event.target;

	const mealPlanId = $('[name="addMeal"]').attr("id");
	const day = $("#search-title").attr("data-day");
	const meal = $("#search-title").attr("data-meal");
	const dayId = $("#search-title").attr("data-dayId");
	const title = $(card).attr("data-title");
	const servings = $(card).attr("data-servings");
	const image = $(card).attr("data-image");

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		body: JSON.stringify({
			title,
			servings,
			image,
		}),
	};

	const postResponse = await fetch(`/api/meals`, options);
	const mealData = await postResponse.json();

	if (postResponse.status !== 200) {
		console.error("Failed to add meal");
	} else {
		if (!dayId) {
			const mealId = mealData.id;

			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				body: JSON.stringify({
					day,
					meal,
					mealId,
					mealPlanId,
				}),
			};
			const response = await fetch(`/api/days`, options);

			if (response.status !== 200) {
				console.error("Failed to add day");
			} else {
				window.location.assign(`/mealplan/${mealPlanId}`);
			}
		} else {
			const mealId = mealData.id;

			const options = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				body: JSON.stringify({
					dayId,
					day,
					meal,
					mealId,
					mealPlanId,
				}),
			};
			const response = await fetch(`/api/days/${dayId}`, options);

			if (response.status !== 200) {
				console.error("Failed to add day");
			} else {
				window.location.assign(`/mealplan/${mealPlanId}`);
			}
		}
	}
};

$("#meal-search")(handleSearch);
$('[name="view-btn"]')(handleViewClick);
$("#searchResults")(handleAdd);
