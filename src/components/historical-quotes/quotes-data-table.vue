<template>
    <div>
        <v-card>
            <v-card-title>
                Quotes History
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :search="search"

            ></v-data-table>

        </v-card>
    </div>
</template>

<script>
export default {
    props:['quotes'],
    data: () => ({
        valid: false,
        search: "",
        headers: [
            {
                text: 'Date',
                align: 'start',
                sortable: false,
                value: 'date',
            },
            { text: 'Open', value: 'open' },
            { text: 'High', value: 'high' },
            { text: 'Low', value: 'low' },
            { text: 'Close', value: 'close' },
            { text: 'Volume', value: 'volume' }

        ],
        items: []

    }),
    created() {
       this.items = this.quotes;
    },

    watch:{
        quotes(q){
            this.items = q
        }
    }
};
</script>

<style scoped>

</style>
