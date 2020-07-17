<template>
    <div>
        <md-card-content>
            <div v-if="!isAdmin" class="md-layout" >
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Дата *</label>
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
                <div class="md-layout-item md-small-size-100 md-size-66">
                    <md-field>
                        <label>Сумма *</label>
                        <md-input  v-model="sum" type="text" :class="{'border-danger': $v.model.sum.$error}"></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                        <label>Комментария</label>
                        <md-input  v-model="model.comment" ></md-input>
                    </md-field>
                </div>
                <div class="d-flex align-items-center justify-content-center w-100">
                    <button @click="save" class="btn btn-success" :disabled="disabled">
                        Сохранить
                    </button>
                </div>
            </div>

            <div class=" mt-5 ">
                <table class="table">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Сумма</th>
                        <th>Коментария</th>
                        <th v-if="isAdmin">ПТО</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="(item, i) in info.factExpenses">
                        <td>{{ i + 1}}</td>
                        <td>{{$moment(item.date).format('DD-MM-YYYY')}}</td>
                        <td>{{item.sum}}</td>
                        <td>{{item.comment}}</td>
                        <td  v-if="isAdmin">{{item.responsible.fio}}</td>
                        <td class="actions">
                            <span  v-if="isAdmin"  @click="deleteItem(i)" class="text-danger delete-item">Удалить</span>
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
        props: ['info'],
        data(){
            return {
                model:{
                    date:null,
                    sum: 0,
                    comment: null,
                    projectId: 0
                },
                disabled: false
            }
        },
        created(){
        },
        methods: {
            save(){
                this.disabled = true;
                this.$v.model.$touch();
                if(this.$v.model.$invalid){
                    this.errorNotify("Форма не правильно заполнено!!!");
                    this.disabled = false;
                    return;
                }
                this.model.projectId = this.info.id;
                this.$api.post('/api/FactExpense/AddFactExpense', this.model).then(
                    response => {
                        console.log(response)
                        this.$v.$reset();
                        this.info.factExpenses.push(response.data.result)
                        this.model = this.resetModel()
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                    }
                ).finally(() =>{
                    this.disabled = false;
                })
            },
            deleteItem(index){
                if(!confirm("Вы действительно хотите удалить?")){
                    return;
                }
                let factExpense = this.info.factExpenses[index]
                if(!factExpense){
                    return;
                }
                this.$api.delete('/api/FactExpense/RemoveFactExpense/'+factExpense.id).then(
                    response => {
                        this.successNotifyMini("Успешно удалено!!!")
                        this.info.factExpenses.splice(index, 1);
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                        console.log(error);
                    }
                )
            },
            resetModel(){
                return {
                    date:null,
                        sum: 0,
                        comment: null,
                        projectId: 0
                }
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
    .actions span{
        cursor: pointer;
    }
</style>