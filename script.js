document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-list a');
    const recipeCards = document.querySelectorAll('.recipe-card');
    const searchInput = document.getElementById('recipe-search');

    // --- Category Filtering ---

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior (page jump)

            // Get the category from the data attribute
            const selectedCategory = event.target.dataset.category;

            // Remove 'active' class from all links
            categoryLinks.forEach(navLink => navLink.classList.remove('active'));
            // Add 'active' class to the clicked link
            event.target.classList.add('active');

            // Clear search input when a category is selected
            searchInput.value = '';

            // Loop through all recipe cards
            recipeCards.forEach(card => {
                const cardCategory = card.dataset.category;

                // Show the card if 'all' is selected or if the category matches
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block'; // Or 'grid', 'flex' depending on your CSS display
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });

    // --- Search Functionality ---

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        // Deactivate all category links when searching
        categoryLinks.forEach(navLink => navLink.classList.remove('active'));
        // Optional: Activate 'All Recipes' link visually when searching
        document.querySelector('.category-list a[data-category="all"]').classList.add('active');


        recipeCards.forEach(card => {
            const cardTitle = card.dataset.title.toLowerCase();
            // You could add other data attributes to search, e.g., data-ingredients or data-description
            const cardDescription = card.querySelector('.recipe-card-short-description')?.textContent.toLowerCase() || ''; // Optional description search

            // Check if the title or description includes the search term
            if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
                 card.style.display = 'block'; // Or 'grid', 'flex'
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
         // If search is cleared, reset to show all recipes
         if (searchTerm === '') {
             // Simulate clicking the 'All Recipes' link to reset the view
             document.querySelector('.category-list a[data-category="all"]').click();
         }
    });

    // Optional: Trigger 'All Recipes' filter on initial load
    document.querySelector('.category-list a[data-category="all"]').click();

});