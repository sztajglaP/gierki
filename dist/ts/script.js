import { doneGames, wantToPlayGames, badGames, interestedGames } from "./gameList/gameList.js";
const navMenu = document.querySelector('.nav__menu');
const navBtn = document.querySelector('.nav__menu-button');
const mainBox = document.querySelector('.main__box');
const navMenuItems = document.querySelectorAll('.nav__menu-item');
const showMobileMenu = () => {
    navMenu.classList.toggle('active');
};
const clickNavMenuItem = (e) => {
    navMenuItems.forEach(el => {
        el.classList.remove('active');
    });
    e.target.classList.add('active');
    mainBox.innerHTML = '';
    const id = e.target.id;
    let gamesList;
    if (id === 'doneGames') {
        gamesList = doneGames;
    }
    else if (id === 'wantToPlayGames') {
        gamesList = wantToPlayGames;
    }
    else if (id === 'badGames') {
        gamesList = badGames;
    }
    else if (id === 'interestedGames') {
        gamesList = interestedGames;
    }
    createGameCard(gamesList);
    navMenu.classList.remove('active');
};
const activeCardButton = (e, gamesList) => {
    mainBox.innerHTML = '';
    let button;
    if (e.target.classList.contains('main__card-btn')) {
        button = e.target;
    }
    else {
        button = e.target.parentElement;
    }
    const card = button.parentElement.parentElement;
    const id = Number(card.id);
    if (button.classList.contains('edit')) {
        console.log('edit');
    }
    else {
        gamesList.splice(id, 1);
    }
    createGameCard(gamesList);
};
const createGameCard = (gamesList) => {
    let id = 0;
    gamesList.forEach(el => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('main__card');
        gameCard.setAttribute('id', `${id}`);
        gameCard.innerHTML = `
            <div class="main__info-box">
                <img class="main__card-img" src="${el.image}" alt="">
                <p class="main__card-title">${el.title}</p>
            </div>
            <div class="main__card-button-box">
                <button class="main__card-btn edit">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="main__card-btn delete">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
        mainBox.appendChild(gameCard);
        id++;
    });
    const allCardBtn = document.querySelectorAll('.main__card-btn');
    allCardBtn.forEach(el => {
        el.addEventListener('click', () => {
            activeCardButton(event, gamesList);
        });
    });
};
window.onload = () => {
    createGameCard(doneGames);
    navBtn.addEventListener('click', showMobileMenu);
    navMenuItems.forEach(el => el.addEventListener('click', clickNavMenuItem));
};
