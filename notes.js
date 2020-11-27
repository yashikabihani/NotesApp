const fs = require('fs')
const { argv } = require('process')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
    // if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added!'))
    }
    else{
        console.log(chalk.red.inverse('Note Title Taken!'))  
    }
}

const removeNote = (title) => {
    const notes = loadNotes() 
    const removeNotes = notes.filter((note) => note.title !== title)
    if(notes.length > removeNotes.length){
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(removeNotes)
    }
    else{
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your Notes :'))
    notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes() 
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const notes = (fs.readFileSync('notes.json').toString())
        return JSON.parse(notes)
    }
    catch(e){
        return []
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}