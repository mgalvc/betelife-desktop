import Vue from 'vue'
import Router from 'vue-router'
import VoluntarioForm from '@/components/VoluntarioForm'
import AlunoForm from '@/components/AlunoForm'
import Alunos from '@/components/Alunos'
import Voluntarios from '@/components/Voluntarios'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/novo-voluntario',
		name: 'VoluntarioForm',
		component: VoluntarioForm
    },
    {
    	path: '/novo-aluno',
    	name: 'AlunoForm',
    	component: AlunoForm
    },
    {
      path: '/voluntarios',
      name: 'Voluntarios',
      component: Voluntarios
    },
    {
      path: '/alunos',
      name: 'Alunos',
      component: Alunos
    },
  ]
})
