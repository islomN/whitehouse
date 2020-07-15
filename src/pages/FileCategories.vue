<template>
	<div class="content">
		<div class="md-layout">
			<div
				class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
			>
				<md-card>
					<md-card-header data-background-color="green">
						<div class="d-flex flex-wrap align-items-center justify-content-between">
							<h4 class="title">Категории Файлов</h4>
							<form @submit.prevent="save" class="d-flex align-items-center">
								<input v-model="name" type="text" class="form-control mr-2" placeholder="Намиенование">
								<button type="submit" class="btn btn-default">
									Добавить
								</button>
							</form>
						</div>
						
						<!--            <p class="category">Here is a subtitle for this table</p>-->
					</md-card-header>
					<md-card-content>
						<div>
							<md-table v-model="list">
								<md-table-row slot="md-table-row" slot-scope="{ item }">
									<md-table-cell md-label="№">{{ item.id }}</md-table-cell>
									<md-table-cell md-label="Наименование">{{ item.name }}</md-table-cell>
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
	import {required} from 'vuelidate/lib/validators';
	export default {
		name: "Projects",
		data(){
			return {
				list:[],
				name: ''
			}
		},
		validations: {
			name: {required}
		},
		created() {
            if(!this.isAdmin){
                this.$router.push("/dashboard")
            }
			this.getFileCategoryList();
		},
		methods: {
			getFileCategoryList() {
				this.$api.get('/api/Project/GetFileCategories').then(
					res => {
						this.list = res.data.result.fileCategories
					},
					err => {
						console.log(err.response);
					}
				)
			},
			save() {
				this.$v.name.$touch()
				if (this.$v.name.$invalid) {
					return
				}
				this.$api.post('/api/Project/AddFileCategory', {name: this.name}).then(
					res => {
						this.getFileCategoryList();
						this.name = '';
						this.$v.$reset();
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
    .btn-default{
        background: white;
        color: #2fbf00;
    }
    .form-control{
        background: white;
    }
</style>