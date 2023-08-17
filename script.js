// Getting input and match List
const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');

// Search States Function
const searchStates = async () => {
    let searchText = search.value.trim();
    if (searchText === '') {
        matchList.innerHTML = '';
        return;
    }
    const res = await fetch('/data.json');
    const states = await res.json();

    const matches = states.filter((state) => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbreviation.match(regex) || state.capital.match(regex); 
    });
    
    outputStates(matches);
}

// Show restults in HTML
const outputStates = matches =>  {
    if (matches.length > 0) {
        const markup = matches.map((match) => {
            return `
                <div class="card card-body mt-3 bg-dark text-white">
                    <h3>${match.name} ${match.abbreviation}</h3>
                    <span class="text-primary">${match.capital}</span>
                </div>
            `
        }).join('');
        matchList.innerHTML = markup;
    }
}

// Event Listener on Search
search.addEventListener('input', searchStates);