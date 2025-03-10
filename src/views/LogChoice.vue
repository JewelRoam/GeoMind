<template>
    <WelcomeHead></WelcomeHead>
    
    <div class="log-choice-container">
      <h2>请选择登录类型</h2>
      <div class="choice-boxes">
        <router-link to="/Log/user" class="box-link">
          <div class="box annotator-box">
            <div class="icon-container user-icon">
              <img src="../assets/user.png" alt="User Icon">
            </div>
            <p>我是 标注员/审核员</p>
          </div>
        </router-link>
        <router-link to="/Log/admin" class="box-link">
          <div class="box admin-box">
            <div class="icon-container admin-icon">
              <img src="../assets/admin.png" alt="Admin Icon">
            </div>
            <p>我是 管理员</p>
          </div>
        </router-link>
      </div>
    </div>
  </template>

<script>
export default {
    name: "LogChoice"
};
</script>

<style scoped>
.log-choice-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    background-image: radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0);
    background-size: 30px 30px;
    background-position: -5px -5px;
}

.choice-boxes {
    display: flex;
    flex-direction: row; /* Aligns the boxes side by side */
    justify-content: space-evenly; /* Evenly space the boxes */
    width: 100%; /* Use the full width of the container */
    gap:50px;
    max-width: 600px; /* Maximum width of the boxes container */
    margin-top: 60px; /* Add top margin if needed */
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-image:  linear-gradient(120deg, rgb(73, 214, 73) 0%, #057105 100%); /* Match the login box color */
    color: #fff; /* White text to match the login box text color */
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    width: 250px; /* Set a fixed width */
    height: 250px; /* Set a fixed height */
    margin: 10px; /* Ensure some space around the buttons */
}

.box:hover {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); /* Gradient on hover */
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px; /* Increase the width for a larger icon */
    height: 120px; /* Increase the height for a larger icon */
    border-radius: 50%; /* Circle container */
    margin-bottom: 20px; /* Space between icon and text */
}

.user-icon {
    background-color: white; /* White background */
}

.admin-icon {
    background-color: #ccc; /* Grey background */
}

.box img {
    width: 70px; /* Set icon width */
    height: 70px; /* Set icon height */
}

.box p {
    font-size: 20px; /* Increase text size */
    margin-top: 20px; /* Space between icon and text */
}



.box-link {
    text-decoration: none;
    color: inherit;
}

/* Add media queries for responsiveness */
@media (max-width: 768px) {
    .choice-boxes {
        flex-direction: column;
        width: auto;
    }

    .box {
        width: auto;
        margin-bottom: 20px;
    }

    /* Adjust icon and button sizes for smaller screens if necessary */
}

</style>
