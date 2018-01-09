<template>
	<el-container class="content">
		<el-header>
			<p id="header"><b>Cadastro de Voluntário</b></p>
		</el-header>
	
		<el-main class="main">
			<el-row>
				<el-col :span="4"><div class="filler">-</div></el-col>
				<el-col :span="16">
					<el-form :model="voluntario" ref="voluntario" class="form">
						<el-row :gutter="15">
							<el-col :span="16">
								<el-form-item
									label="Nome"
									prop="nome"
									:rules="{
										required: true, message: 'Nome não pode estar vazio'
									}"
								>
									<el-input v-model="voluntario.nome"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item
								label="Data de nascimento"
								prop="nascimento"
								:rules="{
										required: true, message: 'Data não pode estar vazia'
									}"
								>
									<el-date-picker format="dd/MM/yyyy" type="date" v-model="voluntario.nascimento" style="width: 100%;"
										@change="calcAge()"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="2">
								<el-form-item
									label="Idade"
									prop="idade"
								>
									<el-input v-model="voluntario.idade" :disabled="true"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						
						<el-row :gutter="15">
							<el-col :span="8">
								<el-form-item 
								label="Escolaridade"
								>
									<el-select 
										v-model="voluntario.escolaridade" 
										style="width: 100%;"
										:clearable="false"
									>
										<el-option
											v-for="item in escolaridades"
											:key="item"
											:label="item"
											:value="item"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="16">
								<el-form-item 
									label="Endereço"
									prop="endereco"
									:rules="{
										required: true, message: 'Endereço não pode estar vazio'
									}"
								>
									<el-input v-model="voluntario.endereco"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="15">
							<el-col :span="12">
								<el-form-item 
									label="Telefone"
									prop="telefone"
									:rules="{
										required: true, message: 'Telefone não pode estar vazio'
									}"
								>
									<el-input v-model="voluntario.telefone"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="Whatsapp">
									<el-input v-model="voluntario.whatsapp"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item
							prop="email"
							label="Email"
							:rules="[
								{ required: true, message: 'Email não pode estar vazio' },
								{ type: 'email', message: 'Por favor insira um email válido', trigger: 'blur' }
							]">
							<el-input v-model="voluntario.email"></el-input>
						</el-form-item>

						<el-row :gutter="15">
							<el-col :span="12">
								<el-form-item 
									label="RG"
									prop="rg"
									:rules="{
										required: true, message: 'RG não pode estar vazio'
									}"
								>
									<el-input v-model="voluntario.rg"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item 
									label="CPF"
									prop="cpf"
									:rules="{
										required: true, message: 'CPF não pode estar vazio'
									}"
								>
									<el-input v-model="voluntario.cpf"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="15">
							<el-col :span="12">
								<el-form-item
									label="Igreja onde congrega"
									prop="igreja"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="voluntario.igreja"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item
									label="Nome do pastor"
									prop="pastor"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="voluntario.pastor"></el-input>
								</el-form-item>
							</el-col>
						</el-row>


						<el-form-item 
							label="Ministério em que atua"
							prop="ministerio"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input v-model="voluntario.ministerio"></el-input>
						</el-form-item>

						<el-checkbox v-model="voluntario.medicamento_usa">Faz uso contínuo de medicamento</el-checkbox>

						<el-form-item label="Qual?">
							<el-input v-model="voluntario.medicamento_qual" :disabled="!voluntario.medicamento_usa"></el-input>
						</el-form-item>

						<el-form-item label="Por que?">
							<el-input v-model="voluntario.medicamento_motivo" :disabled="!voluntario.medicamento_usa"></el-input>
						</el-form-item>

						<el-checkbox v-model="voluntario.acompanhamento">Faz acompanhamento médico</el-checkbox>

						<el-form-item label="Por que?">
							<el-input v-model="voluntario.acompanhamento_motivo" :disabled="!voluntario.acompanhamento"></el-input>
						</el-form-item>			

						<el-checkbox v-model="voluntario.experiencia">Já fez trabalho voluntário</el-checkbox>

						<el-form-item label="Onde?">
							<el-input v-model="voluntario.experiencia_onde" :disabled="!voluntario.experiencia"></el-input>
						</el-form-item>

						<el-form-item label="Descreva a experiência com 5 palavras">
							<el-input v-model="voluntario.experiencia_desc" :disabled="!voluntario.experiencia"></el-input>
						</el-form-item>

						<el-form-item 
							label="O que você entende por voluntariado?"
							prop="entendimento"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input type="textarea" v-model="voluntario.entendimento"></el-input>
						</el-form-item>

						<el-form-item 
							label="De acordo com sua opinião, quais os princípios para a ação voluntária?"
							prop="principios"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input type="textarea" v-model="voluntario.principios"></el-input>
						</el-form-item>

						<el-form-item label="Se submete facilmente?" style="display: inline-block;">
							<el-radio-group v-model="voluntario.submete">
								<el-radio :label="1">Sim</el-radio>
								<el-radio :label="0">Não</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item 
							label="Explique"
							prop="submete_explica"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input v-model="voluntario.submete_explica" type="textarea" ></el-input>
						</el-form-item>

						<el-form-item 
							label="O que um voluntário não deve fazer?"
							prop="nao_faz"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input v-model="voluntario.nao_faz" type="textarea" ></el-input>
						</el-form-item>

						<el-form-item 
							label="O que você espera da Betelife?"
							prop="expectativa"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input v-model="voluntario.expectativa" type="textarea" ></el-input>
						</el-form-item>

						<el-form-item>
							<el-button icon="el-icon-check" type="primary" @click="submitForm('voluntario')">Finalizar</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
import { saveVolunteer, updateVolunteer } from '../database/database'

export default {
	name: 'VoluntarioForm',
	data() {
		return {
			voluntario: {
				submete: 1,
				idade: '',
				status: true
			},
			escolaridades: [
				"Nenhuma",
				"Fundamental Incompleto",
				"Fundamental Completo",
				"Médio Incompleto",
				"Médio Completo",
				"Superior Incompleto",
				"Superior Completo"
			],
			submitAction: 'post'
		}
	},
	methods: {
		submitForm(voluntario) {
			this.$refs[voluntario].validate((valid) => {
				if (valid) {
					console.log('valid')

					if (this.submitAction == 'post') {
						this.voluntario.data_cadastro = new Date()

						saveVolunteer(this.voluntario, response => {
							console.log(response)
							this.$router.push('/voluntarios')
						})
					} else {
						updateVolunteer(this.voluntario, response => {
							console.log(response)
							this.$router.push('/voluntarios')
						})
					}
				} else {
					console.log('invalid')
					return false
				}
			})
		},
		calcAge() {
			let now = new Date()

			this.voluntario.idade = now.getFullYear() - this.voluntario.nascimento.getFullYear()

			if (this.voluntario.nascimento.getMonth() > now.getMonth()) {
				this.voluntario.idade--
			}

			if (this.voluntario.nascimento.getMonth() == now.getMonth()) {
				if (this.voluntario.nascimento.getDate() > now.getDate()) {
					this.voluntario.idade--
				}
			}
		}
	},
	created: function() {
		console.log(this.$route.params)
		this.voluntario = this.$route.params.volunteer
		this.submitAction = this.$route.params.action
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.form {
	padding: 20px;
	border: 1px solid #D8DCE5;
	border-radius: 10px;
	background-color: #FCFCFC;
}

.content {
    background-color: white;
}

#header {
	font-size: 1.5em;
	color: #5A5E66;
	font-family: "Helvetica Neue", Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑";
}

.filler {
	color: white;
}
</style>
