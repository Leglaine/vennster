class Err extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

function handleError(err, res) {
    console.error(err.stack);
    if (!err.code || err.code > 500 || err.code < 100) {
        err.code = 500;
    }
    if (err.code === 500) {
        err.message = "Internal server error";
    }
    res.render("layout", {
        title: "Error",
        main: "error",
        code: err.code,
        message: err.message
    });
}

module.exports = {
    Err,
    handleError
};
