/*
var tabledata = [{
    "name": "Tiger Nixon",
    "position": "System Architect",
    "salary": "$3,120",
    "start_date": "2011/04/25",
    "office": "Edinburgh",
    "extn": "5421"
}, {
    "name": "Garrett Winters",
    "position": "Director",
    "salary": "$5,300",
    "start_date": "2011/07/25",
    "office": "Edinburgh",
    "extn": "8422"
}]
*/


$(document).ready(function() {
    $.getJSON("/stocks/queryplay5", function(res) {
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



})


var addStock = function() {
    var stock = $("#stockNumber").val()
    console.log(stock)
}

var removeStock = function() {
    var stock = $("#stockNumber").val()
    console.log(stock)
}

/*
var init_pes = {
    id: "序号",
    stock_id: "代码",
    name: "名称",
    currentPrice: "价格",
    change: "涨幅%",
    avg_price: "均价",
    dev: "均价差%",
    data_date: "日期",
    data_time: "时间"
}
*/