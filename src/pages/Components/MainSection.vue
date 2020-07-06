<template>
    <div>
        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-66">
                    <md-field>
                        <label>Наименование объекта</label>
                        <md-input v-model="info.description" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>В кратце</label>
                        <md-input v-model="info.shortDescription" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Заказчик</label>
                        <md-input v-model="info.customer" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Номер договора</label>
                        <md-input v-model="info.contractNumber" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Дата договора</label>
                        <md-input v-model="info.contractDate" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Подрядная организация</label>
                        <md-input v-model="info.contractProvider" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Стоимость по договору (СМР)</label>
                        <md-input v-model="info.contractPrice" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Тех Надзор</label>
                        <md-input v-model="info.techSupervision" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>Тел номер</label>
                        <md-input v-model="info.techSupervisionPhone" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-field>
                        <label>ПТО</label>
                        <md-select v-model="info.responsible">
                            <md-option
                                    v-for="item in responsibles" v-bind:key="item.id"
                                    :value="item.id">
                                {{item.fio}}
                            </md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
        </md-card-content>
    </div>
</template>

<script>
    export default {
        name: "MainSection",
        data() {
            return {
                info: {
                    description: null,
                    shortDescription: "string",
                    contractNumber: "string",
                    contractDate: "2020-06-21T10:42:42.394Z",
                    customer: "string",
                    contractProvider: "string",
                    contractPrice: 0,
                    techSupervision: "string",
                    techSupervisionPhone: "string",
                    responsible: {
                        id: 0
                    }
                },
                responsibles:[
                    {
                        "id": 0,
                        "fio": "string",
                    },
                    {
                        "id":2,
                        "fio": "123123",
                    }
                ]
            }
        }
    }
</script>

<style >
.md-select-menu{
    z-index: 100000 !important;
}
</style>