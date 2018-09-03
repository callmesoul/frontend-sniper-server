module.exports = {
    Date: require('./scalars/date'), // eslint-disable-line
    PageParams(root, params, ctx) {
        console.log('pageparams',params)
    }
};
