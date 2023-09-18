let input = document.getElementById('inp');
let ul = document.getElementById('u');
let q = document.querySelectorAll('.rep');
let wrapper = document.querySelector('.wrapper');

const debounce = (fn) => {
    let timerId;
    return function() {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, arguments);
        }, 250);
    };
};

async function sR(val) {
    return await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=5`)
    .then(res => {
        return res.json().then(res => {
            createFields(res);
        })
    })
    .catch(err => console.log(err)); 
}

input.addEventListener('keyup', debounce(async function(e) {
    await sR();
}));

function createFields(repData) {
    console.log(repData);
    let items = repData.items;
    console.log(items);
    let qArr = Array.prototype.slice.call(q); // NodeList in Array
    if (input.value == '' || input.value == ' ') {
        for (let i = 0; i < 5; i++) {
            qArr[i].innerHTML = ` `;
        }
        ul.style.visibility = 'hidden';
    }
    else {
        for (let i = 0; i < 5; i++) {
            qArr[i].innerHTML = `${items[i].name}`;
            qArr[i].addEventListener('click', function(e) {
                    selectedRep(e, repData);
                }, 
            );
        }
    }
}

function selectedRep(e, data) {
    let items = data.items;
    items.forEach(el => {
        if (el.name == e.target.innerText){
            let div = document.createElement('div');
            let closeBtn = document.createElement('button');
            closeBtn.addEventListener('click', () => {
                closeBtn.parentElement.remove();
            });
            div.className = 'selected';
            div.innerText = 'Name: ' + el.name + '\n' + 'Owner: ' + el.owner.login + '\n'+ 'Stars: ' + el.stargazers_count + ' ';
            closeBtn.className = 'close';
            closeBtn.innerText = 'x';
            closeBtn.color = 'red';
            div.append(closeBtn);
            wrapper.append(div);
        }
    }); 
    input.value = '';
    setTimeout (clear, 800);
}

function clear() {
    ul.style.visibility = 'hidden';
}

function Show() {
    ul.style.visibility = 'visible';
}

//qArr[i].innerHTML = `${items[i].name}, ${items[i].stargazers_count}, ${items[i].owner.login}`;