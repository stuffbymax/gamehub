function filterGames() {
    // Get filter values
    var platformFilterValue = document.getElementById("platform") ? document.getElementById("platform").value : "all";
    var gameCategoryFilterValue = document.getElementById("game-category") ? document.getElementById("game-category").value : "all";
    var gameTypeFilterValue = document.getElementById("game-type") ? document.getElementById("game-type").value : "all";
    var multiplayerFilterValue = document.getElementById("multiplayer-status") ? document.getElementById("multiplayer-status").value : "all";
    var releaseYearFilterValue = document.getElementById("release-year") ? document.getElementById("release-year").value : "all";

    var searchTerm = "";
    var searchInputElement = document.getElementById("search-input");
    if (searchInputElement) {
        searchTerm = searchInputElement.value.toLowerCase();
    }

    var gameBoxes = document.querySelectorAll(".game-box");

    for (var i = 0; i < gameBoxes.length; i++) {
        var box = gameBoxes[i];

        // Get game data attributes
        var platform = box.getAttribute("data-platform") || "all";
        var category = box.getAttribute("data-category") || "all";
        var type = box.getAttribute("data-type") || "all";
        var developer = (box.getAttribute("data-developer") || "").toLowerCase();
        var publisher = (box.getAttribute("data-publisher") || "").toLowerCase();
        var releaseYear = box.getAttribute("data-release") || "0"; // Default to 0 if not present
        var multiplayer = box.getAttribute("data-multiplayer") || "all";

        var title = "";
        var titleElement = box.querySelector("h3");
        if (titleElement) {
            title = titleElement.textContent.toLowerCase();
        }

        // --- Filter Matches ---
        var platformMatch = platformFilterValue === "all" || platform === platformFilterValue;
        var categoryMatch = gameCategoryFilterValue === "all" || category === gameCategoryFilterValue;
        var typeMatch = gameTypeFilterValue === "all" || type === gameTypeFilterValue;

        var multiplayerMatch = true; // Default to true if filter doesn't exist or is 'all'
        if (document.getElementById("multiplayer-status")) { // Check if filter exists
             multiplayerMatch = multiplayerFilterValue === "all" || multiplayer === multiplayerFilterValue;
            if (multiplayerFilterValue === "local" && (multiplayer === "both" || multiplayer === "local")) multiplayerMatch = true;
            if (multiplayerFilterValue === "online" && (multiplayer === "both" || multiplayer === "online")) multiplayerMatch = true;
            if (multiplayerFilterValue === "none" && multiplayer === "none") multiplayerMatch = true;
             else if (multiplayerFilterValue !== "all" && multiplayer !== multiplayerFilterValue && !( (multiplayerFilterValue === "local" && multiplayer === "both") || (multiplayerFilterValue === "online" && multiplayer === "both") )) {
                multiplayerMatch = false; // More precise exclusion if filter is active but doesn't match directly or via 'both'
            }
        }


		var releaseYearMatch = true;
		if (document.getElementById("release-year")) {
			if (releaseYearFilterValue === "this-year") {
			var currentYear = new Date().getFullYear();
			releaseYearMatch = parseInt(releaseYear) === currentYear;
    } else {
        releaseYearMatch = releaseYearFilterValue === "all" || (releaseYear && parseInt(releaseYear) === parseInt(releaseYearFilterValue));
    }
}


        var searchMatch = searchTerm === "" ||
                          title.indexOf(searchTerm) > -1 ||
                          developer.indexOf(searchTerm) > -1 ||
                          publisher.indexOf(searchTerm) > -1;

        // Combine all matches
        if (platformMatch && categoryMatch && typeMatch && multiplayerMatch && releaseYearMatch && searchMatch) {
            box.style.display = "inline-block"; // Matches CSS for .game-box
        } else {
            box.style.display = "none";
        }
    }
}

// searchGames function calls filterGames
function searchGames(event) {
    if (event) {
        event.preventDefault(); // Prevent form submission if called by event
    }
    filterGames();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    // Initial filter application on page load
    // Check if we are on a page that actually has filters and game boxes
    if (document.querySelector(".filters-wrapper") && document.querySelector(".game-boxes")) {
        filterGames();

        var filterElements = document.querySelectorAll("#platform, #game-category, #game-type, #multiplayer-status, #release-year");
        for (var i = 0; i < filterElements.length; i++) {
            if (filterElements[i]) { // Check if element actually exists
                filterElements[i].addEventListener("change", filterGames);
            }
        }

        var searchForm = document.getElementById("search-form");
        if (searchForm) {
            searchForm.addEventListener("submit", searchGames);
        }

        var searchInput = document.getElementById("search-input");
        if (searchInput) {
            searchInput.addEventListener("input", function() { // Live search
                filterGames();
            });
        }
    }
});
