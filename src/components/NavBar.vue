<template>
  <header class="contenedor">
    <nav>
      <ul>
        <li><router-link to="/">Primera</router-link></li>
        <li><router-link to="/segunda">Segunda</router-link></li>
        <li><router-link to="/tercera">Tercera</router-link></li>
      </ul>
    </nav>
  </header>
</template>
  
  <script>
  export default {
    name: 'NavBar'
  };
  </script>
  
  <style src="./NavBar.css"></style>