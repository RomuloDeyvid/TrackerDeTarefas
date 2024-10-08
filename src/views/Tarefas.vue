<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field ">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Procure uma tarefa" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <Box v-if="listaEstaVazia">
      Você não tem tarefas realizadas!
    </Box>

  </div>
  <Modal :mostrar="tarefaSelecionada != null">
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editando uma tarefa</p>
      <button class="delete" aria-label="close" @click="fecharModal"></button>
    </template>
    <template v-slot:corpo>
      <div class="field" v-if="tarefaSelecionada">
        <label for="nomeDaTarefa" class="label title">Nome do Tarefa</label>
        <input type="text" class="input input-formulario" v-model="tarefaSelecionada.descricao" id="nomeDaTarefa"
          placeholder="Digite o nome do Tarefa">
      </div>
    </template>
    <template v-slot:rodape>
      <div class="buttons">
        <button class="button is-success" @click="editarTarefa()">Salvar alterações</button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </div>
    </template>
  </Modal>


</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipos-acoes';
import { NOTIFICAR } from '@/store/tipos-multacoes';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import Modal from '@/components/Modal.vue';


export default defineComponent({
  name: 'TarefaS',
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  components: { Formulario, Tarefa, Box, Modal },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    editarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(this.fecharModal)
      this.store.commit(NOTIFICAR, { titulo: 'Atenção', texto: 'A tarefa foi alterada', tipo: TipoDeNotificacao.ATENCAO })
    }

  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    const filtro = ref('')

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      store,
      filtro,
      tarefas: computed(() => store.state.tarefa.tarefas)
    }
  }

});
</script>
