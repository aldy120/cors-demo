// 1. https://cors-test-with-wrong-configuration.s3.eu-west-1.amazonaws.com/dublin.jpg
// 2. https://cors-test-12345678.s3.eu-west-1.amazonaws.com/dublin.jpg
// 3. https://cors-1.lichi-chen.com/dublin.jpg
// 4. https://cors-cloudfront-default.lichi-chen.com/dublin.jpg
// 5. https://cors-with-preflight.lichi-chen.com/dublin.jpg
// 6. https://cors-origin-custom-header.lichi-chen.com/dublin.jpg
// 7. https://cors-caching-optimized.lichi-chen.com/dublin.jpg
// 8. https://cors-knowledge-center.lichi-chen.com/dublin.jpg

const urls = [
    'https://cors-test-with-wrong-configuration.s3.eu-west-1.amazonaws.com/dublin.jpg',
    'https://cors-test-12345678.s3.eu-west-1.amazonaws.com/dublin.jpg',
    'https://cors-cloudfront-default.lichi-chen.com/dublin.jpg',
    'https://simple-cors.lichi-chen.com/dublin.jpg',
    'https://cors-with-preflight.lichi-chen.com/dublin.jpg',
    'https://cors-origin-custom-header.lichi-chen.com/dublin.jpg',
    'https://cors-caching-optimized.lichi-chen.com/dublin.jpg',
    'https://cors-knowledge-center.lichi-chen.com/dublin.jpg',
]

function addImageTagFrom(url, e) {
    var elem = document.createElement("img");
    elem.setAttribute("width", "102");
    elem.setAttribute("height", "76");
    elem.setAttribute("alt", "Dublin");
    elem.setAttribute("src", url);
    elem.classList.add('test-img');
    const parent = e.target.parentNode
    parent.insertBefore(elem, parent.children[0])
}

function addImageTagCorsFrom(url, e) {
    var elem = document.createElement("img");
    elem.setAttribute("width", "102");
    elem.setAttribute("height", "76");
    elem.setAttribute("alt", "Dublin");
    elem.setAttribute("class", "img");
    elem.setAttribute("crossorigin", "");
    elem.setAttribute("src", url);
    elem.classList.add('test-img');
    const parent = e.target.parentNode
    parent.insertBefore(elem, parent.children[0])
}

function getImage(url, e) {
    fetch(url)
        .then(response => response.blob())
        .then(imageBlob => {
            // Then create a local URL for that image and print it 
            const imageObjectURL = URL.createObjectURL(imageBlob);
            return imageObjectURL
        }).then((url) => addImageTagFrom(url, e));
}

function getImageWithPreflight(url, e) {
    fetch(url, {
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.blob())
        .then(imageBlob => {
            // Then create a local URL for that image and print it 
            const imageObjectURL = URL.createObjectURL(imageBlob);
            return imageObjectURL
        }).then((url) => addImageTagFrom(url, e));
}

function removeAllImages() {
    const imageNodes = document.querySelectorAll('.test-img');
    imageNodes.forEach(elem => elem.remove())
}

const imageTagBtns = document.querySelectorAll('.img-tag-btn')
imageTagBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        addImageTagFrom(urls[i], e)
    })
})

const imageTagCrossoriginBtns = document.querySelectorAll('.img-tag-crossorigin-btn')
imageTagCrossoriginBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        addImageTagCorsFrom(urls[i], e)
    })
})

const fetchBtns = document.querySelectorAll('.fetch-btn')
fetchBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        getImage(urls[i], e)
    })
})

const fetchPreflightBtns = document.querySelectorAll('.fetch-preflight-btn')
fetchPreflightBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        getImageWithPreflight(urls[i], e)
    })
})

addEventListener('keydown', (e) => {
    e.key === "Escape" && removeAllImages()
})

document.querySelector('#esc').addEventListener('click', (e) => {
    removeAllImages()
})