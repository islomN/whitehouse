<template>
    <div>
        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-66">
                    <md-field>
                        <label>Наименование объекта *</label>
                        <md-input v-model="info.description" :class="{'border-danger': $v.info.description.$error}" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>В кратце</label>
                        <md-input v-model="info.shortDescription"  type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Заказчик *</label>
                        <md-input v-model="info.customer" :class="{'border-danger': $v.info.customer.$error}" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Номер договора *</label>
                        <md-input v-model="info.contractNumber" :class="{'border-danger': $v.info.contractNumber.$error}" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Дата договора *</label>
<!--                        <md-input v-model="info.contractDate" type="text"></md-input>-->
                        <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
                                              :class="{'border-danger': $v.info.contractDate.$error}"
                                              :auto-close="true"
                                              @input="()=> {}"
                                              v-model="info.contractDate"
                                              :only-date="true"
                                              format="YYYY-MM-DD"
                                              formatted="YYYY-MM-DD"
                                              label="Дата договора"
                        />
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Подрядная организация *</label>
                        <md-input v-model="info.contractProvider" :class="{'border-danger': $v.info.contractProvider.$error}" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Стоимость по договору (СМР) *</label>
                        <md-input @keypress="eCode" v-model="contractPrice" :class="{'border-danger': $v.info.contractPrice.$error}" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Тех Надзор *</label>
                        <md-input v-model="info.techSupervision" :class="{'border-danger': $v.info.techSupervision.$error}" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <label>Тел номер *</label>
                    <input-mask v-model="info.techSupervisionPhone" class="form-control input-mask" mask="+(999) 99 999 99 99" maskChar=" "  :class="{'border-danger': $v.info.techSupervisionPhone.$error}"></input-mask>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>ПТО *</label>
                        <md-select v-model="info.responsible.id" :class="{'border-danger': $v.info.responsible.id.$error}">
                            <md-option v-for="item in responsibles" :key="item.id" :value="item.id">
                                {{item.fio}}
                            </md-option>
                        </md-select>
                    </md-field>
                </div>
                <div v-if="info.id > 0" class="md-layout-item md-small-size-100 md-size-33">
                  <label for="isFinished">Завершён</label>
                  <input v-model="info.isFinished" id="isFinished" type="checkbox" class="checkbox">
                </div>
                <div class="d-flex align-items-center justify-content-center mt-5 w-100">
                    <button @click="save" class="btn btn-success" :disabled="disabled">
                        Сохранить
                    </button>
                </div>

            </div>
        </md-card-content>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        name: "MainSection",
        props:{
            currentInfo: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                info: {
                    description: '',
                    shortDescription: "",
                    contractNumber: "",
                    contractDate: null,
                    customer: "",
                    contractProvider: "",
                    contractPrice: '',
                    techSupervision: "",
                    techSupervisionPhone: "",
                    responsible: {}
                },
                responsibles:[],
                disabled: false
            }
        },
        validations: {
            info: {
                description: {required},
                contractNumber: {required},
                contractDate: {required},
                customer: {required},
                contractProvider: {required},
                contractPrice: {required},
                techSupervision: {required},
                techSupervisionPhone: {required},
                responsible: {
                    id: {required}
                }
            },
        },
        created() {
            this.info = this.currentInfo
            this.getAllUser();
        },
        methods: {
            getAllUser() {
                this.$api.get('/api/User/GetUsers').then(
                    response => {
                        this.responsibles = response.data.result.users.filter(i => i.userType === 0);
                    },
                    error => {
                        console.log(error.response);
                    }
                )
            },
            save() {
                this.disabled = true;
                this.$v.info.$touch()
                if (this.$v.info.$invalid) {
                    this.disabled = false;
                    return
                }
                let form = {...this.info};
                form.contractPrice = +form.contractPrice;
                form.responsible = this.responsibles.find(item => item.id === form.responsible.id);
                if(this.info.id > 0){
                    this.$api.put("/api/Project/UpdateProject", form).then(
                        response => {
                            this.successNotify("Успешно сахранено!!!")
                            this.$emit('switching-modal', response.data.result)
                        },
                        error => {
                            this.errorNotify(error.response.data.error.errorMessage)
                        }
                    )
                    .finally(() =>{
                        this.disabled = false;
                    })
                }else{
                    this.$api.post("/api/Project/AddProject", form)
                        .then(
                            response => {
                                this.successNotify("Успешно сахранено!!!")
                                this.$emit('switching-modal', response.data.result, false)
                            },
                            error => {
                                this.errorNotify(error.response.data.error.errorMessage)
                            }
                        )
                        .finally(() =>{
                            this.disabled = false;
                        })
                }

            },
            eCode(event) {
                if (isNaN(event.key)) {
                    event.preventDefault();
                }
            },
        },
        computed:{
            contractPrice:{
                get(){
                    return this.numeralFormat(this.info.contractPrice)
                },
                set(val){
                    this.info.contractPrice = this.numeralFormatToNumber(val)
                }
            }
        }
    }
</script>

<style >
.md-select-menu{
    z-index: 100000 !important;
}
.checkbox{
  height: 20px;
  width: 40px;
}
</style>