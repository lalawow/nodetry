var table
$(document).ready(function() {
/*
    $.getJSON("/stocks/queryplay6", function(res) {
        var tabledata = res.result
        var table = $('#example').DataTable({
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
                render: $.fn.dataTable.render.number(',', '.', 2, '','%')
            }, {
                data: "avg_price",
                render: $.fn.dataTable.render.number(',', '.', 2, '$')
            }, {
                data: "dev",
                render: $.fn.dataTable.render.number(',', '.', 2, '','%')
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

*/

    initTable()

})

var initTable = function() {
        $.getJSON("/stocks/queryplay6", function(res) {
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
                render: $.fn.dataTable.render.number(',', '.', 2, '','%')
            }, {
                data: "avg_price",
                render: $.fn.dataTable.render.number(',', '.', 2, '$')
            }, {
                data: "dev",
                render: $.fn.dataTable.render.number(',', '.', 2, '','%')
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
        console.log("refresh")

}


var addStock = function() {
    var stock = $("#stockNumber").val()
    console.log(stock)
    setTimeout(refreshTable(),100)
}

var removeStock = function() {
    var stock = $("#stockNumber").val()
    console.log(stock)
}
