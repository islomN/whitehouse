<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <div class="d-flex flex-wrap justify-content-between align-items-center">
                            <h4 class="title">Объкты</h4>
                            <div class="d-flex align-items-center flex-wrap search-section">
                                <div>
                                    <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
                                                          :auto-close="true"
                                                          @input="()=> getAllProject()"
                                                          v-model="form.startTime"
                                                          :only-date="true"
                                                          format="YYYY-MM-DD"
                                                          formatted="YYYY-MM-DD"
                                                          label="Дата от"
                                    />
                                </div>
                                <div>
                                    <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
                                                          :auto-close="true"
                                                          @input="()=> getAllProject()"
                                                          v-model="form.endTime"
                                                          :only-date="true"
                                                          format="YYYY-MM-DD"
                                                          formatted="YYYY-MM-DD"
                                                          label="Дата до"
                                    />
                                </div>
                                <div>
                                    <input class="form-control" v-model="form.description" @input="getAllProject" type="text">
                                </div>
                                <div>
                                    <select class="form-control" v-model="form.userId" @change="getAllProject">
                                        <option value="">Выберите ответственного</option>
                                        <option v-for="(item, i) in responsibles" :key="i" :value="item.id" >{{item.fio}}}</option>
                                    </select>
<!--                                    <input class="form-control" v-model="form.userId" @keypress="eCode" @input="getAllProject" type="text">-->
                                </div>
                                <div v-if="isAdmin">
                                    <button class="btn btn-default" @click="show">Добавить объект</button>
                                </div>
                            </div>
                        </div>
                    </md-card-header>
                    <div class="md-card-content">
                        <div >
                            <div class="md-content md-table md-theme-default" >
                                <div class="md-content md-table-content md-scrollbar md-theme-default">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th class="md-table-head">
                                                <div class="md-table-head-container md-ripple md-disabled">
                                                    <div class="md-table-head-label">
                                                        №
                                                    </div>
                                                </div>
                                            </th>
                                            <th class="md-table-head w-60">
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
                                            <th class="md-table-head"><div class="md-table-head-container md-ripple md-disabled">
                                                <div class="md-table-head-label">
    
                                                    Заказчик
    
                                                   </div>
                                            </div>
                                            </th>
                                            <th class="md-table-head"><div class="md-table-head-container md-ripple md-disabled">
                                                <div class="md-table-head-label">
    
                                                    Стоимость по договору (СМР)
                                                </div>
                                            </div>
                                            </th>
                                            <th class="md-table-head">
                                                <div class="md-table-head-container md-ripple md-disabled">
                                                    <div class="md-table-head-label">
    
                                                        Дейсвия
    
                                                     </div>
                                                </div>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item,i) in projects" class="md-table-row">
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{i+1}} </div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{item.description}} </div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{item.contractNumber}}</div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{item.customer}}</div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{numeralFormat(item.contractPrice)}}</div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">
                                                    <span @click="openProjectInfoSection(item.id, $event)" class="action green text-info">Посмотреть</span>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card>
            </div>
        </div>

        <modal name="projectMainInfo" :adaptive="true" width="50%" height="80%">
            <div class="object-form-section">
                <ul class="nav nav-pills nav-fill object-form-items">
                    <li class="nav-item"  @click="openMainSection">
                        <a class="nav-link" :class="{'active': mainSection}">
                            Главные информации
                        </a>
                    </li>
                </ul>

                <div class="sections">
                    <main-section-component @switching-modal="switchingModal" v-if="mainSection"></main-section-component>
                </div>
            </div>
            <div class="footer">

            </div>
        </modal>
    
        <modal name="projectInfoModal" :adaptive="true" width="50%" height="80%">
            <div class="object-form-section">
                <ul class="nav nav-pills nav-fill object-form-items">
                    <li class="nav-item"  @click="openMainSection">
                        <a class="nav-link" :class="{'active': mainSection}">
                            Главные информации
                        </a>
                    </li>
                    <li class="nav-item" @click="openFileSection">
                        <a class="nav-link" :class="{'active': fileSection}">
                            Файлы
                        </a>
                    </li>
                    <li class="nav-item" @click="openFactPaysSection">
                        <a class="nav-link" :class="{'active': factPaysSection}">
                            Факт оплаты
                        </a>
                    </li>
                    <li class="nav-item" @click="openFactExpensesSection">
                        <a class="nav-link" :class="{'active': factExpensessSection}">
                            Факт Расходы
                        </a>
                    </li>
                    <li class="nav-item" @click="openPlanAchievementsSection">
                        <a class="nav-link"  :class="{'active': planAchievementsSection}">
                            План выполнения
                        </a>
                    </li>
                    <li class="nav-item" @click="openFactAchievementsSection">
                        <a class="nav-link" :class="{'active':factAchievementsSection }">
                            Факт выполнения
                        </a>
                    </li>
                </ul>
                <div class="sections">
                    <ProjectInfo :info="info"  v-if="mainSection" />
                    <ProjectFileSectionComponent :info="info" :files="[]" v-else-if="fileSection" />
                    <FactPaysComponent :info="info" v-else-if="factPaysSection" />
                    <FactExpensessSectionComponent :info="info" v-else-if="factExpensessSection"></FactExpensessSectionComponent>
                    <plan-achivievements-section-component  v-else-if="planAchievementsSection"></plan-achivievements-section-component>
                    <fact-achievements-section-component v-else-if="factAchievementsSection"></fact-achievements-section-component>
                    <!--                    <project-notes-section-component v-else-if="projectNotesSection"></project-notes-section-component>-->
                </div>

                <div class="sections">
                    <ProjectInfo
                            :info="info"
                            v-if="mainSection"
                    />
                    <ProjectFileSectionComponent
                            :info="info"
                            :openProjectInfoSection="openProjectInfoSection"
                            v-else-if="fileSection"
                    />
                    <fact-achievements-section-component
                            :info="info"
                            :openProjectInfoSection="openProjectInfoSection"
                            v-else-if="factAchievementsSection"
                    >
                    </fact-achievements-section-component>
                    <plan-achivievements-section-component  v-else-if="planAchievementsSection"></plan-achivievements-section-component>
                    <fact-achievements-section-component v-else-if="factExpensessSection"></fact-achievements-section-component>
                    <project-notes-section-component v-else-if="projectNotesSection"></project-notes-section-component>
                </div>
            </div>
            <div class="footer">
        
            </div>
        </modal>
    </div>
