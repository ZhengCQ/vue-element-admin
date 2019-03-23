<template>
  <maincontent
               :glistKnowlege="glistKnowlege"
               :pdeleteKnowlege="pdeleteKnowlege"
               :paddKnowlege="paddKnowlege"
               :peditKnowlege="peditKnowlege"/>
</template>
<script>
import { glistKnowlege, pdeleteKnowlege, paddKnowlege, peditKnowlege } from '@/api/knowledges/drug.js'
import maincontent from '../Main'
export default {
  components: {
    maincontent
  },
  methods: {
    glistKnowlege,
    pdeleteKnowlege,
    peditKnowlege,
    paddKnowlege
  }
}

</script>
