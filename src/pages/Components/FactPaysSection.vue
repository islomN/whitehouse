<template>
    <div>
        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Дата</label>
                        <!--                        <md-input v-model="info.contractDate" type="text"></md-input>-->
                        <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
                                              :class="{'border-danger': $v.model.date.$error}"
                                              :auto-close="true"
                                              @input="()=> {}"
                                              v-model="model.date"
                                              :only-date="true"
                                              format="YYYY-MM-DD"
                                              formatted="YYYY-MM-DD"
                                              label="Дата"
                        />
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Сумма *</label>
                        <md-input  v-model="sum" :class="{'border-danger': $v.model.sum.$error}" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33 prepay">
                    <md-field>
                        <label>Предоплата</label>
                        <input  v-model="model.isPrepay" type="checkbox"/>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                        <label>Комментария</label>
                        <md-textarea  v-model="model.comment" ></md-textarea>
                    </md-field>
                </div>
                <div class="d-flex align-items-center justify-content-center w-100">
                    <button @click="save" class="btn btn-success">
                        Сохранить
                    </button>
                </div>
            </div>

            <div class=" mt-5">
                <table  class="table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Предоплата</th>
                            <th>Коментария</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in info.factPays">
                            <td>{{ i + 1}}</td>
                            <td>{{$moment(item.data).format('DD-MM-YYYY')}}}</td>
                            <td>{{numeralFormat(item.sum)}}</td>
                            <td class="text-success">{{item.isPrepay? "Предоплата":""}}</td>
                            <td>{{item.comment}}</td>
                            <td>
                                <span v-if="isAdmin" @click="deleteItem(i)" class="text-danger delete-item">Удалить</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </md-card-content>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        name: "FactPaysSection",
        props: ['info'],
        data(){
            return {
                model:{
                    date:null,
                    sum: null,
                    comment: null,
                    isPrepay: false,
                    projectId: 0
                }
            }
        },
        methods: {
            save(){
                this.$v.model.$touch();
                if(this.$v.model.$invalid){
                    this.errorNotify("Форма не правильно заполнено!!!")
                    return;
                }
                this.model.projectId = this.info.id;
                this.$api.post('/api/FactPays/AddFactPayed', this.model).then(
                    response => {
                        // this.info.push(response.data.result);
                        this.$v.$reset();
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                    }
                )
            },
            deleteItem(index){
                if(!confirm("Вы действительно хотите удалить?")){
                    return;
                }
                let factPay = this.info.factPays[index]
                if(!factPay){
                    return;
                }
                this.$api.delete('/api/FactPays/RemoveFactPay/'+factPay.id).then(
                    response => {
                        this.info.factPays.splice(index, 1);
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                    }
                )
            }
        },
        computed:{
            sum:{
                get(){
                    return this.numeralFormat(this.model.sum)
                },
                set(val){
                    this.model.sum = this.numeralFormatToNumber(val)
                }
            }
        },
        validations:{
            model:{
                date:{required},
                sum: {required}
            }
        }
    }
</script>

<style >
    .md-select-menu{
        z-index: 100000 !important;
    }
    .prepay input{
        margin-left: 100px;
    }
    .btn-default {
        background: white;
        color: #2fbf00;
    }
</style>