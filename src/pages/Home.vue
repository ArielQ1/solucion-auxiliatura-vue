<template>
  <div class="section">
    <div class="form-box">
      <div class="form-value">
        <form @submit.prevent="onSubmit">
          <h2>Formulario de Registro</h2>
          <div class="inputbox">
            <p v-if="errors.nombre" class="error">{{ errors.nombre }}</p>
            <input type="text" v-model="form.nombre" @blur="validateField('nombre')" />
            <label>Nombres</label>
          </div>
          <div class="inputbox">
            <p v-if="errors.fechaNacimiento" class="error">{{ errors.fechaNacimiento }}</p>
            <input type="date" v-model="form.fechaNacimiento" @blur="validateField('fechaNacimiento')" />
            <label>Fecha Nacimiento</label>
          </div>
          <div class="inputbox">
            <p v-if="errors.notaEstudiante" class="error">{{ errors.notaEstudiante }}</p>
            <input type="number" v-model="form.notaEstudiante" @blur="validateField('notaEstudiante')" />
            <label>Nota</label>
          </div>
          <button type="submit" @click="handleValidation">Validar</button>
        </form>
      </div>
    </div>
    <Modal :estado="estadoModal" @cambiarEstado="cambiarEstadoModal" titulo="Estado de la Validacion de Datos">
      <div class="contenido-modal">
        <strong>Nombre: </strong><p>{{ form.nombre }}</p>
        <strong>Fecha de Nacimiento: </strong><p>{{ form.fechaNacimiento }}</p>
        <strong>Nota: </strong><p>{{ form.notaEstudiante }}</p>
        <p v-if="errors.nombre" style="color:red">{{ errors.nombre }}</p>
        <p v-if="errors.fechaNacimiento" style="color:red">{{ errors.fechaNacimiento }}</p>
        <p v-if="errors.notaEstudiante" style="color:red">{{ errors.notaEstudiante }}</p>
        <button v-if="!errors.nombre && !errors.fechaNacimiento && !errors.notaEstudiante" @click="enviar">Enviar</button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { ref } from 'vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Home',
  components: { Modal },
  setup() {
    const form = ref({
      nombre: '',
      fechaNacimiento: '',
      notaEstudiante: '',
    });

    const errors = ref({});
    const estadoModal = ref(false);

    const validateField = (field) => {
      if (field === 'nombre') {
        if (!form.value.nombre) {
          errors.value.nombre = 'Nombre requerido';
        } else if (form.value.nombre.length < 3) {
          errors.value.nombre = 'Nombre muy corto';
        } else if (form.value.nombre.length > 25) {
          errors.value.nombre = 'Nombre muy largo';
        } else {
          delete errors.value.nombre;
        }
      } else if (field === 'fechaNacimiento') {
        if (!form.value.fechaNacimiento) {
          errors.value.fechaNacimiento = 'Fecha de nacimiento requerida';
        } else {
          delete errors.value.fechaNacimiento;
        }
      } else if (field === 'notaEstudiante') {
        if (!form.value.notaEstudiante) {
          errors.value.notaEstudiante = 'Nota requerida';
        } else if (form.value.notaEstudiante < 0) {
          errors.value.notaEstudiante = 'Nota muy baja tiene que ser mayor a 0';
        } else if (form.value.notaEstudiante > 100) {
          errors.value.notaEstudiante = 'Nota muy alta no debe ser mayor a 100';
        } else {
          delete errors.value.notaEstudiante;
        }
      }
    };

    const handleValidation = () => {
      validateField('nombre');
      validateField('fechaNacimiento');
      validateField('notaEstudiante');
      if (!errors.value.nombre && !errors.value.fechaNacimiento && !errors.value.notaEstudiante) {
        estadoModal.value = true;
      }
    };

    const onSubmit = () => {
      handleValidation();
    };

    const cambiarEstadoModal = (estado) => {
      estadoModal.value = estado;
    };

    const enviar = () => {
      localStorage.setItem('nombre', form.value.nombre);
      localStorage.setItem('fecha', form.value.fechaNacimiento);
      localStorage.setItem('nota', form.value.notaEstudiante);
      estadoModal.value = false;
      form.value = {
        nombre: '',
        fechaNacimiento: '',
        notaEstudiante: '',
      };
    };

    return {
      form,
      errors,
      estadoModal,
      validateField,
      handleValidation,
      onSubmit,
      cambiarEstadoModal,
      enviar,
    };
  },
};
</script>
  <style scoped>

.section{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
}

.form-box{
    position: relative;
    width: 400px;
    height: 450px;
    background: transparent;
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;

}

h2{
    font-size: 2em;
    color: #fff;
    text-align: center;
}

.inputbox{
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #fff;
}
.inputbox label{
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1em;
    pointer-events: none;
    transition: .5s;
}

input:focus ~ label,
input:valid ~ label{
top: -5px;
}
.inputbox input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding:0 35px 0 5px;
    color: #fff;
}
.inputbox ion-icon{
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2em;
    top: 20px;
}

button{
    width: 100%;
}

.error {
  color: red;
  font-size: x-small;
}
  

</style>
  