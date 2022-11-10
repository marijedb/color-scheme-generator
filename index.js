const modes = ["Monochrome", "Monochrome-dark", "Monochrome-light", "Analogic", "Complement", "Analogic-complement", "Triad", "Quad"]

document.getElementById('button').addEventListener('click', function (e) {
    e.preventDefault()

    const hex = document.getElementById('color-picker').value
    // This will remove the # in hex value so it can be used in fetch method:
    const cleanHex = hex.substring(1, hex.length)
    //This selects the selected mode to use in fetch method: 
    const mode = document.getElementById('mode-selector').value.toLowerCase()

    fetch(`https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=${mode}&count=4`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('color-scheme').innerHTML = getColorsHtml(data)
            renderColors(data)
        })

})

function getColorsHtml(data) {
    // This function is responsible for creating the HTML used to render it to the page. 
    let colorHtml = ``
    for (let i = 0; i < data.colors.length; i++) {
        colorHtml += `
        <div class="color-wrapper">
            <div id="color${i + 1}" class="color color${i + 1}"></div>
            <div class="hex-value">${data.colors[i].hex.value}</div>
        </div>`
    }

    return `
    <div class="color-wrapper">
            <div id="seed-color" class="color seed-color"></div>
            <div class="hex-value">${data.seed.hex.value}</div>
        </div>
        ${colorHtml}`
}

function renderColors(data) {
    // This function is responsible for updating the colors to the page
    document.getElementById('seed-color').style.backgroundColor = `${data.seed.hex.value}`
    for (let i = 0; i < data.colors.length; i++) {
        document.getElementById(`color${i + 1}`).style.backgroundColor = `${data.colors[i].hex.value}`
    }
}

// The render function is used to render out the page on first load
function render() {
    let modeHtml = ``
    for (let mode of modes) {
        modeHtml += `<option value="${mode}">${mode}</option>`
    }
    document.getElementById('mode-selector').innerHTML = modeHtml
}

render()