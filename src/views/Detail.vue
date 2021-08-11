<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card class="mb-6">
        <v-card-title>Order detail</v-card-title>
        
        <v-divider></v-divider>
        
        <v-simple-table>
          <tbody>
            <tr>
              <td class="bold">Number</td>
              <td>{{ order.number }}</td>
            </tr>
            <tr>
              <td class="bold">Paid status</td>
              <td>{{ order.payment.status }}</td>
            </tr>
          </tbody>
        </v-simple-table>
        
        <v-divider></v-divider>
        
        <v-card-actions class="pa-6">
          <v-btn color="primary" block large @click="goToPay">
            <v-icon left>mdi-credit-card</v-icon> Pay
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card>
        <v-card-title>Billing address</v-card-title>
        
        <v-divider></v-divider>
        
        <v-simple-table>
          <tbody>
            <tr>
              <td class="bold">Client</td>
              <td>{{ order.billingAddress.firstName }} {{ order.billingAddress.lastName }}</td>
            </tr>
            <tr>
              <td class="bold">City</td>
              <td>{{ order.billingAddress.city }}, {{ order.billingAddress.country.name }}.</td>
            </tr>
            <tr>
              <td colspan="2">{{ order.billingAddress.address1 }}</td>
            </tr>
            <tr v-if="order.billingAddress.address2">
              <td colspan="2">{{ order.billingAddress.address2 }}</td>
            </tr>
            <tr v-if="order.billingAddress.address3">
              <td colspan="2">{{ order.billingAddress.address3 }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="8">
      <v-card :loading="loading">
        <v-card-title>
          Items List
          <v-spacer></v-spacer>
          <v-btn color="success" depressed small @click="dialog = true">
            <v-icon small left>mdi-plus</v-icon> Add item
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="order.items"
          hide-default-footer
        >
          <template v-slot:item.sku="{ item }">{{ item.sku || 'N/A' }}</template>
          <template v-slot:item.price="{ item }">$ {{ item.price }} {{ order.currency }}</template>

          <template v-slot:footer>
            <v-divider></v-divider>
            <div class="pa-3">
              <h3 class="text-right">Total: $ {{ total.toFixed(2) }} {{ order.currency }}</h3>
            </div>
          </template>
        </v-data-table>
      </v-card>

      <v-dialog
        v-model="dialog"
        persistent
        max-width="800px"
      >
        <v-card>
          <v-card-title>New item</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="itemForm"
              lazy-validation
            >
              <v-text-field
                v-model="newItem.sku"
                :rules="[rules.required]"
                label="SKU"
              />
              <v-text-field
                v-model="newItem.name"
                :rules="[rules.required]"
                label="Name"
              />
              <v-text-field
                v-model.number="newItem.quantity"
                :rules="[rules.required, rules.isNumber]"
                label="Quantity"
              />
              <v-text-field
                v-model.number="newItem.price"
                :rules="[rules.required, rules.isNumber]"
                label="Price"
                prefix="$"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success" small :disabled="!valid" @click="addItem">
              <v-icon small left>mdi-check</v-icon> Add new item
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" small @click="cloaseItemDialog">
              <v-icon small left>mdi-close</v-icon> Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    loading: false,
    dialog: false,
    valid: true,

    newItem: {
      sku: '',
      name: '',
      quantity: 0,
      price: 0,
    },

    rules: {
      required: v => !!v || 'The field is required',
      isNumber: v => /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(v) || 'Field must be a number',
    },

    headers: [
      { value: 'sku', text: 'SKU' },
      { value: 'name', text: 'Name' },
      { value: 'quantity', text: 'Quantity' },
      { value: 'price', text: 'Price' },
    ],
  }),

  computed: {
    ...mapGetters(['order']),

    total() {
      return this.order.items.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity)), 0)
    }
  },

  methods: {
    addItem() {
      const validate = this.$refs.itemForm.validate()
      
      if (!validate) {
        return false
      }
      
      this.order.items.push(this.newItem)
      
      this.cloaseItemDialog()

      this.$swal({
        title: 'Item was added successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
    },
    
    cloaseItemDialog() {
      this.dialog = false

      this.$refs.itemForm.resetValidation()
      
      this.newItem = {
        sku: '',
        name: '',
        quantity: 0,
        price: 0,
      }
    },

    goToPay() {
      this.$swal({
        title: 'Payment was successful',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  },
}
</script>

<style lang="scss">
.bold {
  font-weight: bold;
}
</style>