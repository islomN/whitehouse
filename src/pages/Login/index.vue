<template>
	<div class="d-flex align-items-center justify-content-center flex-wrap login-bg" style="min-height: 100vh">
		<form @submit.prevent="sendForm" class="myForm">
			<div class="form-group">
				<label for="name">Login</label>
				<input
					v-model="form.login"
					:class="{'border-danger': $v.form.login.$error}"
					id="name"
					type="text"
					class="form-control"
				>
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input
					v-model="form.password"
					:class="{'border-danger': $v.form.password.$error}"
					id="password"
					type="password"
					class="form-control"
				>
			</div>
			<div class="d-flex justify-content-center">
				<button class="btn btn-primary" type="submit">
					Sign in
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import {required} from 'vuelidate/lib/validators';
	import TokenService from "../../services/TokenService";
	export default {
		name: "index",
		data() {
			return{
				form: {
					login: '',
					password: ''
				}
			}
		},
		validations: {
			form: {
				login: {required},
				password: {required}
			}
		},
		methods: {
			sendForm() {
				this.$v.form.$touch();
				if (this.$v.form.$invalid) {
					return
				}
				this.$api.post("/api/User/LoginUser", this.form).then(
					response => {
						TokenService.saveToken(this.$api, response.data.result.token.accessToken);
						localStorage.setItem("userType", response.data.result.userType);
						this.$router.push('/')
					},
					error => {
					    this.errorNotify(error.response.data.error.errorMessage)
						console.log(error.response.data.error.errorMessage);
					}
				)
			}
		}
	}
</script>

<style scoped>
.myForm{
	width: 500px;
	box-shadow: 0 0 0 10px #fff;
	padding: 20px;
	border-radius: 5px;
    background: white;
}

.login-bg{
    background-image: url("/img/sidebar-2.32103624.jpg");
    background-size: cover;
}
</style>