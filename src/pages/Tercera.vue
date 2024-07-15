<template>
    <div class="tercera-container">
      <h1>Tercera Página</h1>
      <p>¿Estudiante Aprobó o Reprobó?</p>
      <form @submit.prevent="verificarAprobacion" class="form-container">
        <button type="submit" class="btn btn-primary" @click="cambiarEstadoModal(true); lanzarConfetti()">Aprobaste?</button>
  
        <Modal :titulo="'Ponderación'" :estado="estadoModal" @cambiarEstado="cambiarEstadoModal">
          <div class="contenido-modal">
            <p><strong>Nota de {{ localStorageNombre }}</strong></p>
            <h1 :style="{ color: colorTitulo }">{{ obtenerEstadoEstudiante() }} con {{ localStorageNota }}</h1>
  
            <button type="button" class="btn btn-primary" @click="limpiarLocalStorage">Aceptar</button>
          </div>
        </Modal>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Modal from '../components/Modal.vue';
  import confetti from 'canvas-confetti';
  
  export default {
    name: 'Tercera',
    components: {
      Modal,
    },
    data() {
      return {
        estadoModal: false,
        localStorageNombre: '',
        localStorageNota: '',
      };
    },
    methods: {
      cambiarEstadoModal(estado) {
        this.estadoModal = estado;
      },
      lanzarConfetti() {
        confetti();
      },
      verificarAprobacion() {
        this.cambiarEstadoModal(true);
        this.lanzarConfetti();
      },
      obtenerEstadoEstudiante() {
        const notaEstudiante = parseInt(this.localStorageNota);
        return notaEstudiante >= 51 ? 'Estudiante Aprobado' : 'Estudiante Reprobado';
      },
      limpiarLocalStorage() {
        window.localStorage.removeItem('nombre');
        window.localStorage.removeItem('nota');
        window.localStorage.removeItem('fecha');
        this.cambiarEstadoModal(false);
      },
    },
    computed: {
      colorTitulo() {
        const notaEstudiante = parseInt(this.localStorageNota);
        return notaEstudiante >= 51 ? 'green' : 'red';
      },
    },
    mounted() {
      this.localStorageNombre = window.localStorage.getItem('nombre') || '';
      this.localStorageNota = window.localStorage.getItem('nota') || '';
    },
  };
  </script>
  
  <style scoped>
  .tercera-container {
    display: grid;
    place-content: center;
    text-align: center;
  }
  
  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  
  .contenido-modal {
    text-align: center;
  }
  </style>
  