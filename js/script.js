// Renamed function and removed modStatus logic
function filterGames() { // Renamed from filterByPlatformCategoryAndType
    var platformFilterValue = document.getElementById("platform").value;
    var gameCategoryFilterValue = document.getElementById("game-category").value;
    var gameTypeFilterValue = document.getElementById("game-type").value;
    // var modStatusFilterValue = document.getElementById("mod-status").value; // REMOVED
    var searchTerm = document.getElementById("search-input").value.toLowerCase();

    var gameBoxes = document.querySelectorAll(".game-box");

    for (var i = 0; i < gameBoxes.length; i++) {
        var box = gameBoxes[i];
        var platform = box.getAttribute("data-platform");
        var category = box.getAttribute("data-category");
        var type = box.getAttribute("data-type");
        // var modStatus = box.getAttribute("data-modded"); // REMOVED (data-modded attribute should also be removed from HTML game boxes)
        var title = ""; // Initialize title
        var titleElement = box.querySelector("h3"); // Get the h3 element
        if (titleElement) { // Check if h3 element exists
            title = titleElement.textContent.toLowerCase();
        }


        var platformMatch = platformFilterValue === "all" || platform === platformFilterValue;
        var categoryMatch = gameCategoryFilterValue === "all" || category === gameCategoryFilterValue;
        var typeMatch = gameTypeFilterValue === "all" || type === gameTypeFilterValue;
        // var modMatch = modStatusFilterValue === "all" || modStatus === modStatusFilterValue; // REMOVED
        var searchMatch = searchTerm === "" || title.indexOf(searchTerm) > -1; // Handle empty search term

        // Updated condition to exclude modMatch
        if (platformMatch && categoryMatch && typeMatch && searchMatch) {
            box.style.display = "inline-block"; // Or "block" if you prefer, inline-block for our current CSS
        } else {
            box.style.display = "none";
        }
    }
}

// searchGames function now calls the renamed filterGames
function searchGames(event) {
    if (event) { // Check if event is passed (it won't be on initial load)
        event.preventDefault();
    }
    filterGames();
}

document.addEventListener("DOMContentLoaded", function() {
    // Initial filter application on page load
    filterGames(); // Call the renamed function

    // Select only the existing filters
    var filters = document.querySelectorAll("#platform, #game-category, #game-type");
    for (var i = 0; i < filters.length; i++) {
        filters[i].addEventListener("change", filterGames); // Attach to renamed function
    }

    var searchForm = document.getElementById("search-form");
    if (searchForm) { // Check if search form exists on the page
        searchForm.addEventListener("submit", searchGames); // searchGames already calls filterGames
    }

    // Also filter when typing in the search input (live search)
    var searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            // No event.preventDefault() needed for 'input' event
            filterGames();
        });
    }
});