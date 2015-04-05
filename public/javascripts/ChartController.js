App.controller('ChartController', function ($scope, ChartService) {
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'column'
            }
        },
        xAxis: {
            categories: [],
            crosshair: true
        },
        series: [{
            data: [],
            name: 'จำนวน'
        }],
        title: {
            text: 'สถิติผู้ใช้งาน'
        },

        loading: false
    };

    ChartService.all()
        .then(function (data) {

            $scope.users = data.rows;

            _.forEach(data.rows, function (v) {
                $scope.chartConfig.xAxis.categories.push(v.name);
                $scope.chartConfig.series[0].data.push(v.total);
            });
        }, function (err) {
            console.log(err);
        });

});
