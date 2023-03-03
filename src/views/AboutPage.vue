<template>
  <div class="about-container">
    <div class="about-sub-container">
      <h1>About Vue Houses Real State</h1>
      <p>This web application follows the user story requirements using 'SOLID' and 'DRY' principles
      in order to make the code easy to understand, reusable and the use of methods have single responsability
      which helps with the scalability of the application
      </p>
      <h1>About Me</h1>
      <p>I am a software developer with 4 years of experience working with clients as a Freelancer mainly in
      AngularJS and Javascript applications.
      </p>
      <p>My experience working with Javascript frameworks like AngularJS made it easier to learn other frameworks
      such as React and Vue, and also the state management frameworks they had, REDUX and VUEX respectively.
      </p>
      <p>I have great communication skills in english and I always update other team members, ask questions and have
      a proactive atittude when I work in a team.</p>
      <h1>Design and Development</h1>
      <div class="about-footer">
        <div class="about-logo">
          <img src="@/assets/logo.png" />
        </div>
        <div class="about-link">
          <p>By David Marcos Mendiluce</p>
          <a href="https://davidmarcosmendiluce.com">www.davidmarcosmendiluce.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AboutPage',
    computed: {
        ...mapGetters(['getIsMobile'])
    }
}
</script>

<style scoped>
  .about-container {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    }
    
  .about-sub-container {
    margin-top: 70px;
    width: 75%
    }

  h1 {
    margin-top: 4rem;
  }

  p {
    font-family: 'Noto Sans';
    color: #4A4B4C;
    font-weight: 500;
  }

  .about-logo {
    margin-right: 2rem;
    margin-top: 1rem;
  }

  .about-logo img {
    width: 200px;
  }

  .about-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .about-footer {
    display: flex;
  }

  .about-link p {
    margin: 0;
    font-size: 18px;
  }

  .about-link a {
    color: #067BC2;
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .about-title {
      margin-top: 1rem;
      width: 100%;
      text-align: center;
      font-size: 22px;
      margin-bottom: 0;
    }

    .about-sub-container {
      margin-top: 0;
    }

    h1 {
      margin-top: 2rem;
      font-size: 20px;
    }

    .about-footer {
      margin-bottom: 8rem;
    }

    .about-logo img{
      width: 100px;
    }

    .about-link p {
      font-size: 16px;
    }

    .about-link a {
      font-size: 14px;
    }
}
</style>