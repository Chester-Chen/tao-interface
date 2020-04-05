const jwt = require('jsonwebtoken');

function generateToken(data) {
    let token = jwt.sign({
        name: data.user,
    }, 'secret', {
        expiresIn: '1h'
    });
    return token;
}

function vertify() {

}

module.exports = {
    generateToken,
    vertify
}