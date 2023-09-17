let input = document.getElementById('a');
let w = document.getElementById('w');
let q = document.querySelectorAll('.rep');
let wrapper = document.querySelector('.wrapper');


async function sR(val) {
    return await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=5`)
    .then(res => {
        return res.json().then(res => {
            createUser(res);
        })
    })
    .catch(err => console.log(err)); 
}

input.addEventListener('keyup', sR.bind(this));

function createUser(repData) {
    console.log(repData);
    let items = repData.items;
    console.log(items);
    console.log(q);
    let qArr = Array.prototype.slice.call(q);
    console.log(qArr);
    for (let i = 0; i < 5; i++) {
        qArr[i].innerHTML = `${items[i].name}, ${items[i].stargazers_count}, ${items[i].owner.login}`;
    }
}