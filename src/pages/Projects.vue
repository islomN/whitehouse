<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Объкты</h4>
                        <!--            <p class="category">Here is a subtitle for this table</p>-->
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <md-table v-model="users" :table-header-color="tableHeaderColor">
                                <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                                    <md-table-cell md-label="Country">{{ item.country }}</md-table-cell>
                                    <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
                                    <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>
                                </md-table-row>
                            </md-table>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Projects",
        data(){
            return {
                users:[
                    {
                        name: "Test",
                        country: "Test",
                        city: "Test",
                        salary: "Test",
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>