<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <div class="d-flex flex-wrap justify-content-between align-items-center">
                            <h4 class="title">Объекты</h4>
                            <div class="d-flex align-items-center flex-wrap search-section" v-if="isAdmin">

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
                                <div >
                                    <input class="form-control" v-model="form.description" @input="getAllProject" type="text" placeholder="Введите текст для поиска">
                                </div>
                                <div>
                                    <select class="form-control" v-model="form.userId" @change="getAllProject">
                                        <option value="">Выберите ответственного</option>
                                        <option v-for="(item, i) in responsibles" :key="i" :value="item.id" >{{item.fio}}</option>
                                    </select>
<!--                                    <input class="form-control" v-model="form.userId" @keypress="eCode" @input="getAllProject" type="text">-->
                                </div>
                                <div v-if="isAdmin">
                                    <button class="btn btn-default" @click="addObjectModal">Добавить объект</button>
                                </div>
                            </div>
                        </div>

                    </md-card-header>
                    <div class="md-card-content">
                        <div v-if="isAdmin" class="excel-section">
                            <excel :data="excelData.json_data"
                                   :fields="excelData.json_fields"
                                   :name="'Объекты.xls'"
                                   class="btn excelBtn"
                                   worksheet="My Worksheet">
                                <i class="icon-excel"></i>
                                <button class="btn btn-success" @click="toExcel">Скачать</button>
                            </excel>

                        </div>
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
                                            <th class="md-table-head w-30">
                                                <div class="md-table-head-container md-ripple md-disabled">
                                                    <div class="md-table-head-label">
                                                        Наименование объекта (в кратце)
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
                                            <th class="md-table-head w-30">
                                                <div class="md-table-head-container md-ripple md-disabled">
                                                    <div class="md-table-head-label">
                                                        Факт выполнения
                                                    </div>
                                                </div>
                                            </th>
                                            <th class="md-table-head w-30">
                                                <div class="md-table-head-container md-ripple md-disabled">
                                                    <div class="md-table-head-label">
                                                        Ожидание ({{getMonthName()}})
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
                                                <div class="md-table-cell-container">{{item.shortDescription}} </div>
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
                                                <div class="md-table-cell-container">{{numeralFormat(calcFactAchievements(item))}} </div>
                                            </td>
                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">{{numeralFormat(calcPlanAchievements(item))}} </div>
                                            </td>

                                            <td class="md-table-cell">
                                                <div class="md-table-cell-container">
                                                    <span @click="openProjectInfoSection(item.id, $event)" class="action green text-info">Посмотреть</span>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div v-if="!isAdmin && pagination.count > pagination.size">
                                        <v-pagination v-model="pagination.page" :page-count="pagination.count"></v-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-card>
            </div>
        </div>

        <modal name="projectMainInfo" :adaptive="true" width="50%" height="80%">
            <div class="modal-header">
                <h5 class="modal-title">{{info.id > 0 ? 'Редактирование объекта' : 'Добавление объекта'}}</h5>
                <button type="button" class="close"  @click="closeModal('projectMainInfo')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="object-form-section">
                <ul class="nav nav-pills nav-fill object-form-items">
                    <li class="nav-item"  @click="openMainSection">
                        <a class="nav-link" :class="{'active': mainSection}">
                            Главные информации
                        </a>
                    </li>
                </ul>

                <div class="sections">
                    <main-section-component @switching-modal="switchingModal" v-if="mainSection" :current-info="info"></main-section-component>
                </div>
            </div>
            <div class="footer">

            </div>
        </modal>
    
        <modal name="projectInfoModal" :adaptive="true" width="50%" height="80%">
            <div class="modal-header">
                <h5 class="modal-title">{{'Объект "'+info.shortDescription + '"'}}</h5>
                <button type="button" class="close"  @click="closeModal('projectInfoModal')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
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
                    <li class="nav-item" @click="openProjectNotesSection">
                        <a class="nav-link" :class="{'active':projectNotesSection }">
                            Примечания проекта
                        </a>
                    </li>
                </ul>
                <div class="sections">
