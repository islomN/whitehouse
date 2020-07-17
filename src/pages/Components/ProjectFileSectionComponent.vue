<template>
    <div v-if="info.id">
        <template v-if="!isAdmin">
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
                            <button @click="save" style="width: 100px" class="btn btn-primary" :disabled="disabled">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="md-card-content">
            <div >
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
                                    Категория файлов
                                </th>
                                <th >
                                    Файл
                                </th>
                                <th v-if="isAdmin">
                                    ПТО
                                </th>
                                <th  v-if="isAdmin">

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, i) in info.files" :key="i" class="md-table-row">
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
                                <td v-if="isAdmin" class="md-table-cell">
                                    <div class="md-table-cell-container">{{item.responsible.fio}}</div>
                                </td>

                                <td  v-if="isAdmin" class="actions">
                                    <span @click="deleteItem(i)" class="text-danger delete-item">Удалить</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectFileSectionComponent",
        props: ['info', 'openProjectInfoSection'],
        data() {
            return{
                touched: false,
                cleanForm: {},
                form: {
                    name: '',
                    ProjectId: this.info.id,
                    FileCategoryInfo: {
                        id: null
                    }
                },
                selectedFile: {},
                fileCategoryList: [],
                disabled: false
            }
        },
        created() {
            this.getFileCategoryList();
        },
        methods: {
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
                this.disabled = true;
                this.touched = true;
                if (!this.form.name || !this.form.FileCategoryInfo.id) {
                    this.disabled = false;
                    return
                }
                let data = new FormData()
                let obj = {
                    ProjectFileInfo: JSON.stringify(this.form),
                    file: this.selectedFile
                };
                for (const key in obj) {
                    data.append(key, obj[key])
                }
                this.$api.post('/api/Project/AddProjectFile', data).then(
                    res => {
                        this.form.name = '';
                        this.form.FileCategoryInfo.id = null;
                        this.selectedFile = {};
                        this.touched = false;
                        this.info.files.push(res.data.result)
                    },
                    err => {
                        console.log(err.response);
                    }
                )
                .finally(() =>{
                    this.disabled = false;
                })
            },
            deleteItem(index){
                if(!confirm("Вы действительно хотите удалить?")){
                    return;
                }
                let factPay = this.info.files[index]
                if(!factPay){
                    return;
                }
                this.$api.delete('/api/Project/RemoveProjectFile/'+factPay.id).then(
                    response => {
                        this.info.files.splice(index, 1);
                    },
                    error => {
                        this.errorNotify(error.response.data.error.errorMessage)
                    }
                )
            }
        }
    }
</script>

<style scoped>
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