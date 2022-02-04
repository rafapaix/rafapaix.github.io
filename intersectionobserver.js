let options = {
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.75
}

let elements = document.querySelectorAll('.display');
let counters = document.querySelectorAll('.counter > h1');
let cards = document.querySelectorAll('.social-display');

let callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('social-display')) {
                if (entry.target.id === "tiktok" || entry.target.id === "tiktok-layer-1" || entry.target.id === "tiktok-layer-2") {
                    tiktokCardAnimation();
                    return;
                }

                if (entry.target.id === "twitch" || entry.target.id === "twitch-layer-1") {
                    twitchCardAnimation();
                    return;
                }

                entry.target.classList.add('card-animation');
            }

            if (entry.target.hasAttribute('counter-target')) {
                numberCountUp(entry, 600, 750);
                return;
            }

            if (entry.target.classList.contains('display')){
                entry.target.classList.add('content-animation');
                return;
            }
        }
    });
};

let observer = new IntersectionObserver(callback, options);

elements.forEach(element => {
    observer.observe(element);
});

counters.forEach(element => {
    observer.observe(element);
});

cards.forEach(element => {
    observer.observe(element);
});

function tiktokCardAnimation() {
    if (document.getElementById('tiktok-layer-1') || document.getElementById('tiktok-layer-2')) {
        return;
    }

    let firstLayer = document.getElementById('tiktok');
    let secondLayer = firstLayer.cloneNode(true);
    let thirdLayer = firstLayer.cloneNode(true);

    secondLayer.id = 'tiktok-layer-1';
    thirdLayer.id = 'tiktok-layer-2';

    firstLayer.after(secondLayer, thirdLayer);

    firstLayer.classList.add('card-animation');
    secondLayer.classList.add('card-animation');
    thirdLayer.classList.add('card-animation');
}

function twitchCardAnimation() {
    if (document.getElementById('twitch-layer-1')) {
        return;
    }

    let firstLayer = document.getElementById('twitch');
    let secondLayer = firstLayer.cloneNode(true);

    secondLayer.id = 'twitch-layer-1';

    firstLayer.after(secondLayer);

    /*Sem o timeout, a opacidade da segunda camada não inicia em 0*/
    setTimeout(() => {
        firstLayer.classList.add('card-animation');
        secondLayer.classList.add('card-animation');
    }, 1);
}

function numberCountUp(entry, speed, delay) {
    const updateCount = () => {
        const target = parseInt(entry.target.getAttribute('counter-target'));
        const count = parseInt(entry.target.innerText.replace(/\./g,''));
        let increment = Math.trunc(target / speed);

        if (count < target) {
            entry.target.innerText = (count + increment).toLocaleString('pt-BR');
            setTimeout(updateCount, 1);
        } else {
            entry.target.innerText = target.toLocaleString('pt-BR');
        }
    };

    setTimeout(updateCount, delay);
}