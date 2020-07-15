<template>
    <div v-if="info.id">
        <template v-if="show === 'allInfo'">
            <div v-if="!isAdmin" class="mb-3 mt-2">
                <div class="md-layout">

                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                            <label>Дата</label>
                            <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
                                                  :class="{'border-danger': $v.createForm.date.$error}"
                                                  :auto-close="true"
                                                  @input="()=> {}"
                                                  v-model="createForm.date"
                                                  :only-date="true"
                                                  format="YYYY-MM-DD"
                                                  formatted="YYYY-MM-DD"
                                                  label="Дата договора"
                            />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-66">
                        <md-field>
                            <label>Сумма</label>
                            <md-input v-model="sum" :class="{'border-danger': $v.createForm.sum.$error}" type="text"></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Коментарий</label>
                            <md-input v-model="createForm.comment" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mt-2 w-100">
                        <button @click="saveCreateNew" class="btn btn-success">
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
            <div class="md-card-content">
                <div>
                    <div class="md-content md-table md-theme-default" >
                        <div class="md-content md-table-content md-scrollbar md-theme-default">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            Дата
                                        </th>
                                        <th>
                                            Коментарий
                                        </th>
                                        <th>
                                            Сумма
                                        </th>
                                        <th>
                                            Файлы
                                        </th>
                                        <th v-if="isAdmin">
                                            ПТО
                                        </th>
                                        <th v-if="isAdmin">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in info.factAchievements" :key="i" class="md-table-row">
                                    <td>
                                        {{item.date ? $moment(item.date).format('DD-MM-YYYY') : ''}}
                                    </td>
                                    <td >
                                       {{item.comment}}
                                    </td>
                                    <td>
                                        {{numeralFormat(item.sum)}}
                                    </td>
                                    <td class="actions">
