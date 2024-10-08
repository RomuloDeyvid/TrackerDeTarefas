import Projetos from "@/views/Projetos.vue"
import FormularioProjetos from "@/views/Projetos/FormularioProjetos.vue"
import ListaDeProjetos from "@/views/Projetos/ListaDeProjetos.vue"
import Tarefas from "@/views/Tarefas.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefa',
    component: Tarefas
},
{
    path: '/projetos',
    component: Projetos,
    children: [
        {
            path: '',
            name: 'Projetos',
            component: ListaDeProjetos
        },
        {
            path: 'novo',
            name: 'Novo projetos',
            component: FormularioProjetos
        },
        {
            path: ':id',
            name: 'Editar projeto',
            component: FormularioProjetos,
            props: true
        }
    ]

}]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador