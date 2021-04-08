<template>
  <base-card>
    <div class="row">
        <div class="col-6">
            <div>  
                <small><span class="text-muted">Date: &nbsp;</span><span class="text-success">{{ data.date }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Serial Number: &nbsp;</span> <span class="text-success"> {{ data.serial }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Office:&nbsp;</span> <span class="text-success"> {{ data.office }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Allotment Class:&nbsp;</span> <span class="text-success"> {{ data.allotclass }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">MFO/PAP:&nbsp;</span> <span class="text-success">{{ data.pap }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Activity:&nbsp;</span> <span class="text-success">{{ data.activity }}</span></small>
            </div>
        </div>
        <div class="col-6">
            <div>
                <small><span class="text-muted">UACS Code/Expenditure:&nbsp;</span> <span class="text-success">{{ data.uacscode }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Name:&nbsp;</span> <span class="text-success">{{ data.name }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Particulars:&nbsp;</span> <span class="text-success">{{ data.particular }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Obligation:&nbsp;</span> <span class="text-success">{{ data.obligation }}</span></small>
            </div>
            <div>
                <small><span class="text-muted">Disbursement:&nbsp;</span> <span class="text-success">{{ data.disbursement }}</span></small>
            </div>
            <div v-if="isLoggedIn" class="d-flex flex-row-reverse">
                <div>
                <button @click="openModal" class="btn btn-outline-success btn-sm mx-2" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fas fa-edit"></i></button>
                <button @click="openDelModal" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
  </base-card>
  <update-modal ref="modal" :data="data"></update-modal>
  <delete-modal ref="delmodal" :dataid="data.id"></delete-modal>
</template>

<script>
import DeleteModal from './DeleteModal.vue'
import UpdateModal from './UpdateModal.vue'

export default {
  props: ['data'],
  components: {
      UpdateModal,
    DeleteModal
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
     openModal() { 
        this.$refs.modal.show()  //executing the show method of child
      },
     openDelModal(){
        this.$refs.delmodal.show()
     }
  }
}
</script>