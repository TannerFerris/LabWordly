
document.getElementById('searchButton').addEventListener('click', function() {
    const wordInput = document.getElementById('searchInput').value;

    if(document.getElementById('wordInfoContainer').children.length === 0) {
        fetchDictionary(wordInput)
    }else {
        document.getElementById('wordInfoContainer').replaceChildren();
        fetchDictionary(wordInput)
    }

});

function fetchDictionary (word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
         displayDefinitions(data);
         console.log(data);
     })
    .catch(error => displayError(error));
}


function displayDefinitions(data) {
    const displayMain = document.getElementById('wordInfoContainer');
    displayMain.className = 'displayMain';

    const displayContainer = document.createElement('div');
    displayContainer.className = 'displayContainer';

    const displayWord = document.createElement('h2');
    displayWord.className = 'word';
    displayWord.textContent = "Word: " + data[0].word;

    displayMain.append(displayWord);


    /*Display Definitions*/ 

    const displayDefinitions = document.createElement('div');
    displayDefinitions.className = 'definitionsMain';
    displayDefinitions.textContent = "Definitions: ";

    
    data[0].meanings.forEach(definition => {

        definition.definitions.forEach(definition2 => {
        const definitionContainer = document.createElement('div');
        definitionContainer.className = 'definitionContainer';

        definitionContainer.textContent = definition2.definition;
        displayDefinitions.appendChild(definitionContainer);
        });
    })


    /*Display Synonyms*/ 
    
    const displaySynonyms = document.createElement('div');
    displaySynonyms.className = 'synonymsMain';
    displaySynonyms.textContent = "Synonyms: ";

    
    data[0].meanings.forEach(synonym => {

        synonym.synonyms.forEach(synonym2 => {
        const synonymContainer = document.createElement('div');
        synonymContainer.className = 'synonymContainer';

        synonymContainer.textContent = synonym2;
        displaySynonyms.appendChild(synonymContainer);
        });
    })

    const displayInfoContainer = document.createElement('div');
    displayInfoContainer.className = 'displayInfoContainer';
    
    displayContainer.append(displayDefinitions, displaySynonyms);
    displayInfoContainer.append(displayContainer);
    console.log(displayInfoContainer);
    displayMain.append(displayInfoContainer);
}


function displayError(error) {
    const displayMain = document.getElementById('wordInfoContainer');
    const displayError = document.createElement('h2');
    displayError.className = 'error';

    if(error.message === "Cannot read properties of undefined (reading 'word')"){
        displayError.textContent = "Invalid Word"
    }else {
        displayError.textContent = "An Error Occurred: " + error.message;
    }


    displayMain.append(displayError);
}