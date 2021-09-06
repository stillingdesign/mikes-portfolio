const { config } = require("dotenv");

module.exports = (function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addWatchTarget("src/assets/sass");

    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }

});