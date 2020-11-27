const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')
const { string } = require('yargs')

// console.log(validator.isEmail('yashikabihani7@gmail.com'))
// console.log(validator.isURL('https://amazon.in'))
// console.log(chalk.green.bold.inverse.italic('Success!'))
// console.log(process.argv)
// //Customize yargs version
// yargs.version('1.1.0')

// const command = process.argv[2]
// if(command === 'add'){
//     console.log('Adding Note!')
// }
// else if(command === 'remove'){
//     console.log('Removing a Note!')
// }
// else{
//     console.log('Not a valid operation!')
// }

yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder:{
        title : {
            describe : 'Note Title',
            //The below option says that the title needs to be provided, otherwise it would not run 
            demandOption: true,
            //The title should be a string, otherwise it takes boolean value
            type: 'string'
        },
        body : {
            describe : 'Body of the Note',
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => {
        // console.log('Adding a new Note!', argv)
        // console.log('Title: ' + argv.title)
        // console.log('Body: '+ argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command : 'remove',
    describe : 'Remove a note',
    builder:{
        title : {
            describe : 'Note Title',
            demandOption: true,
            type: 'string'
        },
    },
    handler : (argv) => {
        notes.removeNote(argv.title)
        // console.log('Removing a Note!')
    }
})

yargs.command({
    command : 'list',
    describe : 'List the notes',
    handler : () => {
        notes.listNotes()
    }
})

yargs.command({
    command : 'read',
    describe : 'Read a note',
    builder:{
        title : {
            describe : 'Note Title',
            demandOption: true,
            type: 'string'
        },
    },
    handler : (argv) => {
        notes.readNote(argv.title)
    }
})

// console.log(yargs.argv)
yargs.parse()