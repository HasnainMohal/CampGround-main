const User = require('../models/user')


module.exports.registerForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        //New User Creation Plus Passport Plugin
        const user = new User({ email, username })
        //Passport_Salt_Hash_!!req!!
        const registeredUser = await User.register(user, password)
        //Passport_!!req!!
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds/home')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.loginForm = (req, res) => {
    res.render('users/login')
}

module.exports.Aclogin = (req, res) => {
    req.flash('success', 'welcome back!')
    //Passport_!!req!!_Session_Redirect
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    //For New Passport version use this callback
    req.logOut(err => {
        if (err) return next(err)
        req.flash('success', "Goodbye!")
        res.redirect('/campgrounds/home')
    })
}