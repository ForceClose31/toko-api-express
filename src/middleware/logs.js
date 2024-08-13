const logRequest = (req, res, next) => {
    console.log('Telah terjadi request ke path :', req.path);
    next();
}

module.exports = logRequest;
