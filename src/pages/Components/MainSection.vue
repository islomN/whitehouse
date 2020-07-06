<template>
    <div>
        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-66">
                    <md-field>
                        <label>Наименование объекта</label>
                        <md-input v-model="info.description" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>В кратце</label>
                        <md-input v-model="info.shortDescription" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Заказчик</label>
                        <md-input v-model="info.customer" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Номер договора</label>
                        <md-input v-model="info.contractNumber" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Дата договора</label>
<!--                        <md-input v-model="info.contractDate" type="text"></md-input>-->
                        <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
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
                        <label>Подрядная организация</label>
                        <md-input v-model="info.contractProvider" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Стоимость по договору (СМР)</label>
                        <md-input @keypress="eCode" v-model="info.contractPrice" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Тех Надзор</label>
                        <md-input v-model="info.techSupervision" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Тел номер</label>
                        <md-input v-model="info.techSupervisionPhone" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>ПТО</label>
                        <md-select v-model="info.responsible.id">
                            <md-option v-for="item in responsibles" :key="item.id" :value="item.id">
                                {{item.fio}}
                            </md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="d-flex align-items-center justify-content-center mt-5 w-100">
                    <button @click="save" class="btn btn-primary">
                        Сохранить
                    </button>
                </div>
            </div>
        </md-card-content>
    </div>
</template>

<script>
    export default {
        name: "MainSection",
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
                responsibles:[]
            }
        },
        created() {
            this.getAllUser();
        },
        methods: {
            getAllUser() {
                this.$api.get('/api/User/GetUsers').then(
                    response => {
                        this.responsibles = response.data.result.users;
                    },
                    error => {
                        console.log(error.response);
                    }
                )
            },
            save() {
                let form = {...this.info};
                form.contractPrice = +form.contractPrice;
                form.responsible = this.responsibles.find(item => item.id === form.responsible.id);
                this.$api.post("/api/Project/AddProject", form).then(
                    response => {
                        console.log(response);
                    },
                    error => {
                        console.log(error.response);
                    }
                )
            },
            eCode(event) {
                if (isNaN(event.key)) {
                    event.preventDefault();
                }
            },
        }
    }
</script>

<style >
.md-select-menu{
    z-index: 100000 !important;
}
</style>