module.exports = (req, res, next) => {

    return res.status(408).json({
        success: false,
        message: 'Something went wrong while performing action',
        error: 'timeout'
    });
};