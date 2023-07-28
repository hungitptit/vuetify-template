<template>
  <v-navigation-drawer app permanent theme="light" color="#0052CC">
    <!-- Logo slot -->
    <template v-slot:prepend>
      <v-row align="center" class="my-3">
        <v-img src="@/assets/fpt_logo_2.svg" alt="Logo" height="60" contain></v-img>
      </v-row>
    </template>

    <v-list nav>
      <v-list-item class="listItemClass" prepend-icon="mdi-email" value="inbox">Inbox</v-list-item>
      <v-list-item class="listItemClass" prepend-icon="mdi-account-supervisor-circle" value="supervisors">Supervisors</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "VerticalMenuBar",
};
</script>

<style>
/* Customize the background color of the navigation drawer */
.listItemClass {
  color: #f5f5f5 !important;
  font-size: medium;
}
</style>
