<template>
  <div id="home">
    <h1>หน้าแรก</h1>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  middleware: "auth",
  mounted() {}
};
</script>

<style>
#home{
    font-family: 'Sarabun', sans-serif;
}
</style>
