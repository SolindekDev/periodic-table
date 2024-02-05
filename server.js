'use strict'; 
  
const express  = require('express');
const helmet   = require('helmet');
const app      = express();

const { elements } = require("./elements.json");

app.use(express.static('public'));
app.use(helmet());

app.get('/api/1v/elements/symbol/:ELEMENT_SYMBOL', (req, res) => {
    const { ELEMENT_SYMBOL } = req.params;

    var find_element = undefined;
    for (const element_index in elements) {
        const element = elements.at(element_index);
        if (element.symbol == undefined)
            continue;

        if (element.symbol.toLowerCase() == ELEMENT_SYMBOL.toLowerCase())
        {
            find_element = element;
            break;
        }
    }

    if (find_element == undefined)
        res.json({ api_version: 1.0, success: 1, element: { } });
    else
        res.json({ api_version: 1.0, success: 0, element: find_element });
});

app.get('/', (req, res) => { 
    res.set({ "Access-Control-Allow-Origin": "*" }); 
    res.sendFile("./public/index.html"); 
}); 
  
app.listen(3000, () => console.log("Listening on 3000 port.")); 