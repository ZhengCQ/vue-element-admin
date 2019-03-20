<template>
  <maincontent :glistKnowlege="glistKnowlege" :pdeleteKnowlege="pdeleteKnowlege"></maincontent>
</template>
<script>
import { glistKnowlege, pdeleteKnowlege } from '@/api/knowledges'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistKnowlege,
    pdeleteKnowlege
  }
}

</script>
