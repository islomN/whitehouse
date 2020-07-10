<template>
    <div v-if="info.id">
        <template v-if="show === 'allInfo'">
            <div class="mb-3">
                <button @click="show = 'createNew'" class="btn btn-primary">
                    Создать
                </button>
            </div>
            <div class="md-card-content">
                <div>
                    <div class="md-content md-table md-theme-default" >
                        <div class="md-content md-table-content md-scrollbar md-theme-default">
                            <table>
                                <thead>
                                <tr>
                                    <th class="md-table-head">
                                        <div class="md-table-head-container md-ripple md-disabled">
                                            <div class="md-table-head-label">
                                                Дата
                                            </div>
                                        </div>
                                    </th>
                                    <th class="md-table-head">
                                        <div class="md-table-head-container md-ripple md-disabled">
                                            <div class="md-table-head-label">
                                                Коментарий
                                            </div>
                                        </div>
                                    </th>
                                    <th class="md-table-head">
                                        <div class="md-table-head-container md-ripple md-disabled">
                                            <div class="md-table-head-label">
                                                Сумма
                                            </div>
                                        </div>
                                    </th>
                                    <th class="md-table-head">
                                        <div class="md-table-head-container md-ripple md-disabled">
                                            <div class="md-table-head-label">
                                                Файлы
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in info.factAchievements" class="md-table-row">
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">{{item.date ? $moment(item.date).format('DD-MM-YYYY') : ''}}</div>
                                    </td>
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">{{item.comment}}</div>
                                    </td>
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">{{item.sum}}</div>
                                    </td>
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">
                                            <button @click="showFiles(item)" class="btn btn-primary">Открыть</button>
                                        </div>
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
            <div class="mb-3">
                <button @click="show = 'allInfo'" class="btn btn-primary">
                    Назад
                </button>
            </div>
            <label v-if="!selectedFile.name" style="cursor: pointer">
                <img src="https://image.flaticon.com/icons/svg/101/101671.svg" >
                <input type="file" @change="takeFile" class="d-none">
                <div class="d-flex d-flex justify-content-center">Загрузить</div>
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
    
            <div class="md-card-content">
                <div>
                    <div class="md-content md-table md-theme-default" >
                        <div class="md-content md-table-content md-scrollbar md-theme-default">
                            <table>
                                <thead>
                                <tr>
                                    <th class="md-table-head">
                                        <div class="md-table-head-container md-ripple md-disabled">
                                            <div class="md-table-head-label">
                                                Наименование объекта
                                            </div>
                                        </div>
                                    </th>
                                    <th class="md-table-head">
                                        <div class="md-table-head-container md-ripple md-disabled">
                                            <div class="md-table-head-label">
                                                Договор
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in selectedObj.files" class="md-table-row">
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">{{item.name}}</div>
                                    </td>
                                    <td class="md-table-cell">
                                        <div class="md-table-cell-container">
                                            <a :href="item.url" target="_blank" download>Скачать</a>
                                        </div>
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
                sum: {required},
                comment: {required}
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
                    res => {
                        this.$v.createForm.$reset();
                        this.createForm.date = null;
                        this.createForm.sum = null;
                        this.createForm.comment = null;
                        this.show = 'allInfo';
                        this.openProjectInfoSection(this.info.id);
                    },
                    err => {
                        console.log(err.response);
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
                        this.show = 'allInfo';
                        this.openProjectInfoSection(this.info.id);
                    },
                    err => {
                        console.log(err.response);
                    }
                )
                
            }
        }
    }
</script>

<style scoped>

</style>