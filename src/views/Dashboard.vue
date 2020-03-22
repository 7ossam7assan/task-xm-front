<template>
    <v-container fluid>
        <template>
                <v-card
                        class="mx-auto"
                        max-width="500"
                        outlined
                >
                    <v-row

                    >
                        <v-col cols="1"></v-col>
                        <v-col cols="10">
                            <v-label>Company Symbol</v-label>
                            <v-autocomplete
                                    v-model="symbol"
                                    :items="symbols"
                                    outlined
                                    dense
                                    chips
                                    small-chips
                                    name="symbol"
                                    v-validate="'required'"
                            ></v-autocomplete>
                            <span v-if="submitted && errors.has('symbol')" class="invalid-feedback">
                              {{ errors.first('symbol') }}
                            </span>
                        </v-col>
                    </v-row>
                    <v-row

                    >
                        <v-col cols="1"></v-col>
                        <v-col cols="10">
                            <v-label>Start Date</v-label>

                            <v-menu
                                        v-model="pick_start_time_flag"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="start_date"

                                                readonly
                                                v-on="on"
                                                name="start_date"
                                                v-validate="'required'"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="start_date" @input="pick_start_time_flag = true"></v-date-picker>
                                </v-menu>
                            <span v-if="submitted && errors.has('start_date')" class="invalid-feedback">
                              {{ errors.first('start_date') }}
                            </span>
                        </v-col>
                    </v-row>


                    <v-row

                    >
                        <v-col cols="1"></v-col>
                        <v-col cols="10">
                            <v-label>End Date</v-label>

                            <v-menu
                                        v-model="pick_end_time_flag"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="end_date"
                                                readonly
                                                v-on="on"
                                                name="end_date"
                                                v-validate="'required'"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="end_date" @input="pick_end_time_flag = true"></v-date-picker>
                                </v-menu>
                            <span v-if="submitted && errors.has('end_date')" class="invalid-feedback">
                              {{ errors.first('end_date') }}
                            </span>
                        </v-col>
                    </v-row>


                    <v-row

                    >
                        <v-col cols="1"></v-col>
                        <v-col cols="10">
                            <v-label>E-mail</v-label>

                            <v-text-field
                                    v-model="email"
                                    name="email"
                                    v-validate="'required|email'"
                            ></v-text-field>
                            <span v-if="submitted && errors.has('email')" class="invalid-feedback">
                              {{ errors.first('email') }}
                            </span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6"></v-col>
                        <v-col cols="6" class="align-end">
                            <v-btn class="ml-5"  @click="submit">submit</v-btn>


                            <v-btn class="ml-4" @click="clear">clear</v-btn>

                        </v-col>
                    </v-row>

                </v-card>


            <v-divider class="tabes"></v-divider>

            <div >
                <v-tabs style="background-color: #fafafa" v-model="tab" grow>
                    <v-tab>Quotes History</v-tab>
                    <v-tab>Prices Chart</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <quotes :quotes="quotes_table_data" />
                    </v-tab-item>

                    <v-tab-item>
                        <div>
                            <prices-chart :quotes_prop="quotes_table_data" />
                        </div>
                    </v-tab-item>

                </v-tabs-items>
            </div>
        </template>
    </v-container>
</template>

<script>
import axios from 'axios'
import Quotes from '../components/historical-quotes/quotes-data-table'
import PricesChart from '../components/charts/open-close-prices-chart'
export default {
    name: "Dashboard",
    components: {
        Quotes,
        PricesChart
    },
    data(){
        return {
            symbols: [],
            companies_data: [],
            symbol:"",
            start_date:"",
            end_date:"",
            pick_start_time_flag: false,
            modal: false,
            pick_end_time_flag: false,
            email: "",
            submitted: false,
            quotes: [],
            quotes_table_data: [],
            tab: 0,
            prices_data: []
        };
    },

    mounted() {
        this.callSymbolsApi();

    },


    methods: {
        callSymbolsApi() {
            axios
                .get('https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/' +
                    'a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json')
                .then(res => {
                    this.symbols = res.data.map(symbols => symbols.Symbol)
                    this.companies_data = res.data
                    console.log(res.data)
                })
                .catch(err => console.log(err))
        },

        submit(){
            this.submitted = true
            this.$validator.validate().then(valid => {
                if (valid) {
                    // Successfully validated & update the data.

                    this.getHistoricalQuotes();
                    this.sendEmail();
                }
            });
        },

        // Date,Open,High,Low,Close,Volume,Ex-Dividend,Split Ratio,Adj. Open,Adj. High,Adj. Low,Adj. Close,Adj. Volume\
        getHistoricalQuotes(){
            axios
                .get('https://www.quandl.com/api/v3/datasets/WIKI/'+this.symbol+
                    '.csv?order=asc&start_date='+this.start_date+'&end_date='+this.end_date)
                .then(res => {
                    this.quotes = res.data.split('\n');
                    // console.log(this.quotes);
                    this.quotes.shift()
                    this.quotes.forEach(qoute => {
                        let quote_string_split = qoute.split(',');
                        this.quotes_table_data.push({
                            date: quote_string_split[0],
                            open: quote_string_split[1],
                            high: quote_string_split[2],
                            low: quote_string_split[3],
                            close: quote_string_split[4],
                            volume: quote_string_split[5],
                        })
                    })
                })
                .catch(err => console.log(err))
        },


        clear(){
            this.submitted = false;
            this.symbol = "";
            this.start_date = "";
            this.end_date = "";
            this.email = "";


        },

        sendEmail(){
            let that = this;
            let selected_company = this.companies_data.filter(company => {
                return company.Symbol == that.symbol
            })[0];

            console.log(selected_company["Company Name"])
            let form = {
                symbol: this.symbol,
                company_name: selected_company["Company Name"],
                start_date: this.start_date,
                end_date: this.end_date,
                email: this.email
            }
            axios.post('http://task.test/api/send-quote-email',form).then(res => {
                console.log(res)
            })
        }
    }
};
</script>

<style scoped>
    .tabes{
        margin-top: 100px;
    }

</style>
