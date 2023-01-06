import Dog from './Dog.js';
import data from './data.js';

const tinderGallery = document.getElementById('tinder-gallery')

let dogCounter = 0;
let dog = new Dog(data[dogCounter++]);


function render() {
    tinderGallery.innerHTML = dog.getCardHtml();
    
    if (data.filter(item => item.hasBeenLiked).length > 0) {
        tinderGallery.innerHTML += `<button id="summary-btn">Show my favorite dogs</button>`;
    }
    
    const badge = document.querySelector('.badge');
    const likeBtn = document.querySelector('button.like');
    const nopeBtn = document.querySelector('button.nope');

    addEventHandlers(badge, likeBtn, nopeBtn);
};

function addEventHandlers(badge, likeBtn, nopeBtn) {
    likeBtn.addEventListener('click', () => {
                badge.classList.remove('badge-nope');
                likeBtn.classList.toggle('active');
                badge.classList.toggle('badge-like');
                dog.hasBeenNoped = false;
                dog.hasBeenLiked = !dog.hasBeenLiked;
                renderNextCard();
    });
    
    nopeBtn.addEventListener('click', () => {
                badge.classList.remove('badge-like');
                nopeBtn.classList.toggle('active');                                      
                badge.classList.toggle('badge-nope'); 
                dog.hasBeenLiked = false;
                dog.hasBeenNoped = !dog.hasBeenNoped;
                renderNextCard();      
    });
    
    document.querySelector('button.next').
                addEventListener('click', () => renderNextCard(0, true));
    
    const summaryBtn = document.getElementById('summary-btn');
    if(summaryBtn) {
        summaryBtn.addEventListener('click', renderFromBeginning);
    }
}

function renderNextCard(waitTime = 1000, next = false) {
    data[dogCounter - 1] = dog;
    setTimeout(() => {
        if (document.querySelector('.active') || next) {                                
            dog.hasBeenSwiped = true;
            if (dogCounter < data.length) {
                dog = new Dog(data[dogCounter++]);
                render();
            } else {
                renderFromBeginning();
            } 
        }
    }, waitTime);
}

function renderFromBeginning() {
    tinderGallery.innerHTML = getSummaryHtml();
    document.querySelector('.liked-dogs').addEventListener('click', (e) => {
        if(e.target.nodeName == 'IMG') {
            const currentDog = data.filter(item => e.target.src.includes(item.avatar))[0];
            const index = data.indexOf(currentDog);
            dog = new Dog(data[index]);
            dogCounter = index + 1;        
            render();
        }
    })
    
    document.getElementById('start').addEventListener('click', () => {
        dogCounter = 0;
        dog = new Dog(data[dogCounter++]);
        render();
    });

}

function getSummaryHtml() {
    const likedDogs = data.filter(item => item.hasBeenLiked);
    const likedDogsHtml = likedDogs.length > 0
            ? likedDogs.reduce(((acc, item) => acc + `<img class="dog" src="${item.avatar}">`), '')
            : '<span>Oops, are you a cat?</span>';
    return `
        <div class="summary">
            <h2>You liked:</h2>
            <div class="liked-dogs">
            ${likedDogsHtml}
            </div>
            <b>Changed your mind?</b>
            <button id="start">Yes</button>
        </div>`;
}

render();


