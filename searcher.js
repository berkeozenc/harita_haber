var Searcher = {

    search: function(site) {
        var addressList = [];
        if (site.code == 'hurriyet') {
            addressList = ["adana", "ankara", "rize", "bursa"];
        }

        return addressList;
    }
};

module.exports = Searcher;
