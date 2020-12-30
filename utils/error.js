class Err extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}

handleError = (err, res) => {
    console.error(err.stack);
    res.render("layout", {
        title: "Error",
        main: "error",
        code: err.code,
        message: err.message
    });
};

module.exports = {
    Err,
    handleError
};