<!--                    <main-section-component  v-if="mainSection && isAdmin" @switching-modal="switchingModal" :current-info="info"></main-section-component>-->
                    <ProjectInfo
                            v-if="mainSection"
                            @switching-modal="switchingModal"
                            :info="info"
                    />
                    <ProjectFileSectionComponent
                            :info="info"
                            :openProjectInfoSection="openProjectInfoSection"
                            v-else-if="fileSection"
                    />
                    <FactPaysComponent :info="info" v-else-if="factPaysSection" />
                    <FactExpensessSectionComponent
                            :info="info"
                            v-else-if="factExpensessSection"
                    ></FactExpensessSectionComponent>
                    <plan-achivievements-section-component
                            :info="info"
                            v-else-if="planAchievementsSection"
                    ></plan-achivievements-section-component>
                    <fact-achievements-section-component
                            :info="info"
                            :openProjectInfoSection="openProjectInfoSection"
                            v-else-if="factAchievementsSection"
                    >
                    </fact-achievements-section-component>
                    <ProjectNotesSectionComponent
                            :info="info"
                            v-else-if="projectNotesSection"
                    ></ProjectNotesSectionComponent>
                    <!--                    <project-notes-section-component v-else-if="projectNotesSection"></project-notes-section-component>-->
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
    import Excel from 'vue-json-excel'
    import vPagination from 'vue-plain-pagination'
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
            ProjectInfo,
            Excel,
            vPagination
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
                excelData:{},
                pagination:{
                    count:1,
                    page: 1,
                    size: 10
                }
            }
        },
        created() {
            this.getAllProject();

            if(this.isAdmin){
                this.getAllUser();
            }
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

                let api = null;
                if(this.isAdmin){
                    this.$api.post('/api/Project/GetProjectsByFilter', form).then(
                        response => {
                            this.projects = response.data.result.projects;
                            this.toExcel();
                        },
                        error => {
                            console.log(error.response);
                        }
                    );
                }else{
                    this.$api.get( '/api/Project/GetProjects/'+this.pagination.page).then(
                        response => {
                            this.projects = response.data.result.projects;
                            this.pagination.count =  Math.ceil(response.data.result.projectCount/this.pagination.size)
                        },
                        error => {
                            console.log(error.response);
                        }
                    );
                }
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
            toExcel(){
                let excelInfo = [];

                for(let x in this.projects){
                    console.log(this.projects[x])
                    let item = this.projects[x];
                    let info = {
                        id:x+1,
                        description: item.description,
                        shortDescription: item.shortDescription,
                        customer: item.customer,
                        contract: "№ " +item.contractNumber + " от "+ this.$moment(item.contractDate).format('DD-MM-YYYY'),
                        contractProvider: item.contractProvider,
                        contractPrice: item.contractPrice,
                        factAchievements: this.calcFactAchievements(item),
                        planAchievements: this.calcPlanAchievements(item),
                        deadline: this.$moment(item.deadline).format('DD-MM-YYYY'),
                        factExpenses: this.calcFactExpenses(item),
                        factPrepay: this.calcPrepay(item),
                        factNoPrepay: this.calcNotPrepay(item),
                        factAllpay:this.calcAllpay(item),
                        fivePersent: this.calcFactAchievements(item) * 5/100,
                        debt: this.calcFactAchievements(item)  -  this.calcFactAchievements(item) * 5/100 - this.calcAllpay(item),
                    };

                    info['projectNote'] = '';
                    info['projectNoteOther'] = '';
                    for(var i=0; i  < item.projectNotes.length; i++){
                        if(i === 0){
                            info['projectNote'] =  item.projectNotes[i].note;
                        }else{
                            info['projectNoteOther'] +=  item.projectNotes[i].note + '\n';
                        }
                    }

                    info.responsible = item.responsible.fio;
                    info.responsiblePhone = item.responsible.phone;
                    info.techSupervision = item.techSupervision;
                    info.techSupervisionPhone = item.techSupervisionPhone;
                    excelInfo.push(info)
                }

                let planAchievements = 'Ожидани (' +this.getMonthName()+')';
                let fields = {
                    '№': 'id',
                    'Наименование объекта': 'description',
                    'в кратце': 'shortDescription',
                    'Договор №': 'contract',
                    'Заказчик': 'customer',
                    'Подрядная организация': 'contractProvider',
                    'Стоимость по договору (СМР)': 'contractPrice',
                    'Факт выполнение': 'factAchievements',

                };
                fields[planAchievements] = 'planAchievements';

                fields['срок сдачи выполнении']  = 'deadline';
                fields['Факт расход']  =  'factExpenses';
                fields['Предоплата']  =  'factPrepay';
                fields['Оплачено']  =  'factNoPrepay';
                fields['Итого оплата']  =  'factAllpay';
                fields['5%']  = 'fivePersent';
                fields['Задолженность 95%']  = 'debt';
                fields['Примечания 1']  = 'projectNote';
                fields['Примечания 2']  = 'projectNoteOther';
                fields['ПТО']  = 'responsible';
                fields['тел номер']  = 'responsiblePhone';
                fields['Тех Надзор']  = 'techSupervision';
                fields['Тел номер']  = 'techSupervisionPhone';

                this.excelData =  {
                    json_fields: fields,
                    json_data:excelInfo,
                    json_meta: [
                        [
                            {
                                'key': 'charset',
                                'value': 'utf-8'
                            }
                        ]
                    ],
                };
            },
            getMonthName(){
                return this.getMonth()[new Date().getMonth()]
            },
            calcFactAchievements(item){
                let sum = 0;

                for(let i in item.factAchievements){
                    sum+= item.factAchievements[i].sum
                }

                return sum;
            },
            calcPlanAchievements(item){
                let sum = 0;

                for(let i in item.planAchievements){
                    sum+= item.planAchievements[i].sum
                }

                return sum;
            },
            calcFactExpenses(item){
                let sum = 0;

                for(let i in item.factExpenses){
                    sum+= item.factExpenses[i].sum
                }

                return sum;
            },
            calcPrepay(item){
                let sum = 0;

                for(let i in item.factPays.filter(i => i.isPrepay)){
                    sum+= item.factPays[i].sum
                }

                return sum;
            },
            calcNotPrepay(item){
                let sum = 0;

                for(let i in item.factPays.filter(i => !i.isPrepay)){
                    sum+= item.factPays[i].sum
                }

                return sum;
            },
            calcAllpay(item){
                let sum = 0;

                for(let i in item.factPays){
                    sum+= item.factPays[i].sum
                }

                return sum;
            },

            switchingModal(info, toUpdate = false){
                let hide = "projectMainInfo";
                let show = "projectInfoModal";
                if(toUpdate){
                    let temp = hide;
                    hide = show;
                    show = temp;
                }

                this.$modal.hide(hide);
                this.info = info;
                this.$modal.show(show);
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
            getMonth(){
                return  ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
            },
            closeModal(modal){
                this.$modal.hide(modal);
            },
            addObjectModal(){
                this.info = {
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
                };
                this.show()
            },
            show () {
                this.openMainSection();
                this.$modal.show('projectMainInfo');
            },
            hide () {
                this.$modal.hide('projectMainInfo');
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

        },
        watch:{
            'pagination.page': function(){
                this.getAllProject()
            }
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
    .w-30{
        width: 30%;
    }
    select.form-control {
        border-radius: 3px;
    }
    .excel-section{
        text-align: right;
    }
    .form-control{
        min-width: 250px;
    }
</style>

<style>
    .pagination-link{
        min-width: 30px;
        height: 28px;
        background: #5eb562;
        margin: 0 10px;
        border-radius: 1px;
        border: 0;
        box-shadow: 0 0 0 2px #5eb562;
        color: #fff;
        font-weight: bolder;
    }

    .pagination-link.pagination-link--active{
        background: #fff;
        color: #60b664;
        box-shadow: 0 0 0 2px;
    }
    .actions span{
        cursor: pointer;
    }
    .search-section input, .search-section select{
        background: white;
    }
</style>