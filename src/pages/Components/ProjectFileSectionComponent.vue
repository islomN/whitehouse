<template>
	<div v-if="form.ProjectId">
		<template>
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
								<input v-model="form.name" :class="{'border-danger': $v.form.name.$error}" class="form-control" type="text">
							</div>
							<div class="col-6">
								<select v-model="form.FileCategoryInfo.id" :class="{'border-danger': $v.form.FileCategoryInfo.id.$error}" class="form-control">
									<option v-for="item in list" :value="item.id">
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
		</template>
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
								<th class="md-table-head">
									<div class="md-table-head-container md-ripple md-disabled">
										<div class="md-table-head-label">
											Заказчик
										</div>
									</div>
								</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="item in files" class="md-table-row">
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
<!--								<td class="md-table-cell">-->
<!--									<div class="md-table-cell-container">-->
<!--										<span @click="openProjectInfoSection(item.id, $event)" class="action orange text-warning">Посмотреть</span>-->
<!--									</div>-->
<!--									<div v-if="isAdmin" class="md-table-cell-container">-->
<!--										<span class="action red text-danger">Удалить</span>-->
<!--									</div>-->
<!--								</td>-->
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
	import {required} from 'vuelidate/lib/validators';
	export default {
		name: "ProjectFileSectionComponent",
		props: ['info', 'files'],
		data() {
			return{
				form: {
					name: '',
					ProjectId: this.info.id,
					FileCategoryInfo: {
						id: null
					}
				},
				selectedFile: {},
				list: []
			}
		},
		created() {
			this.getFileCategoryList();
		},
		validations: {
			form: {
				name: [required],
				FileCategoryInfo: {
					id: {required}
				}
			}
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
			takeFile(e) {
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.selectedFile = files[0];
			},
			save() {
				this.$v.form.$touch();
				if (this.$v.form.$error) {
					return
				}
				let data = new FormData()
				let obj = {
					ProjectFileInfo: this.form,
					file: this.selectedFile
				};
				for (const key in obj) {
					data.append(key, obj[key])
				}
				console.log(1);
				return
				this.$api.post('/api/Project/AddProjectFile', data).then(
					res => {
						console.log(res);
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