<template>
  <nav class="container split-nav">
    <div class="nav-brand">
      <h3>
        <NuxtLink to="/">undiscus</NuxtLink>
      </h3>
    </div>
    <div class="collapsible">
      <input type="checkbox" name="collapsible1" id="collapsible1" />
      <label for="collapsible1">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </label>
      <div class="collapsible-body">
        <ul class="inline">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/topics">Topics</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
