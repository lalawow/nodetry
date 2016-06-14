var table
$(document).ready(function() {
    initTable()
})

var initTable = function() {
    getNewTable("/stocks/queryplay6")
}


var addStock = function() {
    var stock = $("#stockNumber").val()
        //    console.log(stock)
    getNewTable("/stocks/queryplay7/addStock=" + stock)
}

var removeStock = function() {
    var stock = $("#stockNumber").val()
        //    console.log(stock)
    getNewTable("/stocks/queryplay7/deleteStock=" + stock)
}

var refreshTable = function() {
    table.destroy()
    $('#example').children("tbody").html("")
    initTable()
}

var getNewTable = function(url_string) {
    var tbody = $('#example').children("tbody")
    if (tbody.length > 0) {
        table.destroy()
        tbody.html("")
    }
    $.getJSON(url_string, function(res) {
        var tabledata = res.result
        table = $('#example').DataTable({
            data: tabledata,
            columns: [{
                data: "id"
            }, {
                data: "stock_id"
            }, {
                data: "name"
            }, {
                data: "currentPrice",
                render: $.fn.dataTable.render.number(',', '.', 2, '$')
            }, {
                data: "change",
                render: $.fn.dataTable.render.number(',', '.', 2, '', '%')
            }, {
                data: "avg_price",
                render: $.fn.dataTable.render.number(',', '.', 2, '$')
            }, {
                data: "dev",
                render: $.fn.dataTable.render.number(',', '.', 2, '', '%')
            }, {
                data: "data_date"
            }, {
                data: "data_time"
            }],
            "order": [
                [0, "asc"]
            ],
            paging: false,
            searching: false,
            "info": false,
        })
        var n = tabledata.length
        for (var i = 0; i < n; i++) {
            var change = parseFloat(tabledata[i].change)
            if (change > 0) {
                table.cell(i, 4).nodes().to$().addClass("redFont")
                table.cell(i, 3).nodes().to$().addClass("redFont")
            }
            if (change < 0) {
                table.cell(i, 4).nodes().to$().addClass("greenFont")
                table.cell(i, 3).nodes().to$().addClass("greenFont")
            }

            var dev = parseFloat(tabledata[i].dev)
            if (dev >= 0) {
                table.cell(i, 6).nodes().to$().addClass("redFont")

            } else if (dev < 0) {
                table.cell(i, 6).nodes().to$().addClass("greenFont")

            } else {
                table.cell(i, 6).nodes().to$().text("")
            }
            table.cell(i, 0).nodes().to$().addClass("blueFont")
            table.cell(i, 1).nodes().to$().addClass("blueFont")
            table.cell(i, 2).nodes().to$().addClass("blueFont")
        }

    })



}