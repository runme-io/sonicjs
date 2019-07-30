var dataService = require('./data.service');
var helperService = require('./helper.service');

var fs = require('fs');
const cheerio = require('cheerio')
const axios = require('axios');
const ShortcodeTree = require('shortcode-tree').ShortcodeTree;
const chalk = require('chalk');
const log = console.log;



module.exports = {

    getMenu: async function (menuName) {
        let menuData = await dataService.getContentByContentTypeAndTitle('menu', menuName);
        let links = menuData.data.links;
        let menu = [];

        for (let index = 0; index < links.length; index++) {
            const item = links[index];
            let hasChildren = this.hasChildren(links, index);

            menu.push({
                url: item.url,
                title: item.title,
                hasChildren: hasChildren
            });
        }

        // menuData.data.links.forEach(item => {
        //     menu.push({url: item.url});
        // });

        return menu;
    },

    hasChildren: function (links, currentLinkIndex) {
        if (currentLinkIndex < links.length -1) {
            let currentLink = links[currentLinkIndex];
            let nextLink = links[currentLinkIndex + 1];
            if (currentLink.level == 0 && nextLink.level == 1) {
                return true;
            }
        }

        return false;
    }

}