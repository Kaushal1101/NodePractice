const asyncHandler = require('express-async-handler')

const Journal = require('../models/journalModel')
const User = require('../models/userModel')
//const { configDotenv } = require('dotenv')


// @desc Get Journals
// @route GET /api/journals
// @access Private
const getJournals = asyncHandler( async (req, res) => {
    let journals

    console.log("LOGGED IN USER: ", req.user)

    journals = await Journal.find({ user: req.user._id })

    console.log("JOURNALS FOUND: ", journals)

    if (req.user.role === 'premium') {
        console.log('here')
        // otherJournals = await Journal.find({ })
        //                              .populate('user', 'name role')
        //                              .filter(entry => entry.user.role === 'basic')

        // journals = journals.concat(otherJournals)        
        const basicUsers = await User.find({ role: 'basic' }).select('_id')
        const basicUserIds = basicUsers.map(u => u._id)

        const otherJournals = await Journal.find({
            user: { $in: basicUserIds }
        }).populate('user', 'name role')

        journals = journals.concat(otherJournals)
    } 

    res.status(200).json(journals)
})


// @desc Enter Journals
// @route POST /api/journals
// @access Private
const writeJournal = asyncHandler( async (req, res) => {
    if (!req.body || !req.body.title || !req.body.content) {
        res.status(400)
        throw new Error(`Cannot accept empty entry`)
    }

    const journal = await Journal.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user._id
    })

    res.status(200).json(journal)
})


// @desc Update Journal
// @route PUT /api/journals/:id
// @access Private
const updateJournal = asyncHandler( async (req, res) => {
    const journal = await Journal.findById(req.params.id).populate('user', 'name role')

    if (!journal) {
        res.status(400)
        throw new Error('Entry not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // If I'm a premium user: Check if entry is premium and not mine
    // if I'm a basic user: Check if entry matches my user id

    if (req.user.role === 'premium') {
        if (journal.user.role === 'premium' && req.user.id !== journal.user.id) {
            res.status(400)
            throw new Error('User not authorized: Premium User Entry')
        }
    } else {
        if (req.user.id !== journal.user.id) {
            res.status(400)
            throw new Error('User not Authorized: Upgrade to Premium to Edit')
        }
    }

    await Journal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json({message: `Journal update ${req.params.id}`})
})


// @desc Delete Journal
// @route DELETE /api/journals/:id
// @access Private
const deleteJournal = asyncHandler( async (req, res) => {
    const journal = await Journal.findById(req.params.id).populate('user', 'name role')

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (!journal) {
        res.status(400)
        throw new Error('Entry not found')
    }

    if (req.user.role === 'premium') {
        if (journal.user.role === 'premium' && req.user.id !== journal.user.id) {
            res.status(400)
            throw new Error('User not authorized: Premium User Entry')
        }
    } else {
        if (req.user.id !== journal.user.id) {
            res.status(400)
            throw new Error('User not Authorized: Upgrade to Premium to Edit')
        }
    }

    await journal.deleteOne()

    res.status(200).json({message: `Journal deleted ${req.params.id}`})
})


// @desc Merge Journal Entries
// @route PUT /api/journals/:id1/:id2
// @acess Private
const mergeJournals = asyncHandler( async (req, res) => {
    const journalOne = await Journal.findById(req.params.id1).populate('user', 'name role')
    const journalTwo = await Journal.findById(req.params.id2).populate('user', 'name role')

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (!journalOne) {
        res.status(400)
        throw new Error('Entry 1 not found')
    }

     if (!journalTwo) {
        res.status(400)
        throw new Error('Entry 2 not found')
    }

    // Returns true if user is authorized to edit this journal
    function isAuth(journal, user) {
     const isOwner = journal.user.id === user.id

     const isPremiumEntry = journal.user.role === 'premium'

     const isPremiumUser = user.role === 'premium'

     if (isOwner) return true

     // Not owner, and premium entry, so we can't edit
     if (isPremiumEntry) return false

     // Not premium entry, so we can edit if we're premium user
     if (isPremiumUser) return true

     // Not owner nor premium user, can't edit
     return false
    }

    if (!isAuth(journalOne, req.user) || !isAuth(journalTwo, req.user)) {
        res.status(401)
        throw new Error('User not authorized: One or more entries restricted')
    } else {
        const mergedTitle = `${journalOne.title} + ${journalTwo.title}`
        const mergedContent = `${journalOne.content}\n\n---\n\n${journalTwo.content}`

        // Updated journal one to be the new merged journal
        const mergedJournal = await Journal.findByIdAndUpdate(journalOne._id, {
            title: mergedTitle,
            content: mergedContent
        }, {
            new: true,
        })
        
        // Deletes journal two
        await journalTwo.deleteOne()
    }

    res.status(200).json({message: `Journal ${journalOne.title} by ${journalOne.user} merged with ${journalTwo.title} by ${journalTwo.user}`})
})


module.exports = {
    getJournals, 
    writeJournal, 
    updateJournal, 
    deleteJournal,
    mergeJournals
}
