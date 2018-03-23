'use strict';

// const API_URL = 'https://webdev-task-2-chwbzmehaw.now.sh/places/';
const LOCAL_URL = 'http://localhost:8081/places/';

class Place {
    constructor({ id, name, dateCreate, isVisited }) {
        this.parentElement = document.querySelector('.places-list');
        this.element = this.createPlace();
        this._initPlaceControlls();

        this.id = id;
        this.element.setAttribute('data-id', this.id);

        this.name = name;
        this.element.querySelector('.place__name').textContent = this.name;
        this.dateCreate = dateCreate;
        this.isVisited = isVisited;
        if (this.isVisited === true) {
            this.visitedChecbox.checked = true;
        }
        this.visitedChecbox.onclick = async () => {
            await this.visitPlace();
        };
        this.deleteButton.onclick = async () => {
            await this.deletePlace();
        };
    }

    _getInnerHtml() {
        return `
        <button class="place__edit">Edit</button>
        <button class="place__delete">Del</button>
        <div class="place__name"></div>
        <button class="place__move-top">top</button>
        <button class="place__move-down">down</button>
        <input class="place__visited" type="checkbox" name="isVisited" id="isVisited">
        <div class="place__edit__controlls">
            <input class="place__edit__controlls_name" type="text" name="new-name" id="new-name">
            <button class="place__edit__controlls__save">Y</button>
            <button class="place__edit__controlls__cancel">N</button>
        </div> `;
    }

    _initPlaceControlls() {
        this.editButton = this.element.querySelector('.place__edit');
        this.deleteButton = this.element.querySelector('.place__delete');
        this.moveTopButton = this.element.querySelector('.place__move-top');
        this.moveDownButton = this.element.querySelector('.place__move-down');
        this.visitedChecbox = this.element.querySelector('.place__visited');
        this.editControlls = this.element.querySelector('.place__edit__controlls');
        this.editName = this.element.querySelector('.place__edit__controlls_name');
        this.editSaveButton = this.editControlls.querySelector('.place__edit__controlls__yes');
        this.editCancelButton = this.editControlls.querySelector('.place__edit__controlls__no');
    }

    async deletePlace() {
        const data = JSON.stringify({ id: this.id });
        await fetch(LOCAL_URL, {
            method: 'DELETE',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        this.parentElement.removeChild(this.element);
    }

    async visitPlace() {
        this.isVisited = !this.isVisited;
        const data = JSON.stringify({ id: this.id, isVisited: this.isVisited });
        await fetch(LOCAL_URL, {
            method: 'PATCH',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    createPlace() {
        const place = document.createElement('div');
        place.className = 'place';
        place.innerHTML = this._getInnerHtml();

        return place;
    }
}

class ListPlace {
    constructor() {
        this.storage = [];
        this.element = document.querySelector('.places-list');
        this.searchInput = document.querySelector('.controlss__search__input');
        this.addPlaceInput = document.querySelector('.controlls__add-place__input');
        this.addPlaceButton = document.querySelector('.controlls__add-place__button');
        this.deleteAllButton = document.querySelector('.controlls__delete-all');

        this.addPlaceButton.onclick = async () => {
            await this.createNewPlaces();
        };

        this.deleteAllButton.onclick = async () => {
            await this.deleteAllPlace();
        };
    }

    async loadPlacesFromServer() {
        let responce = await fetch(LOCAL_URL + 'list/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let places = await responce.json();
        for (const place of places) {
            this.pushPlaceInStorage(place);
        }
    }

    pushPlaceInStorage(place) {
        this.storage.push(new Place(place));
    }

    async createNewPlaces() {
        const name = this.addPlaceInput.value;
        const data = JSON.stringify({ name: name });
        const response = await fetch(LOCAL_URL, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        this.addPlaceInput.value = '';

        let placeResponse = await response.json();

        const place = new Place(placeResponse);

        this.storage.push(place);

        this.renderPlaces();
    }

    async deleteAllPlaces() {
        await fetch(LOCAL_URL, {
            method: 'DELETE'
        });
    }

    async deleteAllPlace() {
        await fetchRequest('DELETE', null);
        this.storage = [];

        this.renderPlaces();
    }

    renderPlaces() {
        let e = this.element;
        e.innerHTML = '';
        for (const place of this.storage) {
            e.appendChild(place.element);
        }
    }
}

const fetchRequest = async ( addToPath, method, body) => {
    return await fetch(LOCAL_URL + addToPath, {
        method: method,
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

const init = async () => {
    const listPlace = new ListPlace();


    await listPlace.loadPlacesFromServer();

    listPlace.renderPlaces();
    document.querySelector('.kek').onclick = () => {
        console.log('push', listPlace.storage);
    };
};

document.addEventListener('DOMContentLoaded', init);
