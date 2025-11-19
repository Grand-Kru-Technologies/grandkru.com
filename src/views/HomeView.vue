<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <!-- Pretitle -->
        <p class="pretitle">grandkru.com</p>
        
        <!-- Main Title -->
        <h1 class="main-title">
          Modern Technology Solutions for a Smarter, Faster Business
        </h1>
        
        <!-- Subtitle -->
        <p class="subtitle">Every step of the way</p>
      </div>
      
      <!-- Decorative Elements -->
      <div class="hero-decorations">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
}

.hero-section {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, #1800ad 0%, #7731d8 50%, #d73cbe 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 1200px;
  padding: 2rem;
  position: relative;
}

.pretitle {
  font-size: 2.125rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 0.25em;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.main-title {
  font-size: 4.25rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 2.125rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 0.25em;
  margin-top: 1rem;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #8b3dff 0%, transparent 70%);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #d73cbe 0%, transparent 70%);
  bottom: -50px;
  right: -50px;
  animation-delay: 5s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #1800ad 0%, transparent 70%);
  top: 50%;
  right: 10%;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .pretitle {
    font-size: 1.5rem;
  }
  
  .main-title {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
  
  .hero-content {
    padding: 1rem;
  }
  
  .orb-1,
  .orb-2,
  .orb-3 {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 480px) {
  .pretitle {
    font-size: 1.25rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
  }
}
</style>