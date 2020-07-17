<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <div class="d-flex flex-wrap align-items-center justify-content-between">
                            <h4 class="title">Пользователи</h4>
                            <button @click="addEditUser" class="btn btn-default">
                                Добавить
                            </button>
                        </div>
                        <!--            <p class="category">Here is a subtitle for this table</p>-->
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <md-table v-model="users" >
                                <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Логин">{{ item.login }}</md-table-cell>
                                    <md-table-cell md-label="ФИО">{{ item.fio }}</md-table-cell>
                                    <md-table-cell md-label="Тел">{{ item.phone }}</md-table-cell>
                                    <md-table-cell md-label="Тип">{{ item.userType == 1 ? 'Админ' : 'Пользователь' }}</md-table-cell>
                                    <md-table-cell md-label="Действие" class="actions">
                                        <div class="md-table-cell-container mr-2">
                                            <span @click="addEditUser(item)" class="action orange text-warning">Редактировать</span>
                                        </div>
                                        <div v-if="isAdmin" class="md-table-cell-container">
                                            <span class="action red text-danger" @click="deleteUser(item)">Удалить</span>
                                        </div></md-table-cell>
                                </md-table-row>
                            </md-table>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <modal name="addEditUser" :adaptive="true" width="50%" height="80%">
            <div class="object-form-section">
                <div class="modal-header">
                    <h5 class="modal-title">{{form.id > 0 ? 'Редактирование пользователя' : 'Добавление пользователя'}}</h5>
                    <button type="button" class="close"  @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="sections">
                    <div>
                        <md-card-content>
                            <div class="md-layout">
<!--                                md-size-33-->
                                <div class="md-layout-item md-small-size-100 md-size-100">
                                    <md-field>
                                        <label>Логин</label>
                                        <md-input v-model="form.login" :class="{'border-danger': $v.form.login.$error}" type="text"></md-input>
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-small-size-100 md-size-100">
                                    <md-field>
                                        <label>ФИО</label>
                                        <md-input v-model="form.fio" :class="{'border-danger': $v.form.fio.$error}" type="text"></md-input>
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-small-size-100 md-size-100">
                                    <label>Тел</label>
                                    <input-mask v-model="form.phone" class="form-control input-mask" mask="+(999) 99 999 99 99" maskChar=" "  :class="{'border-danger': $v.form.phone.$error}"></input-mask>
                                    <!--
                                                                        <md-field>
                                                                                <md-input v-model="form.phone" :class="{'border-danger': $v.form.phone.$error}" type="text"></md-input>-->
                                </div>
                                <div class="md-layout-item md-small-size-100 md-size-100">
                                    <md-field>
                                        <label>Пароль</label>
                                        <md-input v-model="form.password" :class="{'border-danger': $v.form.password.$error}" type="password"></md-input>
                                    </md-field>
                                </div>
                                <div v-if="!form.id" class="md-layout-item md-small-size-100 md-size-100">
                                    <md-field>
                                        <label>Тип пользователя</label>
                                        <md-select v-model="form.userType" :class="{'border-danger': $v.form.userType.$error}">
                                            <md-option v-for="item in userTypeList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                                <div class="d-flex align-items-center justify-content-center mt-5 w-100">
                                    <button @click="save" class="btn btn-primary" :disabled="disabled">
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </md-card-content>
                    </div>
                </div>
            </div>
            <div class="footer">
        
            </div>
        </modal>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        name: "Projects",
        data(){
            return {
                users:[],
                cleanForm: {},
                userTypeList: [
                    {
                        id: 1,
                        name: 'Админ'
                    },
                    {
                        id: 0,
                        name: 'Пользователь'
                    }
                ],
                form: {
                    "login": "",
                    "password": "",
                    "fio": "",
                    "phone": "",
                    "userType": 0
                },
                disabled:false
            }
        },
        created() {
            if(!this.isAdmin){
                this.$router.push("/dashboard")
            }
            this.cleanForm = {...this.form};
            this.getAllUser();
        },
        validations: {
            form: {
                "login": {required},
                "password": {required},
                "fio": {required},
                "phone": {required},
                "userType": {required}
            }
        },
        methods: {
            addEditUser(form = this.cleanForm) {
                this.form = {...form}
                this.$modal.show('addEditUser')
            },
            save() {
                this.disabled = true;
                this.$v.form.$touch()
                if (this.$v.form.$invalid) {
                    this.disabled = false;
                    return
                }

                let a;
                if (this.form.id) {
                    a = this.$api.post('/api/User/EditUser', this.form)
                } else {
                    a = this.$api.post('/api/User/AddUser', this.form)
                }
                a.then(
                    res => {
                        this.$modal.hide('addEditUser');
                        this.$v.$reset()
                        this.getAllUser();
                    },
                    err => {
                        console.log(err.response);
                    }
                ).finally(() =>{
                    this.disabled = false;
                })
            },
            deleteUser(user){
                if(!user){
                    return;
                }
                if(!confirm("Вы действительно хотите удалить?")){
                    return;
                }
                let index = this.users.findIndex(i => i.id === user.id)

                this.$api.delete('/api/User/RemoveUser/'+user.id).then(
                    response => {
                        this.users.splice(index, 1);
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                    }
                )
            },
            getAllUser() {
                this.$api.get('/api/User/GetUsers').then(
                    res => {
                        this.users = res.data.result.users;
                    },
                    err => {
                        console.log(err.response);
                    }
                )
            },
            closeModal(){
                this.$modal.hide('addEditUser');
            }
        }
    }
</script>

<style scoped>
    .btn-default{
        background: white;
        color: #2fbf00;
    }
    .form-control.input-mask{
        border: 0;
    }
</style>

