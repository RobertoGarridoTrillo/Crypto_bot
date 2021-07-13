var chart = LightweightCharts.createChart(document.getElementById('chart'), {
    width: 800,
    height: 500,
    layout: {
        backgroundColor: '#000000',
        textColor: 'rgba(255, 255, 255, 0.9)',
    },
    grid: {
        vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
});

var candleSeries = chart.addCandlestickSeries({
    upColor: 'rgba(255, 144, 0, 1)',
    downColor: '#000',
    //borderDownColor: 'rgba(255, 144, 0, 1)',
    borderDownColor: '#ff0000',
    borderUpColor: '#00ff00',
    wickDownColor: '#ff0000',
    wickUpColor: '#ff0000'
});

candleSeries.applyOptions({
    priceLineVisible: true,
    priceLineWidth: 1,
    priceLineColor: '#4682B4',
    priceLineStyle: 3,
})
// I let this only to get some of data on the board
fetch('http://localhost:5000/history')
    .then((r) => r.json())
    .then((response) => {
        candleSeries.setData(response);
    });

var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btceur@kline_1m")

binanceSocket.onmessage = function (event) {

    let candle = JSON.parse(event.data)

    let time = new Date(candle.E);

    candleSeries.update({
        time: candle.E,
        open: candle.k.o,
        high: candle.k.h,
        low: candle.k.l,
        close: candle.k.o
    });

    console.log(candle.E + " " + time)

}

