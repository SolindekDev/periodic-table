const periodicTableElements = document.querySelectorAll(".periodic-table-element");
const elementNamesMap       = {};

periodicTableElements.forEach(async (element) => {
    const element_info = await (await fetch(`/api/1v/elements/symbol/${element.innerHTML}`)).json();
    elementNamesMap[`${element_info.element.name.toLowerCase()}`] = element.innerHTML.toLowerCase();
})

const input = document.querySelector(".search-element-input");
input.addEventListener("input", () => {
    periodicTableElements.forEach(element => {
        element.classList.remove("search-active")
    })

    periodicTableElements.forEach(element => {
        if (input.value.toLowerCase() == element.innerHTML.toLowerCase()) 
            element.classList.add("search-active");
    })

    const element_name = elementNamesMap[`${input.value.toLowerCase()}`];
    if (element_name != undefined)
    {
        periodicTableElements.forEach(element => {
            if (element_name == element.innerHTML.toLowerCase()) 
                element.classList.add("search-active");
        })
    }
})

function kelvinToCelcius(kelvin)
{
    return (kelvin - 273.15).toFixed(2).toString();
}

function undefinedOrNullInfoTemperature(temp)
{
    return ((temp == null) || (temp == undefined)) ? "Unknown" : `${temp}K (${kelvinToCelcius(temp)}°C)`;
}

function undefinedOrNullInfo(info)
{
    return ((info == null) || (info == undefined)) ? "Unknown" : info;
}

function undefinedOrNullInfoNumber(info, unit)
{
    return ((info == null) || (info == undefined)) ? "Unknown" : info + unit;
}

function showElementInfo(html_element)
{
    const element_symbol = html_element.target.innerHTML;

    console.log(undefinedOrNullInfoTemperature(350));
    fetch(`/api/1v/elements/symbol/${element_symbol}`)
        .then(res => res.json())
        .then(json => {
            if (json.success == 1)
                return;

            const element = json.element;
            document.querySelector(".element-symbol").innerHTML = element.symbol;
            document.querySelector(".element-name").innerHTML   = element.name;
        
            const element_color_info = document.getElementById("element-color-info");
            element_color_info.classList.remove("periodic-table-nonmetals")
            element_color_info.classList.remove("periodic-table-metals")
            element_color_info.classList.remove("periodic-table-metaloidy")
            element_color_info.classList.remove("periodic-table-noble-gases")
            element_color_info.classList.remove("periodic-table-lanthanides")
            element_color_info.classList.remove("periodic-table-actinides")
            element_color_info.classList.add(html_element.srcElement.classList[1])

            document.getElementById("atomic-number").innerText = undefinedOrNullInfo(element.number);
            document.getElementById("atomic-mass").innerText = undefinedOrNullInfoNumber(element.atomic_mass, "u");
            document.getElementById("boiling-point").innerText = undefinedOrNullInfoTemperature(element.boil);
            document.getElementById("melting-point").innerText = undefinedOrNullInfoTemperature(element.melt);
            document.getElementById("electronegativity-pauling").innerText = undefinedOrNullInfoNumber(element.electronegativity_pauling, "");
            document.getElementById("apperance").innerText = undefinedOrNullInfo(element.appearance);
            document.getElementById("density").innerText = undefinedOrNullInfoNumber(element.density, "");
            document.getElementById("discovered-by").innerText = undefinedOrNullInfo(element.discovered_by);
            document.getElementById("named-by").innerText = undefinedOrNullInfo(element.named_by);
            document.getElementById("electron-configuration").innerText = undefinedOrNullInfo(element.electron_configuration);
        })

}

periodicTableElements.forEach(element => element.addEventListener('click', showElementInfo));