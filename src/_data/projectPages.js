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
            item.fields.metaImage = `https:${metaImgUrl}`;

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