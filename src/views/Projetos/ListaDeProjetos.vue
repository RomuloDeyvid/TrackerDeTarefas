<template>

    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo Projeto</span>
        </router-link>

        <table class="table is-fullwidth tabela-projetos">
            <thead>
                <tr>
                    <th class="texto-da-tabela">ID</th>
                    <th class="texto-da-tabela">Nome</th>
                    <th class="texto-da-tabela">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td class="texto-da-tabela">{{ projeto.id }}</td>
                    <td class="texto-da-tabela">{{ projeto.nome }}</td>
                    <td class="texto-da-tabela">
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>

</template>

<script lang="ts">

import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipos-acoes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'ListaDeProjetos',
    setup() {
        const store = useStore()
        store.dispatch(OBTER_PROJETOS)
        return {
            projetos: computed(() => store.state.projeto.projetos),
            store
        }
    },
    mixins: [notificacaoMixin],
    methods: {
        excluir(id: string) {
            this.store.dispatch(REMOVER_PROJETO, id)
            this.notificar('Atenção', 'O projeto selecionado foi excluido', TipoDeNotificacao.FALHA)
        }
    }
})
</script>

<style scoped>
.title {
    color: var(--cor-primaria);
}

.input-formulario {
    background: #fff;
    color: #000;
}

.input-formulario::placeholder {
    color: #000;
}

.tabela-projetos {
    background: #fff;
    margin-top: 1em;
}

.texto-da-tabela {
    color: #000;

}
</style>