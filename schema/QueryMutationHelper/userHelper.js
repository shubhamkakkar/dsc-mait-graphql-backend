import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secretKey = "secretKey";


export function hashedPasswordGenerator(password) {
    return bcrypt.hash(password, saltRounds)
        .then(hashedPassword => hashedPassword);
}

export function userReturn(doc) {
    const token = jwt.sign({email: doc.email, _id: doc._id, role: doc.role}, secretKey);
    return {
        ...doc,
        token
    }
}

