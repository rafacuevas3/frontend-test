<template>
  <v-card>
    <v-card-title>
      Orders list
      <v-spacer></v-spacer>
      <v-btn color="success" depressed small @click="fetch">
        <v-icon small left>mdi-refresh</v-icon> Actualizar
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
    >
      <template v-slot:item.payment="{ item }">{{ item.payment.status }}</template>
      <template v-slot:item.status="{ item }">{{ item.status.status }}</template>
      <template v-slot:item.items="{ item }">{{ item.items.length }}</template>
      <template v-slot:item.details="{ item }">
        <v-btn color="primary" x-small @click="goToDetail(item)">
          <v-icon x-small left>mdi-eye</v-icon> Details
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Home',

  data: () => ({
    loading: false,

    headers: [
      { value: 'number', text: 'Number' },
      { value: 'name', text: 'Name' },
      { value: 'payment', text: 'Payment status' },
      { value: 'items', text: 'Items' },
      { value: 'status', text: 'Status' },
      { value: 'details', text: 'Details' },
    ],
    items: [],
  }),

  methods: {
    ...mapMutations(['setOrder']),
    
    fetch() {
      this.loading = true
      
      this.axios.get('https://eshop-deve.herokuapp.com/api/v2/orders').then(response => {
        this.items = response.data.orders

        this.loading = false
      })
    },
    goToDetail(order) {
      this.setOrder(order)

      this.$router.push({ name: 'Detail' })
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetch())
  }
}
</script>
