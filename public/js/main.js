'use strict';

const API_URL = 'http://webdev-task-2-tgywfjjjel.now.sh/places/';
const LOCAL_URL ='http://localhost:8081/places/';

class Place {
    constructor({id, name, dateCreate, isVisited}) {
        this.id = id;
        this.name = name;
        this.dateCreate = dateCreate;
        this.isVisited = isVisited;
    }
}

class ListPlace {        
    constructor() {
        this.elament = document.querySelector('.places__list');
        this.storage = [];
    }

    async loadPlacesFromServer() {
        let responce = await fetch(LOCAL_URL);
        let places = await responce.json();
        for (const place of places) {
            this.createPlace(place);
        }
        
    }

    createPlace(place) {
        this.storage.push(new Place(place));
    }

    async createPlaces(name) {
        const response = await fetch(LOCAL_URL + name, {
            method: 'POST'
        });
    }

    async deleteAllPlaces() {
        await fetch(LOCAL_URL, {
            method: 'DELETE'
        });
    }

}

const init = async () => {
    const listPlace = new ListPlace();
    
    await listPlace.deleteAllPlaces();
    await listPlace.loadPlacesFromServer();
    await listP
    console.log(listPlace.storage);
}

document.addEventListener("DOMContentLoaded", init);
