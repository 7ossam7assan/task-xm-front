
<line-chart :chartdata="chartData" :options="chartOptions" />


<script>
import { Line } from "vue-chartjs";
export default {
    name: "open-close-prices-chart",
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
        let that = this;
        this.quotes_prop.forEach(quote => {
            that.chartData.labels.push(quote["date"]);
        });

        this.quotes_prop.forEach(quote => {
            that.chartData.datasets[0].data.push(quote["open"]);
        });

        this.quotes_prop.forEach(quote => {
            that.chartData.datasets[1].data.push(quote["close"]);
        });

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
                    that.chartData.labels.push(quote["date"]);
                });

                this.quotes_prop.forEach(quote => {
                    that.chartData.datasets[0].data.push(quote["open"]);
                });

                this.quotes_prop.forEach(quote => {
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
