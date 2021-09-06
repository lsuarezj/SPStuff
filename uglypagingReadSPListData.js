
function GetPageData(listName, itemsPerPage, pageToLoad, selector) {


    siteURL = _spPageContextInfo.webAbsoluteUrl;
    console.log("from top nav - " + siteURL);
    var toskip = (pageToLoad * itemsPerPage) - itemsPerPage;
    var endpointUrl = siteURL + "/_api/web/lists/getbytitle('" + listName + "')/items?$skiptoken=" + encodeURIComponent('Paged=TRUE&p_SortBehavior=0&p_ID=' + (toskip) + '&$top=' + itemsPerPage);

    console.log(endpointUrl);
    $.ajax({
        url: endpointUrl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            console.log(data)

            $(selector).empty();
            data.d.results.forEach(element => {
                $(selector).append(element.Title);
            });


        },
        eror: function (data) {
            console.log("An error occurred. Please try again.");
        }
    });


}

function initPager(config) {

    var length = Math.round(config.allItems / config.itemsPerPage);

    for (let index = 0; index < length; index++) {
        var displayPage = index + 1;
        $(config.selector).append(`<li onClick="GetPageData('${config.listName}',${config.itemsPerPage},${displayPage},'${config.contSelector}')">${displayPage}</li>`);
    }
}

$(function () {
    var listName = 'Directorio';
    siteURL = _spPageContextInfo.webAbsoluteUrl;
    console.log("from top nav - " + siteURL);
    var apiPath = siteURL + `/_api/web/lists/GetByTitle('${listName}')/items`;

    //get total
    $.ajax({
        url: siteURL + `/_api/web/lists/GetByTitle('${listName}')?$Select=ItemCount,Title`,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            // console.log(data);
            initPager({ selector: "#pager", allItems: data.d.ItemCount, itemsPerPage: 2, listName: listName, contSelector: '.cont' });

        }
    });


})
