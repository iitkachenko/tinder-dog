class Dog {
    constructor(data) {
        Object.assign(this, data);
    }
    
    getCardHtml() {
        const {name, avatar, age, bio, hasBeenSwiped, hasBeenLiked, hasBeenNoped} = this;
        const badge = hasBeenLiked ? 'badge-like'
                    : hasBeenNoped ? 'badge-nope' : '';
        
        return `
            <div class="image-container">
                <img class="avatar" src="${avatar}">
                <div class="badge ${badge}"></div>
                <div class="dog-info">
                    <h3>${name}, ${age}</h3>
                    <p class="message">${bio}</p>
                </div>
            </div>
            <div class="buttons-set">
                <button class="nope ${hasBeenNoped ? 'active' : ''}">
                    <img src="./images/icon-cross.png">
                </button>
                <button class="like ${hasBeenLiked ? 'active' : ''}">
                    <img src="./images/icon-heart.png">
                </button>
                <button class="next">Next</button>            
            </div>
        `;
    }
}

export default Dog;