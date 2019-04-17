const formButton = document.querySelector('.btn-form');
const input = document.querySelector('.input');

$( document ).ready(function() {
    const container = document.createElement('div');
    container.classList.add('results');
    $( 'body' ).append(container);

    // create row where results will be added
    const div = document.createElement('div');
    div.classList.add('row');
    $( '.results' ).append(div);

    // Add click listener to form button
    formButton.addEventListener("click", async (e) => {
        e.preventDefault();
        // Get word
        const searchTerm = input.value;
        // Get data types to look up e.g. definition, antonym
        const dataTypes = getRequestedDataTypes();
        
        // Remove header from DOM
        $( '.header' ).remove();

        // Make Ajax call for each dataType selected
        dataTypes.forEach(async dataType => {
            const resultList = await $.get('http://localhost:3000/' + dataType + '/' + searchTerm);
            generateResultDiv(resultList); // display results
        });
    });
});

const generateResultDiv = (resultList) => {
    console.log(resultList);

    // create result list
    const div = document.createElement('div');
    div.classList.add('col-1-of-2');
    $( '.row' ).append(div);

    const ul = document.createElement('ul');
    ul.classList.add('result__list');
    $( div ).append(ul);
    generateResultList(resultList);
};

const generateResultList = (resultList) => {
    resultList.forEach(word => {
        const li = document.createElement('li');
        
        // Need to check what our data looks like
        // the words api sets it up slightly differently for
        // definitions
        li.innerText = word.definition ? word.defintion : word;
        $( 'ul' ).append(li);
        li.classList.add('result__list__item');
    });
};

const getRequestedDataTypes = () => {
    const requestedDataTypes = [];

    const definition = document.querySelector('#definition');
    const synonym = document.querySelector('#synonym');
    const antonym = document.querySelector('#antonym');
    const rhyme = document.querySelector('#rhyme');
    
    if (definition.checked) requestedDataTypes.push('definitions');
    if (synonym.checked) requestedDataTypes.push('synonyms');
    if (antonym.checked) requestedDataTypes.push('antonyms');
    if (rhyme.checked) requestedDataTypes.push('rhymes');

    return requestedDataTypes;

};