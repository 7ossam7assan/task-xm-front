<!--<template>-->
<!--    <v-container fluid>-->
<!--        <div class="small">-->
            <line-chart :chartdata="chartData" :options="chartOptions" />
<!--        </div>-->
<!--    </v-container>-->
<!--</template>-->

<script>
// import VueCharts from 'vue-chartjs'
import { Line } from "vue-chartjs";
export default {
    name: "progresss",
    extends: Line,
    components: {
        "line-chart": Line
    },
    props: ["quotes_prop"],
    data: () => ({
        chartData: {
            labels: [],
            datasets: [
                {
                    label: "Open Price",
                    borderColor: "#00f",
                    backgroundColor: "transparent",
                    data: [

                    ]
                },
                {
                    label: "Close Price",
                    borderColor: "#0f0",
                    backgroundColor: "transparent",

                    filled: false,
                    data: [

                    ]
                },
            ]
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false
        }
    }),
    created() {
        // console.log("props", this.labels_prop);
        let that = this;
        this.quotes_prop.forEach(quote => {
            // console.log(quote)
            that.chartData.labels.push(quote["date"]);
        });

        this.quotes_prop.forEach(quote => {
            // console.log(quote)
            that.chartData.datasets[0].data.push(quote["open"]);
        });

        this.quotes_prop.forEach(quote => {
            // console.log(quote)
            that.chartData.datasets[1].data.push(quote["close"]);
        });

        // this.labels_prop.forEach(label => {
        //     that.chartData.datasets[0].data.push(1);
        // });
        // this.labels_prop.forEach(label => {
        //     that.chartData.datasets[1].data.push(5);
        // });
        // this.labels_prop = ["2017-11-02"];

    },

    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    },
    methods: {},
    watch: {
        quotes_prop: {
            handler() {
                let that = this;
                this.quotes_prop.forEach(quote => {
                    console.log(quote)
                    that.chartData.labels.push(quote["date"]);
                });

                this.quotes_prop.forEach(quote => {
                    // console.log(quote)
                    that.chartData.datasets[0].data.push(quote["open"]);
                });

                this.quotes_prop.forEach(quote => {
                    // console.log(quote)
                    that.chartData.datasets[1].data.push(quote["close"]);
                });


            },
            deep: true
        }
    }
};
</script>

<style scoped lang="scss">

</style>
