<template>
    <div class="segunda-container">
      <h1>Segunda Página</h1>
      <p>Calcula y muestra la Edad de la Persona</p>
      <form @submit.prevent="calcularEdad" class="form-container">
        <button type="submit" class="btn btn-primary" @click="cambiarEstadoModal(true)">Calcular Edad</button>
  
        <Modal :titulo="'Los Datos de la persona'" :estado="estadoModal" @cambiarEstado="cambiarEstadoModal">
          <div class="contenido-modal">
            <p><strong>Nombre:</strong> {{ localStorageNombre }}</p>
            <p><strong>Fecha de Nacimiento:</strong> {{ formatoFechaNacimiento }}</p>
            <h1><strong>Edad:</strong> {{ calcularEdadPersona() }}</h1>
            <button type="button" class="btn btn-primary" @click="cambiarEstadoModal(false)">Aceptar</button>
          </div>
        </Modal>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Modal from '../components/Modal.vue';
  
  export default {
    name: 'Segunda',
    components: {
      Modal,
    },
    data() {
      return {
        estadoModal: false,
        localStorageNombre: '',
        localStorageFecha: '',
      };
    },
    methods: {
      cambiarEstadoModal(estado) {
        this.estadoModal = estado;
      },
      calcularEdadPersona() {
        const fechaNacimiento = new Date(this.localStorageFecha);
        const fechaActual = new Date();
        const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        return edad;
      },
      calcularEdad() {
        // Aquí podrías realizar alguna acción adicional si es necesario antes de mostrar el modal
        this.cambiarEstadoModal(true);
      },
    },
    computed: {
      formatoFechaNacimiento() {
        const fechaNacimiento = new Date(this.localStorageFecha);
        const formato = { day: 'numeric', month: 'long', year: 'numeric' };
        return fechaNacimiento.toLocaleDateString('es-ES', formato);
      },
    },
    mounted() {
      this.localStorageNombre = window.localStorage.getItem('nombre') || '';
      this.localStorageFecha = window.localStorage.getItem('fecha') || '';
    },
  };
  </script>
  
  <style scoped>
  .segunda-container {
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
  