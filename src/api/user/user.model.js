const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationEmail } = require('../../utils/validators/validations')
const { setError } = require('../../utils/error/error')
require('dotenv').config();
const adminPassword = process.env.ADMIN_PASSWORD;

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true }
}, { timestamps: true })



userSchema.pre("save", function (next) {
    if (!validationEmail(this.email)) { 
        return next(setError(400, "El email debe cumplir el patro, ejemplo@ejemplo.com"))
    }
    if (adminPassword === this.password) { 
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    } else {
        return next (setError(400, "Esta no es la contraseña de los admins, si quiere disponer de este roll manda un correo electrónico a team1@gmail.com y se investigará su caso a detalle para ver si puede disponer de este roll."))
    }  
});

const User = mongoose.model('users', userSchema)
module.exports = User