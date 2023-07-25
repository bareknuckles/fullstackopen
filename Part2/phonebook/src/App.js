import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personService from "./services/persons"
import Notification from "./Components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
        .getAll()
        .then((allPersons) => {
            setPersons(allPersons);
        })
        .catch((err) => alert(err));
    }, []);
    

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPerson = {name: newName, number: newNumber}
        if(!newName || !newNumber){
            alert('Please fill in the fields')
            return
        }

        // Check for duplicates 
        const alreadyExists = persons.some(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
        )

        if(alreadyExists){
            const person = persons.find((p) => p.name === newName);
            const changedPerson = { ...person, number: newNumber };
            const { id } = person;

            const confirmUpdate = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )

            if(confirmUpdate){
                personService
                .update(id, changedPerson)
                .then((returnedPerson) => {
                    //Update Person contact details
                    setPersons(
                        persons.map((person) =>
                            person.id !== id ? person : returnedPerson
                        )
                    )
                    setSuccessMessage(`Updated ${changedPerson.name}'s number`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                    setNewName("")
                    setNewNumber("")
                })
                .catch((err) => {
                    if(err.response.data){
                        setErrorMessage(err.response.data.error)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    }else{
                        setErrorMessage(`This information: ${changedPerson.name} has already been removed from server`)
                        setPersons(persons.filter((p) => p.id !== id))
                        setNewName("")
                        setNewNumber("")
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    }
                })
            }
            setNewName("")
            setNewNumber("")
            return
        }
        personService
        .create(newPerson)
        .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setSuccessMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)
            setNewName("")
            setNewNumber("")
        })
        .catch((err) => {
            setErrorMessage(err.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        })
    }

    const handleDelete = (id) => {
        const person = persons.find((p) => p.id === id);
        const confirmDelete = window.confirm(`Delete ${person.name}?`);
        if(confirmDelete){
            personService
            .remove(id)
            .then(() => {
                const filteredPersons = persons.filter((person) => person.id !== id);
                const filteredPerson = persons.find((person) => person.id === id).name
                setSuccessMessage(`Successfully deleted ${filteredPerson}`)
                setPersons(filteredPersons)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
                setFilter('')
            })
            .catch((err) => alert(err))
        }else{
            return
        }
    }

    return(
        <>
            <h2>Phonebook</h2>
            <Notification successMessage={successMessage} errorMessage={errorMessage} />
            <Filter filter={filter} onFilterChange={handleFilterChange} />
            <PersonForm 
                onFormSubmit={handleSubmit}
                onNameChange={handleNameChange}
                onNumberChange={handleNumberChange}
                nameValue={newName}
                numberValue={newNumber}
            />
            <h2>My contacts</h2>
            <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
        </>
    )
}

export default App;