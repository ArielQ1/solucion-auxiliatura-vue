<template>
  <div v-if="estado" class="principal">
    <div class="contenedorModal">
      <div class="encabezadoModal">
        <h3>{{ titulo }}</h3>
      </div>
      <button class="botonCerrar" type="submit" @click="cerrarModal">×</button>
      <slot></slot>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      estado: {
        type: Boolean,
        required: true
      },
      titulo: {
        type: String,
        required: true
      }
    },
    methods: {
      cerrarModal() {
        this.$emit('cambiarEstado', false);
      }
    }
  };
  </script>
  
  <style src="./estilosModal.css"></style>
  