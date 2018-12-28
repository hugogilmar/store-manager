<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="ma-4">
          <v-subheader>{{ $t('header.start', { entity: $tc('entities.session', 1) }) }}</v-subheader>
          <v-container fluid>
            <v-slide-y-transition mode="out-in">
              <session-form />
            </v-slide-y-transition>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import SessionForm from '../components/SessionForm.vue';

  export default {
    components: {
      'session-form': SessionForm
    }
  }
</script>
