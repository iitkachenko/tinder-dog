import Dog from './Dog.js';
import data from './data.js';

const tinderElt = document.getElementById('tinder')

let dogCounter = 0;
let dog = new Dog(data[dogCounter++]);


function render(headerHandlers = true) {
    tinderElt.innerHTML = dog.getCardHtml();
    
    if (data.filter(item => item.hasBeenLiked).length > 0) {
        tinderElt.innerHTML += `<button class="summary-btn btn">Show my favorite dogs</button>`;
        document.querySelector('.summary-btn.btn').addEventListener('click', renderSummaryPage);
    }
    
    const badge = document.querySelector('.badge');
    const likeBtn = document.querySelector('button.like');
    const nopeBtn = document.querySelector('button.nope');

    if(headerHandlers) {
        addHeaderHandlers();
    }
    addTinderHandlers(badge, likeBtn, nopeBtn);
};

function addHeaderHandlers() {
    document.querySelectorAll('a.profile').
        forEach(item => item.addEventListener('click', renderProfilePage));
    
    document.querySelector('.chat').addEventListener('click', renderChatPage);
    
    const menu = document.querySelector('.menu');
    document.querySelector('.menu-btn').addEventListener('click',
                    () => menu.classList.toggle('expanded'));    
    
    menu.querySelector('ul').addEventListener('click', () => menu.classList.remove('expanded'));
    
    document.querySelector('a.back').addEventListener('click', startFromBeginning);
    
    document.querySelector('a.summary-btn').addEventListener('click', renderSummaryPage);
};

function addTinderHandlers(badge, likeBtn, nopeBtn) {
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
}

function renderNextCard(waitTime = 1000, next = false) {
    data[dogCounter - 1] = dog;
    setTimeout(() => {
        if (document.querySelector('.active') || next) {                                
            dog.hasBeenSwiped = true;
            if (dogCounter < data.length) {
                dog = new Dog(data[dogCounter++]);
                render(false);
            } else {
                renderSummaryPage();
            } 
        }
    }, waitTime);
}

function renderSummaryPage() {
    tinderElt.innerHTML = getSummaryHtml();
    document.querySelector('.liked-dogs').addEventListener('click', (e) => {
        if(e.target.nodeName == 'IMG') {
            const currentDog = data.filter(item => e.target.src.includes(item.avatar))[0];
            const index = data.indexOf(currentDog);
            dog = new Dog(data[index]);
            dogCounter = index + 1;        
            render(false);
        }
    })
    
    document.getElementById('start').addEventListener('click', startFromBeginning);

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

function renderProfilePage() {
    tinderElt.innerHTML = `
        <div class="image-wrapper">
            <img class="profile-image" src="./images/dog-profile.jpg">
        </div>
        <div class="profile-info">
            <h3 class="center">Jhon Doe</h3>
            <p><b>Age:</b> Unknown</p>
            <p><b>Interests:</b> Dogs</p>
            <button class="back btn">Back to Profiles</button>
            <button class="summary-btn btn">Show my favorite dogs</button>
        </div>
    `;
    addHandlersForPages();
}

function renderChatPage() {
    tinderElt.innerHTML = `
        <h3 class="center">You have no messages:(</h3>
        <button class="back btn">Back to Profiles</button>
        <button class="summary-btn btn">Show my favorite dogs</button>
    `;
    addHandlersForPages();  
}

function startFromBeginning() {
    dogCounter = 0;
    dog = new Dog(data[dogCounter++]);
    render(false);
}

function addHandlersForPages() {
    
    const imageWrapper = document.querySelector('.image-wrapper');
    
    if(imageWrapper) {
        imageWrapper.addEventListener('click', () => imageWrapper.classList.toggle('expanded'));
    }
    
    document.querySelector('.back.btn').addEventListener('click', startFromBeginning);
    
    document.querySelector('.summary-btn.btn').addEventListener('click', renderSummaryPage);
};

render();