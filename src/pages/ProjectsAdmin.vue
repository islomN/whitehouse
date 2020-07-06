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
                            <div class="d-flex align-items-center flex-wrap">
                                <div>
                                    <VueCtkDateTimePicker class="my_VueCtkDateTimePicker"
                                                          :auto-close="true"
                                                          @input="()=> getAllProject()"
                                                          v-model="form.startTime"
                                                          :only-date="true"
                                                          format="YYYY-MM-DD"
                                                          formatted="YYYY-MM-DD"
                                                          label="Дата договора"
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
                                                          label="Дата договора"
                                    />
                                </div>
                                <div>
                                    <input v-model="form.description" @input="getAllProject" type="text">
                                </div>
                                <div>
                                    <input v-model="form.userId" @keypress="eCode" @input="getAllProject" type="text">
                                </div>
                                <div>
                                    <button class="btn btn-default" @click="show">Добавить объекты</button>
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
                                        <tr v-for="item in projects" class="md-table-row">
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{item.description}}</div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{item.contractNumber}}</div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{item.customer}}</div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{item.contractPrice}}</div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">
                                                    <span class=" action orange text-warning">Изменить</span>
                                                </div>
                                                <div class="md-table-cell-container">
    
                                                    <span class="action red text-danger">Удалить</span>
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

        <modal name="hello-world" :adaptive="true" width="50%" height="80%">
            <div class="object-form-section">
                <ul class="nav nav-pills nav-fill object-form-items">
                    <li class="nav-item"  @click="openMainSection">
                        <a class="nav-link" :class="{'active': mainSection}">
                            Главные информации
                        </a>
                    </li>
                    <li class="nav-item" @click="openFactAchievementsSection">
                        <a class="nav-link" :class="{'active': factAchievementsSection}">
                            Факт оплаты
                        </a>
                    </li>
                    <li class="nav-item" @click="openPlanAchievementsSection">
                        <a class="nav-link"  :class="{'active': planAchievementsSection}">
                            Факт расход
                        </a>
                    </li>
                    <li class="nav-item" @click="openFactExpensessSection">
                        <a class="nav-link" :class="{'active': factExpensessSection}">Факт выполнения</a>
                    </li>
                    <li class="nav-item" @click="openProjectNotesSection">
                        <a class="nav-link " :class="{'active': projectNotesSection}">
                            План выполнения
                        </a>
                    </li>
                </ul>

                <div class="sections">
                    <main-section-component v-if="mainSection"></main-section-component>
                    <fact-achievements-section-component v-else-if="factAchievementsSection"></fact-achievements-section-component>
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
    import FactAchievementsSectionComponent from './Components/FactAchievementsSection'
    import PlanAchivievementsSectionComponent from './Components/PlanAchivievementsSection'
    import FactExpensessSectionComponent from './Components/FactExpensessSection'
    import ProjectNotesSectionComponent from './Components/ProjectNotesSection'
    export default {
        name: "Projects",
        components:{
            MainSectionComponent,
            FactAchievementsSectionComponent,
            PlanAchivievementsSectionComponent,
            FactExpensessSectionComponent,
            ProjectNotesSectionComponent
        },
        data(){
            return {
                tableHeaderColor: '',
                activeSection:1,
                form: {
                    startTime: null,
                    endTime: null,
                    description: '',
                    userId: null
                },
                projects: []
            }
        },
        created() {
            this.getAllProject();
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
            show () {
                this.$modal.show('hello-world');
            },
            hide () {
                this.$modal.hide('hello-world');
            },
            openMainSection(){
                this.mainSection = true
            },
            openFactAchievementsSection(){
                this.factAchievementsSection = true
            },
            openPlanAchievementsSection(){
                this.planAchievementsSection = true
            },
            openFactExpensessSection(){
                this.factExpensessSection = true
            },
            openProjectNotesSection(){
                this.projectNotesSection = true
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
    .action.orange:hover{
        background:  orange;
    }
    .object-form-section{
        width: 100%;
        height: 100%;
        padding: 20px;
    }
    .object-form-items a{
        cursor: pointer;
    }
</style>