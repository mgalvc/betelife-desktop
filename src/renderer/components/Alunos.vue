<template>
	<el-container class="content">
		<el-header>
			<p id="header"><b>Alunos Cadastrados</b></p>
		</el-header>

		<el-main class="main">
			<el-row>
				<el-col :span="4"><div class="filler">-</div></el-col>
				<el-col :span="16">
					<el-table
						stripe
						class="table"
						height="500"
						:data="alunos">
						<el-table-column
							prop="nome"
							label="Nome">
						</el-table-column>
						<el-table-column
							prop="idade"
							label="Idade">
						</el-table-column>
						<el-table-column
							prop="mae"
							label="Mãe">
						</el-table-column>
						<el-table-column
							prop="telefone"
							label="Telefone">
						</el-table-column>
						<el-table-column 
							width="150"
							label="Ações">
							<template slot-scope="scope">
								<el-button plain type="primary" @click="see_details(scope.$index)" icon="el-icon-view"></el-button>
								<el-button plain type="primary" @click="print(scope.$index)" icon="el-icon-printer"></el-button>
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
			class="printable"
		>
			<b>Data de Nascimento</b>: {{ selected.nascimento_formatado }} <br>
			<b>Idade</b>: {{ selected.idade }} <br>
			<b>Pai</b>: {{ selected.pai }} <br>
			<b>Mãe</b>: {{ selected.mae }} <br>
			<b>Telefone</b>: {{ selected.telefone }} <br>
			<b>Endereço</b>: {{ selected.endereco }} <br>
			<b>Mora com</b>: {{ selected.mora_com}} <br>
			<b>Responsável pela inscrição</b>: {{ selected.responsavel }} <br>
			<b>RG do responsável</b>: {{ selected.responsavel_rg }} <br>
			<b>Profissão do pai</b>: {{ selected.pai_profissao }} <br>
			<b>Profissão da mãe</b>: {{ selected.mae_profissao }} <br>
			<b>Religião do pai</b>: {{ selected.pai_religiao }} <br>
			<b>Religião da mãe</b>: {{ selected.mae_religiao }} <br>
			<b>Escola</b>: {{ selected.escola }} <br>
			<b>Série</b>: {{ selected.serie }} <br>
			<b>É repetente</b>: {{ selected.repetente ? 'Sim' : 'Não' }} <br>
			<b>Já é aluno do projeto</b>: {{ selected.ja_aluno ? 'Sim' : 'Não' }} <br>
			<span v-if="selected.problema_saude">
				<b>Problema de saúde</b>: {{ selected.problema_saude_qual }} <br>
			</span>
			<span v-if="selected.medicamento_usa">
				<b>Medicamento(s) utilizado(s)</b>: {{ selected.medicamento_qual }} <br>
			</span>
			<b>Remédio para febre</b>: {{ selected.remedio_febre }} <br>
			<b>Recomendações da família</b>: {{ selected.recomendacao_familia }} <br>
			<b>Quem busca</b>: {{ selected.retorna_sozinho ? 'Retorna sozinho' : selected.quem_busca }} <br>
			<b>Data do cadastro: </b> {{ selected.data_cadastro_formatada }}

			<span slot="footer" class="not-printable">
				<el-button plain type="primary" icon="el-icon-edit" @click="edit">Editar</el-button>
				<el-button plain type="warning" icon="el-icon-delete" @click="remove">Deletar</el-button>
			</span>
		</el-dialog>
		
	</el-container>

</template>

<script>
import { format } from 'date-fns'
const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const fs = require('fs')
import { getStudents, getStudent, printStudent, deleteStudent } from '../database/database'

export default {
	name: 'Alunos',
	data() {
		return {
			alunos: [],
			selected: {},
			showDialog: false
		}
	},
	methods: {
		see_details(index) {
			getStudent(this.alunos[index]._id, (response) => {
				this.selected = response
				this.selected.data_cadastro_formatada = format(this.selected.data_cadastro, 'DD/MM/YYYY')
				this.selected.nascimento_formatado = format(this.selected.nascimento, 'DD/MM/YYYY')
			})
			this.showDialog = true
		},
		print(index) {
			printStudent(this.alunos[index]._id, (html) => {
				let studentPage = new BrowserWindow()
				studentPage.loadURL("data:text/html;charset=utf-8," + encodeURI(html))
				
				studentPage.webContents.on('did-finish-load', ()=>{
					studentPage.show();
					studentPage.focus();
					
					studentPage.webContents.print({}, success => {
						console.log(success)
					})
				});
			})
		},
		remove() {
			deleteStudent(this.selected._id, (success) => {
				if (success) this.load()
			})
		},
		load() {
			getStudents((response) => {
				this.alunos = response
			})
			this.showDialog = false
		},
		edit() {
			this.$router.push({
				name: 'AlunoForm',
				params: {
					student: this.selected,
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
@media print {
	* {
		display: none;
	}

	.printable {
		display: block;
	}

	.not-printable {
		display: none;
	}
}

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
