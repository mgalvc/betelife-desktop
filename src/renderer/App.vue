<template>
    <div id="app">
        <div>
            <el-menu class="menu" mode="horizontal">
                <el-menu-item index="">
                    <router-link to="/">Home</router-link>
                </el-menu-item>
                
                <el-submenu index="2">
                    <template slot="title">Novo</template>
                    <el-menu-item index="2-1"> 
                        <router-link
                            :to="{
                                name: 'VoluntarioForm',
                                params: {
                                    volunteer: {},
                                    action: 'post'
                                }
                            }">
                            Voluntário
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <router-link
                            :to="{
                                name: 'AlunoForm',
                                params: {
                                    student: {},
                                    action: 'post'
                                }
                            }">
                            Aluno
                        </router-link>
                    </el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">Ver Todos</template>
                    <el-menu-item index="3-1">
                        <router-link to="/voluntarios">Voluntários</router-link>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <router-link to="/alunos">Alunos</router-link>
                    </el-menu-item>
                </el-submenu>
            </el-menu>

            <div v-show="isHome" class="info">
                <el-row :gutter="20">
                    <el-col :span="6" :offset="6">
                        <el-card class="card">
                            <p class="number">{{ studentsNumber }}</p>
                            Alunos Cadastrados
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="card">
                            <p class="number">{{ volunteersNumber }}</p>
                            Voluntários Cadastrados
                        </el-card>
                    </el-col>
                </el-row>
            </div>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { howMany } from './database/database'
//const db = require('./database/database')

export default {
    name: 'app',
    data() {
        return {
            isHome: true,
            studentsNumber: 0,
            volunteersNumber: 0
        }
    },
    methods: {
        loadInfo() {
        	howMany((response) => {
        		this.studentsNumber = response.students
                this.volunteersNumber = response.volunteers
        	})
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.path == '/') {
                this.loadInfo()
                this.isHome = true
            } else {
                this.isHome = false
            }
        }
    },
    created: function() {
        this.loadInfo()
        this.isHome = false
        if (this.$route.path == '/') {
            this.isHome = true
        } 
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.info {
    margin-top: 5%;
    width: 100%;
}

.card {
    font-size: 1.3em;
}

.number {
    font-size: 2em;
    line-height: 0;
}

a {
    text-decoration: none;
}
</style>