<!--                                        <div class="md-table-cell-container">-->
<!--                                            <button @click="showFiles(item)" class="btn btn-primary">Открыть</button>-->
<!--                                        </div>-->
                                        <span @click="showFiles(item)" class="text-success delete-item">Посмотреть</span>
                                    </td>
                                    <td v-if="isAdmin">
                                        {{item.responsible.fio}}
                                    </td>
                                    <td  class="actions" v-if="isAdmin">
                                        <span  @click="deleteItem(i)" class="text-danger delete-item">Удалить</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="show === 'fileInfo'">
            <div class="mb-3 mt-2 actions">
                <span @click="show = 'allInfo'" class="text-success">
                    Назад
                </span>
            </div>
            <div v-if="!isAdmin">
                <label v-if="!selectedFile.name" class="file-upload" style="cursor: pointer">
                    <input type="file" @change="takeFile" class="d-none">
                    <div class="d-flex d-flex justify-content-center icon btn btn-file">
                        <img src="/img/images.png" >
                        <span>Загрузить</span>
                    </div>
                </label>
                <div v-else>
                    <div class="row">
                        <div class="col-6">
                            <div class="row">
                                <div class="col-6">
                                    <input v-model="form.name" :class="{'border-danger':!form.name && touched}" class="form-control" type="text">
                                </div>
                                <div class="col-6">
                                    <select v-model="form.FileCategoryInfo.id" :class="{'border-danger': !form.FileCategoryInfo.id && touched}" class="form-control">
                                        <option v-for="item in fileCategoryList" :value="item.id">
                                            {{item.name}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-wrap align-items-center justify-content-between">
                                <input style="width: calc(100% - 200px)" :value="selectedFile.name" class="form-control" disabled type="text">
                                <button @click="selectedFile = {}" style="width: 80px; margin-left: 10px; margin-right: 10px" class="btn btn-danger">
                                    Убрать
                                </button>
                                <button @click="save" style="width: 100px" class="btn btn-primary">
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    
            <div class="md-card-content">
                <div>
                    <div class="md-content md-table md-theme-default" >
                        <div class="md-content md-table-content md-scrollbar md-theme-default">
                            <table class="tables">
                                <thead>
                                <tr>
                                    <th>
                                        №
                                    </th>
                                    <th>
                                        Наименование объекта
                                    </th>
                                    <th>
                                        Категория файла
                                    </th>
                                    <th >
                                        Файл
                                    </th>
                                    <th v-if="isAdmin">
                                        ПТО
                                    </th>
                                    <th v-if="isAdmin">

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,i) in selectedObj.files" :key="i" class="md-table-row">
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">{{i+1}}</div>
                                    </td>
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">{{item.name}}</div>
                                    </td>
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">{{item.fileCategoryInfo.name}}</div>
                                    </td>
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">
                                            <a :href="item.url" target="_blank" download>Скачать</a>
                                        </div>
                                    </td>
                                    <td  v-if="isAdmin">{{item.responsible.fio}}</td>
                                    <td  v-if="isAdmin" class="actions">
                                        <span @click="deleteFileItem(i)" class="text-danger delete-item">Удалить</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </template>
        <template v-if="show === 'createNew'">
            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Коментарий</label>
                            <md-input v-model="createForm.comment" :class="{'border-danger': $v.createForm.comment.$error}" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Сумма</label>
                            <md-input v-model="createForm.sum" :class="{'border-danger': $v.createForm.sum.$error}" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                            <label>Дата</label>
                            <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
                                                  :class="{'border-danger': $v.createForm.date.$error}"
                                                  :auto-close="true"
                                                  @input="()=> {}"
                                                  v-model="createForm.date"
                                                  :only-date="true"
                                                  format="YYYY-MM-DD"
                                                  formatted="YYYY-MM-DD"
                                                  label="Дата договора"
                            />
                        </md-field>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mt-5 w-100">
                        <button @click="saveCreateNew" class="btn btn-primary">
                            Сохранить
                        </button>
                    </div>
                </div>
            </md-card-content>
        </template>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        name: "FactAchievementsSection",
        props: ['info', 'openProjectInfoSection'],
        data() {
            return{
                touched: false,
                show: 'allInfo',
                createForm: {
                    projectId: this.info.id,
                    date: null,
                    sum: null,
                    comment: null
                },
                selectedObj: {
                    files: []
                },
                cleanForm: {},
                form: {
                    name: '',
                    FactAchievementId: null,
                    FileCategoryInfo: {
                        id: null
                    }
                },
                selectedFile: {},
                fileCategoryList: []
            }
        },
        created() {
            this.getFileCategoryList();
        },
        validations: {
            createForm: {
                date: {required},
                sum: {required}
            },
        },
        methods: {
            saveCreateNew() {
                this.$v.createForm.$touch();
                if (this.$v.createForm.$invalid) {
                    return;
                }
                let form = {...this.createForm};
                form.sum = +form.sum;
                this.$api.post('/api/FactAchievement/AddFactAchievement', form).then(
                    response => {
                        this.$v.createForm.$reset();
                        this.createForm.date = null;
                        this.createForm.sum = null;
                        this.createForm.comment = null;
                        this.show = 'allInfo';
                        this.info.factAchievements.push(response.data.result);
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
                let factAchievement = this.info.factAchievements[index]
                if(!factAchievement){
                    return;
                }
                this.$api.delete('/api/FactAchievement/RemoveFactAchievement/'+factAchievement.id).then(
                    response => {
                        this.successNotifyMini("Успешно удалено!!!")
                        this.info.factAchievements.splice(index, 1);
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                    }
                )
            },

            showFiles(obj) {
                this.form.FactAchievementId = obj.id;
                this.selectedObj = obj;
                this.show = 'fileInfo'
            },
            getFileCategoryList() {
                this.$api.get('/api/Project/GetFileCategories').then(
                    res => {
                        this.fileCategoryList = res.data.result.fileCategories
                    },
                    err => {
                        console.log(err.response);
                    }
                )
            },
            takeFile(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.selectedFile = files[0];
            },
            save() {
                this.touched = true;
                if (!this.form.name || !this.form.FileCategoryInfo.id) {
                    return
                }
                let data = new FormData()
                let obj = {
                    FromAchievementFileInfo: JSON.stringify(this.form),
                    file: this.selectedFile
                };
                for (const key in obj) {
                    data.append(key, obj[key])
                }
                this.$api.post('/api/FactAchievement/AddFactAchievementFile', data).then(
                    res => {
                        this.form.name = '';
                        this.form.FileCategoryInfo.id = null;
                        this.selectedFile = {};
                        this.touched = false;
                        this.show = 'fileInfo';
                        let index = this.info.factAchievements.findIndex(i =>i.id === this.form.FactAchievementId )
                        this.info.factAchievements[index].files.push(res.data.result)
                    },
                    err => {
                        console.log(err.response);
                    }
                )
            },
            deleteFileItem(index){
                if(!confirm("Вы действительно хотите удалить?")){
                    return;
                }
                let itemIndex = this.info.factAchievements.findIndex(i =>i.id === this.form.FactAchievementId )
                let file =  this.info.factAchievements[itemIndex].files[index];
                if(!file){
                    return;
                }
                this.$api.delete('/api/FactAchievement/RemoveFactAchievementFile/'+file.id).then(
                    response => {
                        this.info.factAchievements[itemIndex].files.splice(index, 1);
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
                    return this.numeralFormat(this.createForm.sum)
                },
                set(val){
                    this.createForm.sum = this.numeralFormatToNumber(val)
                }
            }
        },
    }
</script>

<style scoped>
.actions span{
    cursor: pointer;
}
.file-upload img{
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
.btn-file{
    box-shadow: 0 0 0 3px #3d8c40;
    color: #3d8c40;
}
.btn-file:hover{
    box-shadow: 0 0 0 2px #3d8c40;
    color: #3d8c40;
}
.btn-file:active{
    box-shadow: 0 0 0 1px #3d8c40;
    color: #3d8c40;
}
</style>