<template>
	<el-container class="content">
		<el-header>
			<p id="header"><b>Voluntários Cadastrados</b></p>
		</el-header>

		<el-main class="main">
			<el-row>
				<el-col :span="4"><div class="filler">-</div></el-col>
				<el-col :span="16">
					<el-table
						stripe
						class="table"
						height="500"
						:data="voluntarios">
						<el-table-column
							width="300"
							prop="nome"
							label="Nome">
						</el-table-column>
						<el-table-column
							prop="idade"
							label="Idade">
						</el-table-column>
						<el-table-column
							width="250"
							prop="telefone"
							label="Telefone">
						</el-table-column>
						<el-table-column 
							width="100"
							label="Ações">
							<template slot-scope="scope">
								<el-button plain type="primary" @click="see_details(scope.$index)" icon="el-icon-view"></el-button>
							</template>
						</el-table-column>
						<el-table-column 
							label="Status"
							prop="status">
							<template slot-scope="scope">
								<el-tag
									:type="scope.row.status ? 'success' : 'danger'">
									{{ scope.row.status ? 'Ativo' : 'Inativo' }}
								</el-tag>
							</template>
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
		</el-main>

		<el-dialog
			:title="selected.nome"
			:visible.sync="showDialog"
			center=false
		>
			<b>Data de Nascimento</b>: {{ selected.nascimento_formatado }} <br>
			<b>Idade</b>: {{ selected.idade }} <br>
			<b>Escolaridade</b>: {{ selected.escolaridade }} <br>
			<b>Endereço</b>: {{ selected.endereco }} <br>
			<b>Telefone</b>: {{ selected.telefone }} <br>
			<b>Whatsapp</b>: {{ selected.whatsapp }} <br>
			<b>Email</b>: {{ selected.email}} <br>
			<b>RG</b>: {{ selected.rg }} <br>
			<b>CPF</b>: {{ selected.cpf }} <br>
			<b>Igreja</b>: {{ selected.igreja }} <br>
			<b>Pastor</b>: {{ selected.pastor }} <br>
			<b>Ministério onde atua</b>: {{ selected.ministerio }} <br>
			<b>Faz uso contínuo de medicamento?</b>: {{ selected.medicamento_usa ? 'Sim' : 'Não' }} <br>
			<span v-if="selected.medicamento_usa">
				<b>Medicamento(s) utilizado(s)</b>: {{ selected.medicamento_qual }} <br>
				<b>Motivo</b>: {{ selected.medicamento_motivo }} <br>
			</span>
			<span v-if="selected.acompanhamento">
				<b>Acompanhamento médico</b>: {{ selected.problema_saude_qual }} <br>
			</span>
			<b>Já fez trabalho voluntário?</b>: {{ selected.experiencia ? 'Sim' : 'Não' }} <br>
			<span v-if="selected.experiencia">
				<b>Onde</b>: {{ selected.experiencia_onde }} <br>
				<b>Descrição</b>: {{ selected.experiencia_desc }} <br>
			</span>
			<b>O que entende por voluntariado?</b> {{ selected.entendimento }} <br>
			<b>Quais os princípios para a ação voluntária?</b> {{ selected.principios }} <br>
			<b>Se submete facilmente?</b> {{ selected.submete ? 'Sim' : 'Não' }} <br>
			<b>Explique</b>: {{ selected.submete_explica }} <br>
			<b>O que um voluntário não deve fazer?</b> {{ selected.nao_faz }} <br>
			<b>O que você espera da Betelife?</b> {{ selected.expectativa }} <br>
			<b>Data do cadastro: </b> {{ selected.data_cadastro_formatada }}

			<span slot="footer">
				<el-button plain type="primary" icon="el-icon-edit" @click="edit">Editar</el-button>
				<el-button plain type="primary" icon="el-icon-edit-outline" @click="changeStatus">Alterar Status</el-button>
				<el-button plain type="warning" icon="el-icon-delete" @click="remove">Deletar</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>

<script>
import { format } from 'date-fns'
import { getVolunteer, updateStatus, deleteVolunteer, getVolunteers } from '../database/database'

export default {
	name: 'Alunos',
	data() {
		return {
			voluntarios: [],
			selected: {},
			showDialog: false
		}
	},
	methods: {
		see_details(index) {
			getVolunteer(this.voluntarios[index]._id, voluntario => {
				this.selected = voluntario
				this.selected.data_cadastro_formatada = format(this.selected.data_cadastro, 'DD/MM/YYYY')
				this.selected.nascimento_formatado = format(this.selected.nascimento, 'DD/MM/YYYY')
			})
			this.showDialog = true
		},
		changeStatus() {
			let info = { id: this.selected._id, status: !this.selected.status }
			updateStatus(info, done => {
				if (done)
					this.load()
			})
		},
		remove() {
			deleteVolunteer(this.selected._id, done => {
				if (done)
					this.load()
			})
		},
		load() {
			getVolunteers(voluntarios => {
				this.voluntarios = voluntarios
			})
			this.showDialog = false
		},
		edit() {
			this.$router.push({
				name: 'VoluntarioForm',
				params: {
					volunteer: this.selected,
					action: 'put'
				}
			})
		}
	},
	created: function() {
		this.load()
	}
}	
</script>
<style>
.table {
	text-align: left;
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
