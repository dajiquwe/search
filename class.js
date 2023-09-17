class View {
    constructor() {
        this.app = document.getElementById('wrapper');
        this.title = this.createElement('h1','title');
        this.title.textContent = 'Github Search Repos';

        this.sL = this.createElement('div','sL');
        this.sI = this.createElement('input','sI');
        this.sC = this.createElement('span','sC');

        this.sL.append(this.sI)
        this.sL.append(this.sC)

        this.rW = this.createElement('div','rW');
        this.rL = this.createElement('ul','rL');
        this.rW.append(this.rL);

        this.app.append(this.title);
        this.app.append(this.sL);
        this.app.append(this.rW);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if(elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }

    createRep(repData) {
        console.log(repData);
        const repElement = this.createElement('li','repository');
        repElement.innerHtml = 5;

        this.app.append(repElement);
    }
}

class Search {
    constructor(view) {
        this.view = view;

        this.view.sI.addEventListener('keyup', this.sR.bind(this));
    }

    async sR(value) {
        return await fetch(`https://api.github.com/search/repositories?q=${this.view.sI.value}&per_page=5`)
        .then(response => {
            response.json().then(response => {
                response.items.forEach(rep => {
                    this.view.createRep(rep);
                });
            }); 
            })
        .catch(err => console.log(err)); 
    }
}

new Search(new View());