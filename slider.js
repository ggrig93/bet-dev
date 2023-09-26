const dynamicDataContainer = document.getElementById('slider');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let imagesData = [];
let currentIndexes = [0, 1, 2, 3];

function nextSlideArr() {
    currentIndexes = currentIndexes.splice(2)
    let lastEl = currentIndexes[currentIndexes.length - 1];
    currentIndexes.push((lastEl + 1) % imagesData.length, (lastEl + 2) % imagesData.length)
    showData(currentIndexes);
}

function prevSlideArr() {
    let firstEl = currentIndexes[0];

    if (firstEl === 1) {
        currentIndexes.splice(currentIndexes.length - 1, 1);
        currentIndexes.unshift((firstEl - 1) % imagesData.length)
        showData(currentIndexes);
    } else if (firstEl !== 0) {
        currentIndexes.splice(currentIndexes.length - 2, 2);
        currentIndexes.unshift((firstEl - 2) % imagesData.length, (firstEl - 1) % imagesData.length)
        showData(currentIndexes);
    }

}

nextButton.addEventListener('click', nextSlideArr);
prevButton.addEventListener('click', prevSlideArr);

window.addEventListener('load', fileGetContents);

let data = []

function fileGetContents() {
    let uri = 'data.json'
    fetch(uri).then(res => res.text()).then(text => {
        data = JSON.parse(text)
        imagesData = data;
        showData(data.slice(0, 4))
    })
}

function showData(data) {
    dynamicDataContainer.innerHTML = ''
    data.forEach(item => {
        if (typeof (item) === 'number') {
            item = imagesData[item];
        }
        if (item) {
            const dataContainer = document.createElement('div');
            const dataItem = document.createElement('div');
            const name = document.createElement('h1');
            const age = document.createElement('h2');
            const gender = document.createElement('h2');
            const profession = document.createElement('h3');
            dataContainer.className = 'slide';
            dataItem.className = 'slide-container';
            name.textContent = item.name;
            age.textContent = item.age;
            gender.textContent = item.gender;
            profession.textContent = item.profession;
            dataItem.appendChild(name);
            dataItem.appendChild(age);
            dataItem.appendChild(gender);
            dataItem.appendChild(profession);
            dataContainer.appendChild(dataItem);
            dynamicDataContainer.appendChild(dataContainer);
        }
    });
}


function filter(param) {

    switch (param) {
        case 30:
            imagesData = []
            data.forEach(item => {
                if (item.age && item.age > 30) {
                    imagesData.push(item)
                }
            });
            showData(imagesData.slice(0, 4))
            break;
        case 50:
            imagesData = []
            data.forEach(item => {
                if (item.age && item.age < 50) {
                    imagesData.push(item)
                }
            });
            console.log(imagesData, '50')
            showData(imagesData.slice(0, 4))
            break;
        case 'IT':
            imagesData = []
            data.forEach(item => {
                if ((item.profession.indexOf('IT') !== -1) || (item.profession.indexOf('WEB') !== -1)) {
                    imagesData.push(item)
                }
            });
            showData(imagesData.slice(0, 4))
            break;
        case 'noIT':
            imagesData = []
            data.forEach(item => {
                if ((item.profession.indexOf('IT') === -1) && (item.profession.indexOf('WEB') === -1)) {
                    imagesData.push(item)
                }
            });
            showData(imagesData.slice(0, 4))
            break;
        case 'men':
            imagesData = []
            data.forEach(item => {
                if (item.gender === 'men') {
                    imagesData.push(item)
                }
            });
            console.log(imagesData, 'men')
            showData(imagesData.slice(0, 4))
            break;
        case 'women':
            imagesData = []
            data.forEach(item => {
                if (item.gender === 'women') {
                    imagesData.push(item)
                }
            });
            console.log(imagesData, 'woman')
            showData(imagesData.slice(0, 4))
            break;
        default:
    }
}
