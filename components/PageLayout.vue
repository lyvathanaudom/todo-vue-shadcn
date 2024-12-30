<template>
  <div class="flex mb-6">
    <section class="flex-1">
      <header>
        <slot name="header" />
      </header>
      <main>
        <slot name="content" />
      </main>
      <section>
        <slot name="completed" />
      </section>
    </section>
    <section class="w-1/2">
      <slot name="detail" />
    </section>
  </div>
</template>

<style scoped>
/* Optional: Add some styling for better visual separation */
section {
  padding: 1rem;
}

</style>