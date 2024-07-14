<template>
    <div class="home-container">
      <h1>Formulario de Registro</h1>
      <div class="form-container">
        <form @submit.prevent="onSubmit" class="form-content">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" v-model="form.nombre" placeholder="Ingrese su nombre">
            <p v-if="errors.nombre" class="error-text">{{ errors.nombre }}</p>
          </div>
          <div class="form-group">
            <label>Fecha de Nacimiento</label>
            <input type="date" v-model="form.fechaNacimiento">
            <p v-if="errors.fechaNacimiento" class="error-text">{{ errors.fechaNacimiento }}</p>
          </div>
          <div class="form-group">
            <label>Nota Estudiante</label>
            <input type="number" v-model="form.notaEstudiante">
            <p v-if="errors.notaEstudiante" class="error-text">{{ errors.notaEstudiante }}</p>
          </div>
          <button type="submit" @click="validar" class="validate-button">Validar</button>
          
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <h2>Estudiante {{ form.nombre }}</h2>
              <p><strong>Fecha de Nacimiento:</strong> {{ form.fechaNacimiento }}</p>
              <p><strong>Nota:</strong> {{ form.notaEstudiante }}</p>
              <button @click="enviar">Enviar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Home',
    data() {
      return {
        form: {
          nombre: '',
          fechaNacimiento: '',
          notaEstudiante: '',
        },
        errors: {
          nombre: '',
          fechaNacimiento: '',
          notaEstudiante: '',
        },
        showModal: false,
      };
    },
    methods: {
      onSubmit() {
        // Simulación de validación
        this.validar();
      },
      validar() {
        this.errors = {}; // Reiniciar errores
        let formValid = true;
  
        // Validación del nombre
        if (!this.form.nombre) {
          this.errors.nombre = 'Nombre requerido';
          formValid = false;
        } else if (this.form.nombre.length < 3 || this.form.nombre.length > 25) {
          this.errors.nombre = 'Nombre debe tener entre 3 y 25 caracteres';
          formValid = false;
        }
  
        // Validación de la fecha de nacimiento
        if (!this.form.fechaNacimiento) {
          this.errors.fechaNacimiento = 'Fecha de nacimiento requerida';
          formValid = false;
        } else {
          const fechaNacimiento = new Date(this.form.fechaNacimiento);
          const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
          if (edad < 18) {
            this.errors.fechaNacimiento = 'Debe ser mayor de edad';
            formValid = false;
          }
        }
  
        // Validación de la nota del estudiante
        if (!this.form.notaEstudiante) {
          this.errors.notaEstudiante = 'Nota requerida';
          formValid = false;
        } else if (this.form.notaEstudiante < 0 || this.form.notaEstudiante > 100) {
          this.errors.notaEstudiante = 'Nota debe estar entre 0 y 100';
          formValid = false;
        }
  
        // Mostrar modal si el formulario es válido
        if (formValid) {
          this.showModal = true;
        }
      },
      enviar() {
        // Lógica para enviar los datos (almacenar en localStorage por ejemplo)
        localStorage.setItem('nombre', this.form.nombre);
        localStorage.setItem('fecha', this.form.fechaNacimiento);
        localStorage.setItem('nota', this.form.notaEstudiante);
  
        // Cerrar modal y limpiar formulario
        this.showModal = false;
        this.form = {
          nombre: '',
          fechaNacimiento: '',
          notaEstudiante: '',
        };
        this.errors = {
          nombre: '',
          fechaNacimiento: '',
          notaEstudiante: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
  }
  
  .form-container {
    margin-top: 20px;
  }
  
  .form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .validate-button {
    margin-top: 10px;
  }
  
  .error-text {
    color: red;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  </style>
  