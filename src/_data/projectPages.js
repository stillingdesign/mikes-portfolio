require('dotenv').config();
const contentful = require("contentful");
const {BLOCKS, INLINES} = require('@contentful/rich-text-types');
const {documentToHtmlString} = require('@contentful/rich-text-html-renderer');


const client = contentful.createClient({
    host: process.env.CTFL_HOST,
    space: process.env.CTFL_SPACE,
    accessToken: process.env.CTFL_ACCESSTOKEN
});


module.exports = function() {
    return client.getEntries({ content_type: 'projectPage', order: 'fields.postDate' })
    .then(function(response) {

        //Store Blog Assets
        const assets = response.includes.Asset

        //Get Blog Items
        const items = response.items.map(function(item) {

            //Grab Meta Image Asset
            let metaImgUrl = "";
            const metaImgId = item.fields.metaImage.sys.id;
            const metaImgData = assets.find(function(asset) { return asset.sys.id == metaImgId });
            if (metaImgData) { metaImgUrl = metaImgData.fields.file.url; }
            item.fields.metaImage.url = `https:${metaImgUrl}`;

            //Grab Hero Image Asset
            let heroImgUrl = "";
            let heroImgAltText = "";
            const heroImgId = item.fields.heroImage.sys.id;
            const heroImgData = assets.find(function(asset) { return asset.sys.id == heroImgId });
            if (heroImgData) {
                heroImgUrl = heroImgData.fields.file.url;
                heroImgAltText = heroImgData.fields.description;
            }
            item.fields.heroImage.url = `https:${heroImgUrl}`;
            item.fields.heroImage.altText = `${heroImgAltText}`;

            //Grab Featured Thumbnail Asset
            let featuredThumbnailUrl = "";
            let featuredThumbnailAltText = "";
            const featuredThumbnailId = item.fields.featuredThumbnail.sys.id;
            const featuredThumbnailData = assets.find(function(asset) { return asset.sys.id == featuredThumbnailId });
            if (featuredThumbnailData) {
                featuredThumbnailUrl = featuredThumbnailData.fields.file.url;
                featuredThumbnailAltText = featuredThumbnailData.fields.description;
            }
            item.fields.featuredThumbnail.url = `https:${featuredThumbnailUrl}`;
            item.fields.featuredThumbnail.altText = `${featuredThumbnailAltText}`;

            //Grab Discovery Image Asset
            let discoveryImgUrl = "";
            let discoveryImgAltText = "";
            const discoveryImgId = item.fields.discoveryImage.sys.id;
            const discoveryImgData = assets.find(function(asset) { return asset.sys.id == discoveryImgId });
            if (discoveryImgData) {
                discoveryImgUrl = discoveryImgData.fields.file.url;
                discoveryImgAltText = discoveryImgData.fields.description;
            }
            item.fields.discoveryImage.url = `https:${discoveryImgUrl}`;
            item.fields.discoveryImage.altText = `${discoveryImgAltText}`;

            //Grab Strategy Image Asset
            let strategyImgUrl = "";
            let strategyImgAltText = "";
            const strategyImgId = item.fields.strategyImage.sys.id;
            const strategyImgData = assets.find(function(asset) { return asset.sys.id == strategyImgId });
            if (strategyImgData) {
                strategyImgUrl = strategyImgData.fields.file.url;
                strategyImgAltText = strategyImgData.fields.description;
            }
            item.fields.strategyImage.url = `https:${strategyImgUrl}`;
            item.fields.strategyImage.altText = `${strategyImgAltText}`;

            //Grab Visualization Image Asset
            let visualizationImgUrl = "";
            let visualizationImgAltText = "";
            const visualizationImgId = item.fields.visualizationImage.sys.id;
            const visualizationImgData = assets.find(function(asset) { return asset.sys.id == visualizationImgId });
            if (visualizationImgData) {
                visualizationImgUrl = visualizationImgData.fields.file.url;
                visualizationImgAltText = visualizationImgData.fields.description;
            }
            item.fields.visualizationImage.url = `https:${visualizationImgUrl}`;
            item.fields.visualizationImage.altText = `${visualizationImgAltText}`;

            //Grab Implementation Image Asset
            let implementationImgUrl = "";
            let implementationImgAltText = "";
            const implementationImgId = item.fields.implementationImage.sys.id;
            const implementationImgData = assets.find(function(asset) { return asset.sys.id == implementationImgId });
            if (implementationImgData) {
                implementationImgUrl = implementationImgData.fields.file.url;
                implementationImgAltText = implementationImgData.fields.description;
            }
            item.fields.implementationImage.url = `https:${implementationImgUrl}`;
            item.fields.implementationImage.altText = `${implementationImgAltText}`;

            //Grab Output Image Asset
            let outputImg1Url = "";
            let outputImg1AltText = "";
            const outputImg1Id = item.fields.outputImage1.sys.id;
            const outputImg1Data = assets.find(function(asset) { return asset.sys.id == outputImg1Id });
            if (outputImg1Data) {
                outputImg1Url = outputImg1Data.fields.file.url;
                outputImg1AltText = outputImg1Data.fields.description;
            }
            item.fields.outputImage1.url = `https:${outputImg1Url}`;
            item.fields.outputImage1.altText = `${outputImg1AltText}`;

            let outputImg2Url = "";
            let outputImg2AltText = "";
            const outputImg2Id = item.fields.outputImage2.sys.id;
            const outputImg2Data = assets.find(function(asset) { return asset.sys.id == outputImg2Id });
            if (outputImg2Data) {
                outputImg2Url = outputImg2Data.fields.file.url;
                outputImg2AltText = outputImg2Data.fields.description;
            }
            item.fields.outputImage2.url = `https:${outputImg2Url}`;
            item.fields.outputImage2.altText = `${outputImg2AltText}`;

            let outputImg3Url = "";
            let outputImg3AltText = "";
            const outputImg3Id = item.fields.outputImage3.sys.id;
            const outputImg3Data = assets.find(function(asset) { return asset.sys.id == outputImg3Id });
            if (outputImg3Data) {
                outputImg3Url = outputImg3Data.fields.file.url;
                outputImg3AltText = outputImg3Data.fields.description;
            }
            item.fields.outputImage3.url = `https:${outputImg3Url}`;
            item.fields.outputImage3.altText = `${outputImg3AltText}`;

            let outputImg4Url = "";
            let outputImg4AltText = "";
            const outputImg4Id = item.fields.outputImage4.sys.id;
            const outputImg4Data = assets.find(function(asset) { return asset.sys.id == outputImg4Id });
            if (outputImg4Data) {
                outputImg4Url = outputImg4Data.fields.file.url;
                outputImg4AltText = outputImg4Data.fields.description;
            }
            item.fields.outputImage4.url = `https:${outputImg4Url}`;
            item.fields.outputImage4.altText = `${outputImg4AltText}`;

            // Render Nested Assets
            const renderOptions = {
                renderNode: {
                    [BLOCKS.EMBEDDED_ASSET]: (node) => `<img src=https:${node.data.target.fields.file.url}>`
                }
            }

            //Render Rich Text
            item.fields.postContent = documentToHtmlString(item.fields.postContent, renderOptions);

            //Replace 11ty Date with Contentful Date
            item.fields.date = new Date(item.fields.postDate);

            //Return Fields
            return item.fields;
        });
        return items;
    })
    .catch(console.error);
};