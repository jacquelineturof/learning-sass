const createDefinitionList = (resultsArray) => {
    const definitionArray = [];

    resultsArray.forEach(result => {
        definitionArray.push(result.definition);
    });

    return definitionArray;
};

module.exports = createDefinitionList;