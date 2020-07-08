<template>
	<div>
		<md-card-content>
			<div class="md-layout">
				<div class="md-layout-item md-small-size-100 md-size-66">
					<md-field>
						<label>Наименование объекта</label>
						<md-input v-model="info.description" disabled type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-33">
					<md-field>
						<label>В кратце</label>
						<md-input v-model="info.shortDescription" disabled type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-33">
					<md-field>
						<label>Заказчик</label>
						<md-input v-model="info.customer" disabled type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-33">
					<md-field>
						<label>Номер договора</label>
						<md-input v-model="info.contractNumber" disabled type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-33">
					<md-field>
						<label>Дата договора</label>
					    <md-input disabled :value="info.contractDate ? $moment(info.contractDate).format('DD-MM-YYYY') : ''" type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-50">
					<md-field>
						<label>Подрядная организация</label>
						<md-input disabled v-model="info.contractProvider" type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-50">
					<md-field>
						<label>Стоимость по договору (СМР)</label>
						<md-input disabled v-model="info.contractPrice" type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-33">
					<md-field>
						<label>Тех Надзор</label>
						<md-input disabled v-model="info.techSupervision" type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-33">
					<md-field>
						<label>Тел номер</label>
						<md-input disabled v-model="info.techSupervisionPhone" type="text"></md-input>
					</md-field>
				</div>
				<div class="md-layout-item md-small-size-100 md-size-33">
					<md-field>
						<label>ПТО</label>
						<md-input disabled v-model="info.responsible.fio" type="text"></md-input>
					</md-field>
				</div>
			</div>
		</md-card-content>
	</div>
</template>

<script>
	import {required} from 'vuelidate/lib/validators';
	export default {
		name: "ProjectInfo",
		props: ['info'],
		methods: {
		
		}
	}
</script>

<style >
	.md-select-menu{
		z-index: 100000 !important;
	}
</style>