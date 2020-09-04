<template>
    <div>
        <md-card-content>
            <div v-if="isResponsible" class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                        <label>Комментария</label>
                        <md-input  v-model="model.note" :class="{'border-danger': $v.model.note.$error}"></md-input>
                    </md-field>
                </div>
                <div class="d-flex align-items-center justify-content-center w-100">
                    <button @click="save" class="btn btn-success" :disabled="disabled">
                        Сохранить
                    </button>
                </div>
            </div>

            <div class="md-card-content mt-5">
                <div>
                    <div class="md-content md-table md-theme-default" >
                        <div class="md-content md-table-content md-scrollbar md-theme-default">
                            <table  class="table">
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Коментария</th>
                                    <th>Дата добавления</th>
                                    <th v-if="isAdmin ">ПТО</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in info.projectNotes">
                                    <td>{{ i + 1}}</td>
                                    <td>{{item.note}}</td>
                                    <td>{{$moment(item.date).format('DD-MM-YYYY HH:mm')}}</td>
                                    <td v-if="isAdmin ">{{item.responsible.fio}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                    note: null,
                },
                disabled: false
            }
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
                this.$api.post('/api/Project/AddProjectNote', this.model).then(
                    response => {
                        this.$v.$reset();
                        this.info.projectNotes.push(response.data.result);
                        this.model = this.resetModel()
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                    }
                ).finally(() =>{
                    this.disabled = false;
                })
            },
            resetModel(){
                return {
                    note: null
                }
            }
        },
        validations:{
            model:{
                note:{required}
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