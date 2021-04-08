<template>
    <tr>
        <td scope="row"><small>{{ num + 1 }}</small></td>
        <td><small>{{ data.allotclass }}</small></td>
        <td class="text-truncate"><small>{{ data.pap_name }}</small></td>
        <td class="text-truncate"><small>{{ data.activity }}</small></td>
        <td class="text-truncate"><small>{{ data.office }}</small></td>
        <td class="text-right text-truncate"><small>{{ data.amount }}</small></td>
        <td class="text-right text-truncate">
            <small><div>
                <button @click="openModal" class="btn btn-outline-success btn-sm mx-2" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fas fa-edit"></i></button>
                <button @click="openDelModal" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
            </div></small>
        </td>
    </tr>
    <delete-modal ref="delmodal" :dataid="data.id" :comp="'transfer'"></delete-modal>
    <update-transfer ref="modal" :data="data" :mfopap="{id: data.pap_id, name: data.pap_name}"></update-transfer>
</template>
<script>
import DeleteModal from './DeleteModal.vue'
import UpdateTransfer from './UpdateTransfer'

export default {
  props: ['data','num'],
  components: {
    DeleteModal,
    UpdateTransfer
  },
  data() {
    
  },
  methods: {
    formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    },
    openDelModal(){
        this.$refs.delmodal.show()
    },
    openModal() { 
        this.$refs.modal.show() 
    }
  }
}
</script>

<style scoped>
.text-right {
    text-align: right;
}
</style>