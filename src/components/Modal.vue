<template>
<v-dialog v-model="show">
  <v-card
    v-if="item.package"
    class="mx-auto package__card"
  >
    <v-card-text>
      <div>{{item.package.date.slice(0, 10)}}</div>
      <p class="display-1 text--primary">
        {{item.package.name}} | <span class="package__date">{{item.package.version}}</span>
      </p>
      <p>
        {{item.package.publisher.username}}
        <a :href="item.package.links.github" class="package__github">
          <v-icon medium>mdi-github</v-icon>
        </a>
        <a :href="item.package.links.npm" class="package__npm">
          <v-icon medium>mdi-npm</v-icon>
        </a>
      </p>
      <div class="text--primary">
        {{item.package.description}}
      </div>
      <div class="package__keywords">
        <v-chip
          class="package__keyword"
          :key="keyword"
          v-for="keyword in item.package.keywords"
        >
          {{keyword}}
        </v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="show=false"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>

</v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    item: Object
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.package__card {
  padding-top: 20px;
}

.package__date {
  font-size: .6em;
}

.package__keywords {
  margin: 20px -8px;
}

.package__keyword {
  margin: 4px 8px;
}

.package__github,
.package__npm {
  text-decoration: none;
}
</style>
