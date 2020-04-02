module.exports = function () {

    let properties = {};

    return {
        addProperty: function (key, value) {
            properties[key] = value;
            return this;
        },
        build: function () {
            return {
                ...properties
            }
        }
    }
}