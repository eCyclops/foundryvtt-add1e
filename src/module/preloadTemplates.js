export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
        //Character Sheets
        'systems/add1e/templates/actors/character-sheet.html',
        'systems/add1e/templates/actors/monster-sheet.html',
        //Actor partials
        //Sheet tabs
        'systems/add1e/templates/actors/partials/character-header.html',
        'systems/add1e/templates/actors/partials/character-attributes-tab.html',
        'systems/add1e/templates/actors/partials/character-abilities-tab.html',
        'systems/add1e/templates/actors/partials/character-spells-tab.html',
        'systems/add1e/templates/actors/partials/character-inventory-tab.html',
        'systems/add1e/templates/actors/partials/character-notes-tab.html',

        'systems/add1e/templates/actors/partials/monster-header.html',
        'systems/add1e/templates/actors/partials/monster-attributes-tab.html'
    ];
    return loadTemplates(templatePaths);
};
