"use client";

import { useState } from "react";

export default function DogForm() {
    const [dogName, setDogName] = useState("");
    const [dogBreed, setDogBreed] = useState("");
    const [dogAge, setDogAge] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let dog = {
            name: dogName,
            breed: dogBreed,
            age: dogAge,
        };
        console.log(dog);
        //save to database

        // clearing form
        setDogName("");
        setDogBreed("");
        setDogAge(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="dogName">Name:</label>
            <input
                type="text"
                id="dogName"
                value={dogName}
                onChange={(event) => setDogName(event.target.value)}
            />
            <label htmlFor="dogBreed">Breed:</label>
            <input
                type="text"
                id="dogBreed"
                value={dogBreed}
                onChange={(event) => setDogBreed(event.target.value)}
            />
            <label htmlFor="dogAge">Age:</label>
            <input
                type="text"
                id="dogAge"
                value={dogAge}
                onChange={(event) => setDogAge(event.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}