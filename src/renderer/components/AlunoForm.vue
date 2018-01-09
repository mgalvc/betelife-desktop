<template>
	<el-container class="content">
		<el-header>
			<p id="header"><b>Cadastro de Aluno</b></p>
		</el-header>

		<el-main class="main">
			<el-row>
				<el-col :span="4"><div class="filler">-</div></el-col>
				<el-col :span="16">
					<el-form :model="aluno" ref="aluno" class="form">
						<el-row :gutter="15">
							<el-col :span="12">
								<el-form-item
									label="Nome"
									prop="nome"
									:rules="{
										required: true, message: 'Nome não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.nome"></el-input>
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
									<el-date-picker format="dd/MM/yyyy" type="date" v-model="aluno.nascimento" style="width: 100%;" @change="calcAge()"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="2">
								<el-form-item
									label="Idade"
									prop="idade"
								>
									<el-input v-model="aluno.idade" :disabled="true"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item 
								label="Camisa"
								>
									<el-select 
										v-model="aluno.tamanho_camisa" 
										style="width: 100%;"
										:clearable="false"
										filterable
										allow-create
										default-first-option
									>
										<el-option
											v-for="item in tamanho_camisa"
											:key="item"
											:label="item"
											:value="item"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="15">
							<el-col :span="12">
								<el-form-item 
									label="Nome do pai"
									prop="pai"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.pai"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item 
									label="Nome da mãe"
									prop="mae"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.mae"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="15">
							<el-col :span="8">
								<el-form-item 
									label="Telefone"
									prop="telefone"
									:rules="{
										required: true, message: 'Telefone não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.telefone"></el-input>
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
									<el-input v-model="aluno.endereco"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item 
							label="Mora com quem?"
							prop="mora_com"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input v-model="aluno.mora_com"></el-input>
						</el-form-item>

						<el-row :gutter="15">
							<el-col :span="8">
								<el-form-item 
								label="Responsável pela inscrição"
								>
									<el-select 
										v-model="aluno.responsavel" 
										style="width: 100%;"
										:clearable="false"
									>
										<el-option
											v-for="item in responsavel"
											:key="item"
											:label="item"
											:value="item"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="16">
								<el-form-item 
									label="RG do responsável"
									prop="responsavel_rg"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.responsavel_rg"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="15">
							<el-col :span="12">
								<el-form-item 
									label="Profissão do pai"
									prop="pai_profissao"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.pai_profissao"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item 
									label="Profissão da mãe"
									prop="mae_profissao"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.mae_profissao"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="15">
							<el-col :span="12">
								<el-form-item 
									label="Religião do pai"
									prop="pai_religiao"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.pai_religiao"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item 
									label="Religião da mãe"
									prop="mae_religiao"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.mae_religiao"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row :gutter="15">
							<el-col :span="16">
								<el-form-item 
									label="Escola em que está matriculado(a)"
									prop="escola"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.escola"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item 
									label="Série"
									prop="serie"
									:rules="{
										required: true, message: 'Campo não pode estar vazio'
									}"
								>
									<el-input v-model="aluno.serie"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item>
							<el-checkbox v-model="aluno.repetente">É repetente</el-checkbox>
							<el-checkbox v-model="aluno.ja_aluno">Já é aluno(a) do projeto</el-checkbox>
						</el-form-item>

						<el-checkbox v-model="aluno.problema_saude">Tem algum problema de saúde</el-checkbox>

						<el-form-item label="Qual?">
							<el-input v-model="aluno.problema_saude_qual" :disabled="!aluno.problema_saude"></el-input>
						</el-form-item>

						<el-checkbox v-model="aluno.medicamento_usa">Faz uso contínuo de medicamento</el-checkbox>

						<el-form-item label="Qual?">
							<el-input v-model="aluno.medicamento_qual" :disabled="!aluno.medicamento_usa"></el-input>
						</el-form-item>

						<el-form-item 
							label="Remédio a tomar em caso de febre"
							prop="remedio_febre"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input v-model="aluno.remedio_febre"></el-input>
						</el-form-item>

						<el-form-item 
							label="Recomendação da família"
							prop="recomendacao_familia"
							:rules="{
								required: true, message: 'Campo não pode estar vazio'
							}"
						>
							<el-input type="textarea" v-model="aluno.recomendacao_familia"></el-input>
						</el-form-item>

						<el-checkbox v-model="aluno.retorna_sozinho">Retornará sozinho(a) para casa</el-checkbox>

						<el-form-item 
							label="Quem levará a criança para casa?"
							prop="quem_busca"
							:rules="{
								required: !aluno.retorna_sozinho, message: 'Campo não pode estar vazio'
							}"
							>
							<el-input v-model="aluno.quem_busca" :disabled="aluno.retorna_sozinho"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button icon="el-icon-check" type="primary" @click="submitForm('aluno')">Finalizar</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
import { saveStudent, updateStudent } from '../database/database'

export default {
	name: 'AlunoForm',
	data() {
		return {
			aluno: {
				idade: ''
			},
			responsavel: ['Pai', 'Mãe'],
			tamanho_camisa: ['P', 'M', 'G'],
			submitAction: 'post'
		}
	},
	methods: {
		submitForm(aluno) {
			this.$refs[aluno].validate((valid) => {
				if (valid) {
					console.log('valid')

					if(this.submitAction == 'post') {
						this.aluno.data_cadastro = new Date()
						
						saveStudent(this.aluno, (response) => {
							console.log(response)
							this.$router.push('/alunos')
						})
					} else {
						updateStudent(this.aluno, (response) => {
							console.log(response)
							this.$router.push('/alunos')
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

			this.aluno.idade = now.getFullYear() - this.aluno.nascimento.getFullYear()

			if (this.aluno.nascimento.getMonth() > now.getMonth()) {
				this.aluno.idade--
			}

			if (this.aluno.nascimento.getMonth() == now.getMonth()) {
				if (this.aluno.nascimento.getDate() > now.getDate()) {
					this.aluno.idade--
				}
			}
		}
	},
	created: function() {
		console.log(this.$route.params)
		this.aluno = this.$route.params.student
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
