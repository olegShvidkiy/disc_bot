class ConfigUtil {

    constructor() {
        this.config = require("../../config.json");
        return this.config;
    }
}
module.exports = ConfigUtil;