</template>

<script>
    import MainSectionComponent from './Components/MainSection'
    import ProjectFileSectionComponent from './Components/ProjectFileSectionComponent'
    import FactAchievementsSectionComponent from './Components/FactAchievementsSection'
    import PlanAchivievementsSectionComponent from './Components/PlanAchivievementsSection'
    import FactExpensessSectionComponent from './Components/FactExpensessSection'
    import ProjectNotesSectionComponent from './Components/ProjectNotesSection'
    import ProjectInfo from './Components/ProjectInfo'
    import FactPaysComponent from './Components/FactPaysSection'
    export default {
        name: "Projects",
        components:{
            MainSectionComponent,
            ProjectFileSectionComponent,
            FactAchievementsSectionComponent,
            PlanAchivievementsSectionComponent,
            FactExpensessSectionComponent,
            ProjectNotesSectionComponent,
            FactPaysComponent,
            ProjectInfo
        },
        data(){
            return {
                tableHeaderColor: '',
                activeSection:1,
                form: {
                    startTime: null,
                    endTime: null,
                    description: '',
                    userId: ''
                },
                projects: [],
                responsibles: [],
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
            }
        },
        created() {
            this.getAllProject();
            this.getAllUser();
        },
        methods:{
            eCode(event) {
                if (isNaN(event.key)) {
                    event.preventDefault();
                }
            },
            getAllProject() {
                let form = {...this.form};
                if (form.userId) {
                    form.userId = +form.userId;
                }
                this.$api.post('/api/Project/GetProjectsByFilter', form).then(
                    response => {
                        this.projects = response.data.result.projects
                    },
                    error => {
                        console.log(error.response);
                    }
                )
            },
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
            show () {
                this.openMainSection()
                this.$modal.show('projectMainInfo');
            },
            hide () {
                this.$modal.hide('projectMainInfo');
            },
            switchingModal(info){
                this.$modal.hide('projectMainInfo');
                this.info = info;
                this.$modal.show('projectInfoModal');
                this.getAllProject()

            },
            openMainSection(){
                this.mainSection = true
            },
            openFileSection(){
                this.fileSection = true
            },
            openFactPaysSection(){
                this.factPaysSection = true
            },
            openFactAchievementsSection(){
                this.factAchievementsSection = true
            },
            openPlanAchievementsSection(){
                this.planAchievementsSection = true
            },
            openFactExpensesSection(){
                this.factExpensessSection = true
            },
            openProjectNotesSection(){
                this.projectNotesSection = true
            },
            openProjectInfoSection(id){
                
                this.$api.get('/api/Project/GetProject/' + id).then(
                    res => {
                        this.info = res.data.result;
                        this.openMainSection()
                        this.$modal.show('projectInfoModal');
                    },
                    err => {
                        console.log(err.response);
                    }
                )
            },

        },
        computed:{

            mainSection:{
                get(){
                    return this.activeSection === 1;
                },
                set(val){
                    return this.activeSection = val ? 1 : 0;
                }
            },
            factAchievementsSection:{
                get(){
                    return this.activeSection === 2;
                },
                set(val){
                    return this.activeSection = val ? 2 : 0;
                }
            },
            planAchievementsSection:{
                get(){
                    return this.activeSection === 3;
                },
                set(val){
                    return this.activeSection = val ? 3 : 0;
                }
            },
            factExpensessSection:{
                get(){
                    return this.activeSection === 4;
                },
                set(val){
                    return this.activeSection = val ? 4 : 0;
                }
            },
            projectNotesSection:{
                get(){
                    return this.activeSection === 5
                },
                set(val){
                    return this.activeSection = val ? 5 : 0;
                }
            },
            fileSection:{
                get(){
                    return this.activeSection === 6
                },
                set(val){
                    return this.activeSection = val ? 6 : 0;
                }
            },
            factPaysSection:{
                get(){
                    return this.activeSection === 7;
                },
                set(val){
                    return this.activeSection = val ? 7 : 0;
                }
            },

        }
    }
</script>

<style scoped>
    .md-card-header
    .md-card-header{
        min-height: 50px;
    }
    .btn-default{
        background: white;
        color: #2fbf00;
    }
    .action{
        min-height: 10px;
        min-width: 50px;
        margin-bottom: 10px;
        cursor: pointer;
        padding: 5px;
    }
    .action:hover{
        border-radius: 3px;
        box-shadow:  0 0 0 3px white;
        color: #fff !important;
    }
    .action.red:hover {
        background: red;
    }
    .action.green:hover{
        background:  #62b866;
    }
    .object-form-section{
        width: 100%;
        height: 100%;
        padding: 20px;
    }
    .object-form-items a{
        cursor: pointer;
    }
    .search-section > div{
        margin-left: 10px;
    }
    .form-control{
        height: 42px;
    }

    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        color: #fff;
        background-color: #3d8c40;
    }
     .nav-pills:not(.nav-pills-icons) > li > a {
         border-radius: 3px;
     }
    .md-theme-default a:not(.md-button) {
        color:  #3d8c40;
    }
    .w-60{
        width: 60%;
    }
    select.form-control {
        border-radius: 3px;
    }
</style>