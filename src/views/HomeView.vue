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

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <h2 class="about-title">You can count on us.</h2>
        <p class="about-description">
          We provide reliable, modern technology solutions that help your business run smoothly and grow confidently. Whether you need a powerful website, smart automation, or support with complex processes, our team works closely with you to deliver results you can trust—every step of the way.
        </p>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="services-title">Services We Provide</h2>
        <p class="services-intro">
          We offer a range of modern technology solutions designed to help your business run smarter, faster, and more efficiently. Whether you are enhancing your online presence, automating workflows, or strengthening your financial systems, our team delivers reliable results tailored to your specific goals.
        </p>
        
        <div class="services-grid">
          <div class="service-card">
            <h3 class="service-card-title">Web Development</h3>
            <p class="service-card-description">
              Custom websites and applications that scale with your business.
            </p>
          </div>
          
          <div class="service-card">
            <h3 class="service-card-title">AI Automation</h3>
            <p class="service-card-description">
              Intelligent systems that streamline workflows and reduce manual tasks.
            </p>
          </div>
          
          <div class="service-card">
            <h3 class="service-card-title">E-Commerce</h3>
            <p class="service-card-description">
              Seamless shopping experiences with secure payments and smart inventory.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Services Section -->
    <section class="other-services-section">
      <div class="container">
        <h2 class="other-services-title">Other Services We Provide</h2>
        <p class="other-services-description">
          From building high-performance websites to automating complex workflows and guiding your digital upgrade, our services are designed to help your business thrive in a fast-changing world. Whatever your technology needs, Grand Kru Technologies delivers innovative, scalable solutions that drive growth, efficiency, and lasting impact.
        </p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <router-link to="/contact" class="cta-button">
          Contact Us for a chat
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic
</script>

<style scoped>
.home-view {
  position: relative;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
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

/* About Section */
.about-section {
  padding: 5rem 0;
  background: #ffffff;
  position: relative;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1800ad;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(24, 0, 173, 0.1);
}

.about-description {
  font-size: 1.875rem;
  color: #1800ad;
  line-height: 1.6;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

/* Services Section */
.services-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f6f7f8 0%, #ffffff 100%);
  position: relative;
}

.services-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1800ad;
  text-align: center;
  margin-bottom: 1.5rem;
}

.services-intro {
  font-size: 1.25rem;
  color: #1800ad;
  line-height: 1.6;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.service-card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(24, 0, 173, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(24, 0, 173, 0.1);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(24, 0, 173, 0.2);
}

.service-card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1800ad;
  margin-bottom: 1rem;
}

.service-card-description {
  font-size: 1.125rem;
  color: #1800ad;
  line-height: 1.6;
  opacity: 0.9;
}

/* Other Services Section */
.other-services-section {
  padding: 5rem 0;
  background: #ffffff;
}

.other-services-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1800ad;
  text-align: center;
  margin-bottom: 2rem;
}

.other-services-description {
  font-size: 1.25rem;
  color: #1800ad;
  line-height: 1.6;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #1800ad 0%, #7731d8 50%, #d73cbe 100%);
  text-align: center;
}

.cta-button {
  display: inline-block;
  background: #ffffff;
  color: #1800ad;
  padding: 1.25rem 3rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Responsive adjustments for new sections */
@media (max-width: 768px) {
  .about-title {
    font-size: 2rem;
  }
  
  .about-description {
    font-size: 1.5rem;
  }
  
  .services-title,
  .other-services-title {
    font-size: 2rem;
  }
  
  .services-intro,
  .other-services-description {
    font-size: 1.125rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-card {
    padding: 2rem;
  }
  
  .cta-button {
    font-size: 1.25rem;
    padding: 1rem 2rem;
  }
}

@media (max-width: 480px) {
  .about-section,
  .services-section,
  .other-services-section,
  .cta-section {
    padding: 3rem 0;
  }
  
  .about-title {
    font-size: 1.75rem;
  }
  
  .about-description {
    font-size: 1.25rem;
  }
  
  .services-title,
  .other-services-title {
    font-size: 1.75rem;
  }
  
  .service-card-title {
    font-size: 1.5rem;
  }
  
  .cta-button {
    font-size: 1.125rem;
    padding: 0.875rem 1.5rem;
  }
}
</style>