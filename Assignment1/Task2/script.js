let countries = [];

function addCountry() {
    const countryInput = document.getElementById('countryInput').value;
    if (!countryInput) return; // If input is empty, exit the function

    // Fetch population data using the provided example
    fetch(`https://d6wn6bmjj722w.population.io/1.0/population/${countryInput}/today-and-tomorrow/`, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const populationToday = data.total_population[0].population;
        countries.push({ name: countryInput, population: populationToday });
        displayCountries();
        document.getElementById('countryInput').value = '';
    })
    .catch(error => {
        console.error("Error fetching population data:", error);
        alert("Unable to fetch population data for the given country.");
    });
}

function searchCountries() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    displayCountries(searchInput);
}

function displayCountries(filter = "") {
    const countryList = document.getElementById('countryList');
    countryList.innerHTML = ''; // Clear the list

    countries
        .filter(country => country.name.toLowerCase().startsWith(filter))
        .forEach(country => {
            const li = document.createElement('li');
            li.textContent = `${country.name} - Population: ${country.population}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                countries = countries.filter(c => c.name !== country.name);
                displayCountries(filter);
            };
            li.appendChild(deleteButton);

            countryList.appendChild(li);
        });
}

// Optional: Update population every second
setInterval(() => {
    // Logic to update population (for simplicity, I'm assuming a fixed growth rate)
    countries = countries.map(country => {
        country.population += 1; // Increment by 1 for demonstration
        return country;
    });
    displayCountries(document.getElementById('searchInput').value.toLowerCase());
}, 1000);
